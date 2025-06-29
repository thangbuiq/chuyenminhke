"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      size="icon"
      className={`
        fixed bottom-8 right-8 z-40 
        w-12 h-12 rounded-full shadow-lg
        bg-black/75 hover:bg-black/65
        text-white transition-all duration-500
        hover:scale-105 hover:shadow-xl
      `}
      aria-label="Quay lên đầu trang"
    >
      <ArrowUp size={20} />
    </Button>
  );
}
