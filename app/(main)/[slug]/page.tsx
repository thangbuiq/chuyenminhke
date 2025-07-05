import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/components/common/like-button";
import ReadingProgress from "@/components/common/reading-progress";
import ShareButton from "@/components/common/share-button";
import ReadingTime from "@/components/common/reading-time";
import CommentSection from "@/components/common/comment-section";
import BackToTop from "@/components/common/back-to-top";

import { getPostContent, getPostMetadata } from "@/utils/blog";
import { Metadata } from "next";
import Footer from "@/components/common/footer";

export const generateStaticParams = async () => {
  const posts = getPostMetadata("blogs");
  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostContent(slug);

  const removeSpecialChars = (str: string) =>
    str.replace(/[^\p{L}\p{N}\s.,!?-]/gu, "");

  const cleanTitle = removeSpecialChars(post.data.title);
  const cleanDescription = removeSpecialChars(
    post.content.split("\n")[1] || "",
  );

  const ogImageUrl = `https://chuyenminhke.vercel.app/og-images/${slug}.png`;

  const metadata: Metadata = {
    title: `chuyện mình kể ⋅ ${cleanTitle}`,
    description: cleanDescription,
    authors: {
      name: "Thang Bui Q",
      url: "https://thangbuiq.work/",
    },
    applicationName: "chuyện Mình Kể",
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
      title: `chuyện mình kể ⋅ ${cleanTitle}`,
      description: cleanDescription,
      url: `https://chuyenminhke.vercel.app/${slug}`,
      siteName: "chuyện mình kể",
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
      title: `chuyện mình kể ⋅ ${cleanTitle}`,
      description: cleanDescription,
      images: [ogImageUrl],
    },
  };

  return metadata;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostContent(slug);

  return (
    <>
      <div className="hidden md:block">
        <ReadingProgress />
      </div>

      {/* Emotional Header with gentle animations */}
      <header className="pt-40 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 to-transparent pointer-events-none" />
        <Link
          href={"/"}
          className="inline-block transition-all duration-500 hover:scale-105 hover:drop-shadow-lg"
        >
          <Image
            src={"/icon.png"}
            id="frontpage-icon"
            alt="chuyện mình kể icon"
            width={70}
            height={70}
          />
        </Link>

        {/* Breadcrumb with heart */}
        <nav className="mt-4 ml-2 text-sm text-[#999792]">
          <Link href="/" className="hover:text-[#787670] transition-colors">
            home
          </Link>
        </nav>
      </header>

      {/* Main Article with enhanced emotional elements */}
      <article className="mt-10 relative">
        <h1 className="text-[#1d1d1d] text-xl mb-4">{post.data.title}</h1>

        {/* Enhanced metadata with icons */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#787670] mb-2">
          <div className="flex items-center gap-1">
            <span>📅</span>
            <time dateTime={post.data.publish_date.toISOString()}>
              {post.data.publish_date.toLocaleString("vi-VN", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <ReadingTime content={post.content} />
        </div>

        {/* Enhanced cover image with overlay effects */}
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

        <Markdown>{post.content}</Markdown>

        {/* Tags with emotions */}
        {post.data.tags && (
          <div className="mt-12 mb-8">
            <p className="text-sm text-[#999792] mb-3">
              cảm xúc trong câu chuyện:
            </p>
            <div className="flex flex-wrap gap-2">
              {post.data.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm hover:bg-amber-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      <div className="mt-16 mb-4">
        <div className="border-t border-[#e5e5e5] w-full mb-8"></div>

        {/* Emotional call-to-action */}
        <div className="text-center mb-6">
          <p className="text-[#666] mb-4">
            câu chuyện này có chạm đến trái tim bạn không?
          </p>
          <div className="flex justify-center items-center gap-4">
            <LikeButton slug={slug} />
            <ShareButton
              url={`https://chuyenminhke.vercel.app/${slug}`}
              title={post.data.title}
            />
          </div>
        </div>
      </div>

      <CommentSection slug={slug} />
      <Footer />
      <BackToTop />
    </>
  );
}
