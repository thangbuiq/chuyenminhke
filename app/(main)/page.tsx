import { getPostMetadata } from "@/utils/blog";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/common/footer";

export default function Home() {
  const postMetadata = getPostMetadata("blogs");

  return (
    <>
      <header className="pt-40 px-4 sm:px-0">
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
          className="font-bold text-5xl text-[#1d1d1d] mt-14 mb-8 py-2 pr-4"
          id="frontpage-title"
        >
          chuyện mình kể
        </h1>
        <p
          className="text-[#787670] leading-relaxed mt-8 text-xs sm:text-sm sm:leading-relaxed"
          id="frontpage-description"
        >
          mình kể lại những mảnh nhỏ của ngày hôm qua, <br />
          chuyện con mèo đang ngáp, chuyện cà phê chưa kịp nguội, <br />
          chuyện mình còn giữ trong tim, chuyện mình học làm người.
        </p>
      </header>
      <main className="mt-10 sm:mt-14 px-4 sm:px-0 flex flex-col gap-6">
        <div className="flex items-center mb-4">
          <span className="w-2 h-2 rounded-full bg-[#252525] mr-3 inline-block animate-pulse" />
          <h2 className="text-lg sm:text-xl text-[#1d1d1d] font-bold">
            nên mình đã viết...
          </h2>
        </div>

        {postMetadata.map((post) => (
          <div
            key={post.slug}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <Link
              id="frontpage-post-title"
              href={`/${post.slug}`}
              className="text-lg text-[#1d1d1d] font-light hover:underline hover:text-[#555451] hover:decoration-[#555451] underline-offset-4 leading-relaxed"
            >
              {post.title}
            </Link>
            <p
              id="frontpage-post-title"
              className="text-[#787670] mt-1 sm:mt-0 text-sm sm:text-base"
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
