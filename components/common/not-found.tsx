"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-[52rem] px-5 sm:px-8 pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-semibold tracking-wider text-2xl sm:text-5xl text-[#1d1d1d] mt-14 mb-8 py-2 pr-4"
          >
            không tìm thấy
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <p className="text-[#787670] leading-relaxed border-l-4 border-[#787670] pl-3 sm:pl-6 text-sm">
              lạc đường rùi, <br />
              nhưng đừng lo, đường về nhà vẫn ở đó.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#1d1d1d] hover:text-[#555451] transition-colors mt-4 font-medium tracking-wide text-sm group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              về trang chủ
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
