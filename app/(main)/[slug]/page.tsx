import { CalendarDays } from "lucide-react";
import Markdown from "markdown-to-jsx";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import BackToTop from "@/components/common/back-to-top";
import CommentSection from "@/components/common/comment-section";
import Footer from "@/components/common/footer";
import LikeButton from "@/components/common/like-button";
import ReadingProgress from "@/components/common/reading-progress";
import ReadingTime from "@/components/common/reading-time";
import ShareButton from "@/components/common/share-button";
import { getPostContent, getPostMetadata } from "@/utils/blog";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const SITE_NAME = "chuyện mình kể";
const DESCRIPTION_LENGTH = 120;

interface PostData {
  title: string;
  publish_date: Date;
  cover: string;
  cover_alt: string;
  tags?: string[];
}

interface Post {
  data: PostData;
  content: string;
}

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

const removeSpecialChars = (str: string): string =>
  str.replace(/[^\p{L}\p{N}\s.,!?-]/gu, "");

const cleanDescription = (content: string): string => {
  const rawDescription = content
    .replace(/\n/g, " ")
    .replace(/ +(?= )/g, "")
    .trim();

  const truncated = rawDescription.slice(0, DESCRIPTION_LENGTH);
  const needsEllipsis = rawDescription.length > DESCRIPTION_LENGTH;

  return removeSpecialChars(truncated + (needsEllipsis ? "..." : ""));
};

const formatDate = (date: Date): string =>
  date.toLocaleString("vi-VN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const BlogHeader = () => (
  <header className="pt-40 px-4 relative">
    <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 to-transparent pointer-events-none" />
    <Link
      href="/"
      className="inline-block transition-all duration-500 hover:scale-105 hover:drop-shadow-lg"
    >
      <Image
        src="/icon.png"
        alt={`${SITE_NAME} icon`}
        width={70}
        height={70}
        priority
      />
    </Link>
    <nav className="mt-4 ml-1 text-sm text-[#999792]">
      <Link href="/" className="hover:text-[#787670] transition-colors">
        trang chủ
      </Link>
    </nav>
  </header>
);

const BlogMeta = ({ post }: { post: Post }) => (
  <div className="flex flex-wrap items-center gap-4 text-sm text-[#787670] mb-2">
    <div className="flex items-center gap-1">
      <CalendarDays className="w-4 h-4" />
      <time dateTime={post.data.publish_date.toISOString()}>
        {formatDate(post.data.publish_date)}
      </time>
    </div>
    <ReadingTime content={post.content} />
  </div>
);

const BlogCover = ({ post }: { post: Post }) => (
  <div className="py-14 relative group">
    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 rounded-lg" />
    <Image
      src={post.data.cover}
      alt={post.data.cover_alt}
      priority
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-auto shadow-lg transition-transform duration-500 group-hover:scale-[1.015]"
    />
  </div>
);

const BlogTags = ({ tags }: { tags: string[] }) => (
  <div className="mt-12 mb-8">
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm hover:bg-amber-200 transition-colors cursor-pointer"
        >
          #{tag}
        </span>
      ))}
    </div>
  </div>
);

const BlogActions = ({ slug, post }: { slug: string; post: Post }) => (
  <div className="mt-16 mb-4">
    <div className="border-t border-[#e5e5e5] w-full mb-8" />
    <div className="text-center mb-6">
      <p className="text-[#666] mb-4">
        câu chuyện này có chạm đến trái tim bạn không?
      </p>
      <div className="flex justify-center items-center gap-4">
        <LikeButton slug={slug} />
        <ShareButton url={`${BASE_URL}/${slug}`} />
      </div>
    </div>
  </div>
);

export const generateStaticParams = async () => {
  const posts = getPostMetadata("blogs");
  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = getPostContent(slug);
    const cleanTitle = removeSpecialChars(post.data.title);
    const description = cleanDescription(post.content);
    const ogImageUrl = `${BASE_URL}/og-images/${slug}.png`;

    return {
      title: `${SITE_NAME} ⋅ ${cleanTitle}`,
      description,
      authors: {
        name: "Thang Bui Q",
        url: "https://thangbuiq.work/",
      },
      applicationName: SITE_NAME,
      creator: "Thang Bui Q",
      generator: "Next.js",
      keywords: [
        "nextjs",
        "blog",
        "blogs",
        "Chuyện Mình Kể",
        "chuyện mình kể",
        "nghechuyenminhke",
        "chuyenminhke",
        "story",
        "mood",
        "tâm trạng",
      ],
      openGraph: {
        title: `${SITE_NAME} ⋅ ${cleanTitle}`,
        description,
        url: `${BASE_URL}/${slug}`,
        siteName: SITE_NAME,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: cleanTitle,
          },
        ],
        locale: "vi_VN",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${SITE_NAME} ⋅ ${cleanTitle}`,
        description,
        images: [ogImageUrl],
      },
    };
  } catch (error) {
    return {
      title: `${SITE_NAME} ⋅ trang không tồn tại`,
      description: "Trang bạn tìm kiếm không tồn tại",
    };
  }
}

// main blog page component
export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  let post: Post;
  try {
    const rawPost = getPostContent(slug);
    post = {
      data: {
        title: rawPost.data.title,
        publish_date: new Date(rawPost.data.publish_date),
        cover: rawPost.data.cover,
        cover_alt: rawPost.data.cover_alt,
        tags: rawPost.data.tags,
      },
      content: rawPost.content,
    };
  } catch (error) {
    notFound();
  }

  return (
    <>
      <div className="hidden md:block">
        <ReadingProgress />
      </div>

      <BlogHeader />

      <article className="mt-10 relative">
        <h1 className="text-[#1d1d1d] text-xl mb-4">{post.data.title}</h1>

        <BlogMeta post={post} />
        <BlogCover post={post} />

        <Markdown>{post.content}</Markdown>

        {post.data.tags && <BlogTags tags={post.data.tags} />}
      </article>

      <BlogActions slug={slug} post={post} />

      <Suspense
        fallback={<div className="h-32 animate-pulse bg-gray-100 rounded" />}
      >
        <CommentSection slug={slug} />
      </Suspense>

      <Footer />
      <BackToTop />
    </>
  );
}
