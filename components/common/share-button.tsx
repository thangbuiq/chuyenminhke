"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2, Facebook, Instagram, Link } from "lucide-react"; // @ts-ignore
import { toast } from "sonner";

interface ShareButtonProps {
  url: string;
  title: string;
}

export default function ShareButton({ url, title }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
          "width=600,height=400",
        );
      },
    },
    {
      name: "Instagram",
      icon: Instagram,
      action: () => {
        navigator.clipboard.writeText(url).then(() => {
          window.open(
            "https://www.instagram.com/?url=" + encodeURIComponent(url),
            "_blank",
          );
          toast.info(
            "Liên kết đã được sao chép! Dán vào Instagram để chia sẻ 📷",
          );
        });
      },
    },
    {
      name: "Sao chép liên kết",
      icon: Link,
      action: async () => {
        try {
          await navigator.clipboard.writeText(url);
          toast.success("Đã sao chép liên kết! 📋");
        } catch (error) {
          toast.error("Không thể sao chép liên kết");
        }
      },
    },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 hover:bg-amber-50 hover:border-amber-300 transition-all duration-200"
        >
          <Share2 size={16} />
          chia sẻ
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-48">
        {shareOptions.map((option) => (
          <DropdownMenuItem
            key={option.name}
            onClick={option.action}
            className="gap-2 cursor-pointer hover:bg-amber-50 transition-colors"
          >
            <option.icon size={16} />
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
