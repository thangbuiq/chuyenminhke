import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "@/components/common/likebutton";

import { getPostContent, getPostMetadata } from "@/utils/blog";
import { Metadata } from "next";
import Footer from "@/components/common/footer";

type Props = {
  params: { slug: string };
};

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

  const metadata: Metadata = {
    title: `chuyện mình kể ⋅ ${post.data.title}`,
    description: post.content.split("\n")[1],
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
      title: `chuyện mình kể ⋅ ${post.data.title}`,
      description: post.content.split("\n")[1],
      url: `https://chuyenminhke.vercel.app/${slug}`,
      siteName: "chuyện mình kể",
      images: [
        {
          url: `https://raw.githubusercontent.com/thangbuiq/chuyenminhke/main/public/${post.data.cover.replace(
            "/",
            "",
          )}`,
          width: 800,
          height: 600,
        },
        {
          url: `https://raw.githubusercontent.com/thangbuiq/chuyenminhke/main/public/${post.data.cover.replace(
            "/",
            "",
          )}`,
          width: 1920,
          height: 1440,
          alt: post.data.title,
        },
      ],
      locale: "vi_VN",
      type: "website",
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
      <header className="pt-32">
        <Link href={"/"}>
          <Image
            src={"/icon.png"}
            id="frontpage-icon"
            alt="chuyeminhke icon"
            width={70}
            height={70}
          />
        </Link>
      </header>
      <article className="mt-20">
        <h1 className="text-[#1d1d1d] text-xl">{post.data.title}</h1>
        <p className="mt-2 text-[#787670] text-sm">
          {post.data.publish_date.toLocaleString("default", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <div className="py-14">
          <Image
            src={post.data.cover}
            alt={post.data.cover_alt}
            priority
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <Markdown>{post.content}</Markdown>
      </article>

      <div className="mt-10 mb-4 border-t border-[#e5e5e5] w-full"></div>
      <LikeButton slug={slug} />
      <p className="mt-4 text-sm text-[#999792]">
        chúc bạn đọc một ngày nhiều may mắn và bình yên 🌱
      </p>
      <Footer />
      <div className="h-14"></div>
    </>
  );
}
