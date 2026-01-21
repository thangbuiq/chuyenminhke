"use client";

import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-155 max-w-full px-4 pt-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href={"/"}>
            <Image
              src="/icon.png"
              alt="chuyeminhke icon"
              width={140}
              height={140}
              className="hover:scale-105 hover:drop-shadow-lg transition-all duration-500 opacity-80"
            />
          </Link>
          <h1 className="font-semibold tracking-wider text-2xl sm:text-5xl text-[#1d1d1d] mt-14 mb-8 py-2 pr-4">
            có gì đó không ổn
          </h1>
          <p className="text-[#787670] leading-relaxed mt-4 border-l-4 border-[#787670] pl-3 sm:pl-6 text-sm">
            đôi khi mọi thứ vỡ tan, chỉ để được sắp xếp lại tốt hơn.
            <br />
            bạn thử tải lại trang xem sao nhé.
          </p>

          <div className="mt-10">
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2 bg-[#1d1d1d] text-white rounded-md hover:bg-[#3d3d3d] transition-all duration-300 text-sm tracking-wider"
            >
              <RefreshCcw className="w-4 h-4" />
              thử lại
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
