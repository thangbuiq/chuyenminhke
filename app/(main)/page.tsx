import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/common/footer";
import PostPagination from "@/components/common/post-pagination";
import { getPostMetadata } from "@/utils/blog";

export default function Home() {
  let postMetadata: any;
  try {
    postMetadata = getPostMetadata("blogs");
  } catch (error) {
    console.error("Failed to load blog posts:", error);
    postMetadata = [];
  }

  return (
    <>
      <header className="pt-36 px-2 sm:px-0">
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
        <h1 className="font-bold text-2xl sm:text-5xl text-[#1d1d1d] mt-14 mb-8 py-2 pr-4">
          chuyện mình kể
        </h1>
        <p
          className="text-[#787670] leading-relaxed mt-8 text-[0.715rem] sm:text-sm sm:leading-relaxed border-l-4 border-[#787670] pl-3 sm:pl-6"
          id="frontpage-description"
        >
          mình kể lại những cái nhỏ của hôm qua, <br />
          chuyện con mèo đang ngáp, chuyện cà phê chưa kịp nguội, <br />
          chuyện còn giữ trong tim, chuyện đang học làm người.
        </p>
      </header>
      <main className="mt-10 sm:mt-14 px-4 sm:px-0 flex flex-col gap-6">
        <div className="flex items-center mb-4">
          <h2
            className="text-lg sm:text-xl text-[#1d1d1d] font-semibold"
            id="frontpage-title"
          >
            <span className="mr-2 animate-bounce">🌱</span> nên mình viết...
          </h2>
        </div>

        <PostPagination posts={postMetadata} perPage={4} />
        <Footer />
      </main>
    </>
  );
}
