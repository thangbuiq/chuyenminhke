import { getPostMetadata } from "@/utils/blog";
import Image from "next/image";
import Link from "next/link";

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
          />
        </Link>
        <h1
          className="font-bold text-5xl text-[#1d1d1d] mt-14 py-2 pr-4"
          id="frontpage-title"
        >
          chuyện mình kể
        </h1>
      </header>
      <main className="mt-14 flex flex-col gap-7">
        {postMetadata.map((post) => (
          <div key={post.slug} className="flex justify-between items-center">
            <Link
              href={`/${post.slug}`}
              className="text-xl text-[#1d1d1d] hover:underline hover:text-[#555451] hover:decoration-[#555451] underline-offset-3 truncate flex-1 mr-4"
            >
              {post.title}
            </Link>
            <p className="text-[#787670] flex-shrink-0">
              {post.publish_date.toLocaleString("default", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </main>
    </>
  );
}
