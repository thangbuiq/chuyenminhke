"use client";

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm">
      <Progress
        value={progress}
        className="h-1 rounded-none border-none"
        style={{
          background: "transparent",
        }}
      />
      <style jsx>{`
        :global(.reading-progress [data-state="complete"] > div) {
          background: linear-gradient(90deg, #f59e0b, #f97316) !important;
        }
        :global(.reading-progress [data-state="loading"] > div) {
          background: linear-gradient(90deg, #f59e0b, #f97316) !important;
        }
      `}</style>
    </div>
  );
}
