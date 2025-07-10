"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <header className="pt-36 px-2 sm:px-0 max-w-2xl mx-auto">
        <Link href={"/"}>
          <Image
            src="/icon.png"
            id="notfound-icon"
            alt="chuyeminhke icon"
            width={140}
            height={140}
            className="hover:scale-105 hover:drop-shadow-lg transition-all duration-500 opacity-80"
          />
        </Link>
        <h1 className="font-bold text-2xl sm:text-5xl text-[#1d1d1d] mt-14 mb-8 py-2 pr-4">
          không tồn tại
        </h1>
      </header>

      <main className="mt-10 sm:mt-14 px-4 sm:px-0 max-w-2xl mx-auto flex flex-col gap-8">
        <div className="flex items-center mb-4">
          <h2 className="text-lg sm:text-xl text-[#1d1d1d]" id="notfound-title">
            lạc đường rùi, nhấn dấu ba chấm và về nhà nhé...
          </h2>
        </div>
      </main>
    </div>
  );
}
