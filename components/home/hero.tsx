"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <header className="pt-36 px-2 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-semibold tracking-wider text-2xl sm:text-5xl text-[#1d1d1d] mt-14 mb-8 py-2 pr-4"
      >
        chuyện mình kể
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-[#787670] leading-relaxed mt-8 text-[0.715rem] sm:text-sm sm:leading-relaxed border-l-4 border-[#787670] pl-3 sm:pl-6"
        id="frontpage-description"
      >
        mình kể lại những cái nhỏ của hôm qua, <br />
        chuyện con mèo đang ngáp, chuyện cà phê chưa kịp nguội, <br />
        chuyện còn giữ trong tim, chuyện đang học làm người.
      </motion.p>
    </header>
  );
}
