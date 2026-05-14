import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PostNavItem {
  slug: string;
  title: string;
}

interface PostNavigationProps {
  prev: PostNavItem | null;
  next: PostNavItem | null;
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav className="mt-16 mb-4">
      <div className="border-t border-[#e5e5e5] w-full mb-8" />
      <div className="flex justify-between items-stretch gap-6">
        {prev ? (
          <Link
            href={`/${prev.slug}`}
            className="group flex-1 transition-all duration-300 hover:translate-x-1"
          >
            <div className="flex items-center gap-1.5 text-sm text-[#999792] mb-2">
              <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>bài trước</span>
            </div>
            <p className="text-[#1d1d1d] text-sm leading-relaxed line-clamp-2 group-hover:text-amber-700 transition-colors">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {next ? (
          <Link
            href={`/${next.slug}`}
            className="group flex-1 text-right transition-all duration-300 hover:-translate-x-1"
          >
            <div className="flex items-center justify-end gap-1.5 text-sm text-[#999792] mb-2">
              <span>bài kế tiếp</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="text-[#1d1d1d] text-sm leading-relaxed line-clamp-2 group-hover:text-amber-700 transition-colors">
              {next.title}
            </p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  );
}
