"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function LikeButton({ slug }: { slug: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(`/api/like/${slug}`)
      .then((res) => res.json())
      .then((data) => setCount(data.count));
  }, [slug]);

  const handleLike = async () => {
    const res = await fetch(`/api/like/${slug}`, { method: "POST" });
    const data = await res.json();
    setCount(data.count);
  };

  return (
    <Button onClick={handleLike} variant="outline" size="sm">
      <Heart className="w-4 h-4 mr-2" />
      {count}
    </Button>
  );
}
