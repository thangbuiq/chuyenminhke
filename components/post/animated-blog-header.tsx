"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const SITE_NAME = "chuyện mình kể";

export default function AnimatedBlogHeader() {
  return (
    <header className="pt-40 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 to-transparent pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>
      <motion.nav
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-4 ml-1 text-sm text-[#999792]"
      >
        <Link href="/" className="hover:text-[#787670] transition-colors">
          trang chủ
        </Link>
      </motion.nav>
    </header>
  );
}
