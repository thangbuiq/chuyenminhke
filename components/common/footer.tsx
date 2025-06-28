"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Footer() {
  return (
    <footer className="mt-10 pt-8 border-t border-[#e5e5e5] text-center text-[#787670] text-sm">
      <p>
        bạn đọc ơi, mình cảm thấy rất vui khi bạn đã ghé thăm và đang đọc những
        dòng này
      </p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>tâm trạng tác giả</TooltipTrigger>
          <TooltipContent>trời nhiều mây nhưng lòng vẫn sáng 🌥️</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <p>&copy; {new Date().getFullYear()} chuyeminhke</p>
    </footer>
  );
}
