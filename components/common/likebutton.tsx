"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import clsx from "clsx";

export default function LikeButton({ slug }: { slug: string }) {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    fetch(`/api/${slug}`)
      .then((res) => res.json())
      .then((data) => setCount(data.count));
  }, [slug]);

  const handleLike = async () => {
    if (liked) return;

    setIsAnimating(true);

    const res = await fetch(`/api/${slug}`, { method: "POST" });
    const data = await res.json();
    setCount(data.count);
    setLiked(true);

    setTimeout(() => setIsAnimating(false), 50);
  };

  return (
    <Button
      onClick={handleLike}
      variant="outline"
      size="sm"
      className={clsx(
        "transition-all duration-200 hover:border-red-300 hover:bg-red-50",
        {
          "border-red-400 bg-red-50": liked,
        },
      )}
      disabled={liked}
    >
      <Heart
        className={clsx("w-4 h-4 mr-2", {
          "text-red-500 fill-red-500": liked,
          "animate-ping": isAnimating,
        })}
      />
      <span
        className={clsx("transition-colors duration-200", {
          "text-red-600": liked,
        })}
      >
        {count}
      </span>
    </Button>
  );
}
