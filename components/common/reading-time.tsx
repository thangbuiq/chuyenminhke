"use client";

import { Clock } from "lucide-react";

interface ReadingTimeProps {
  content: string;
  wordsPerMinute?: number;
}

export default function ReadingTime({
  content,
  wordsPerMinute = 200,
}: ReadingTimeProps) {
  const calculateReadingTime = (text: string): number => {
    // Remove markdown syntax and HTML tags
    const cleanText = text
      .replace(/[#$*`~[\]()]/g, "")
      .replace(/<[^>]*>/g, "")
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/\[.*?\]\(.*?\)/g, "");

    const words = cleanText.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);

    return minutes;
  };

  const readingTime = calculateReadingTime(content);

  return (
    <div className="flex items-center gap-1 text-sm text-[#787670]">
      <Clock size={14} />
      <span>{readingTime} phút đọc của bạn</span>
    </div>
  );
}
