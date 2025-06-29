import { getPostMetadata } from "@/utils/blog";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/common/footer";

export default function Home() {
  const postMetadata = getPostMetadata("blogs");

  return (
    <>
      <header className="pt-40">
        <Link href={"/"}>
          <Image
            src="/icon.png"
            id="frontpage-icon"
            alt="chuyeminhke icon"
            width={140}
            height={140}
            className="hover:scale-105 hover:drop-shadow-lg transition-all duration-500"
          />
        </Link>
        <h1
          className="font-bold text-5xl text-[#1d1d1d] mt-14 py-2 pr-4"
          id="frontpage-title"
        >
          chuyện mình kể
        </h1>
        <p
          className="text-[#787670] mt-4 leading-relaxed"
          id="frontpage-description"
        >
          mỗi buổi sáng, mình kể lại những mảnh nhỏ của ngày hôm qua, <br />
          chuyện con mèo đang ngáp, chuyện cà phê chưa kịp nguội, <br />
          chuyện mình còn giữ trong tim, chuyện mình học làm người.
        </p>
      </header>
      <main className="mt-14 flex flex-col gap-7">
        {postMetadata.map((post) => (
          <div key={post.slug} className="flex justify-between items-center">
            <Link
              id="frontpage-post-title"
              href={`/${post.slug}`}
              className="text-xl text-[#1d1d1d] hover:underline hover:text-[#555451] hover:decoration-[#555451] underline-offset-3 truncate flex-1 mr-4"
            >
              {post.title}
            </Link>
            <p
              id="frontpage-post-title"
              className="text-[#787670] flex-shrink-0"
            >
              {post.publish_date
                .toLocaleString("default", { year: "2-digit" })
                .replace(/^(\d{2})$/, "$1, ")}
              {post.publish_date.toLocaleString("default", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
        <div className="mb-4"></div>
        <Footer />
      </main>
    </>
  );
}
