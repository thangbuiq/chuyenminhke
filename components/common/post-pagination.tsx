// components/common/post-pagination.tsx
"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Post = {
  title: string;
  slug: string;
  publish_date: Date;
};

type Props = {
  posts: Post[];
  perPage?: number;
};

export default function PostPagination({ posts, perPage = 3 }: Props) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / perPage);
  const start = (page - 1) * perPage;
  const paginatedPosts = posts.slice(start, start + perPage);

  const postHeight = "5rem";
  const containerHeight = `${(perPage - 1) * 5}rem`;

  return (
    <>
      <div
        className="flex flex-col gap-4"
        style={{
          minHeight: containerHeight,
          height: containerHeight,
        }}
      >
        {paginatedPosts.map((post) => (
          <div
            key={post.slug}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center"
            style={{ height: postHeight }}
          >
            <Link
              href={`/${post.slug}`}
              className="text-base sm:text-lg text-[#1d1d1d] font-light hover:underline hover:text-[#555451] hover:decoration-[#555451] underline-offset-4 leading-relaxed hover:scale-105 transition-all duration-500"
            >
              <span className="flex items-center gap-2">
                {post.title}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <p className="text-[#787670] mt-1 sm:mt-0 text-sm sm:text-base">
              {new Date(post.publish_date).toLocaleString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        ))}
      </div>

      <Pagination className="mt-4 mb-4">
        <PaginationContent className="cursor-pointer">
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                className="rounded-full"
                isActive={page === i + 1}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => setPage(page - 1)} />
            </PaginationItem>
          )}
          {page < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => setPage(page + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}
