"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, MessageCircle } from "lucide-react";

type Post = {
    title: string;
    slug: string;
    publish_date: Date;
    cover: string | null;
    cover_alt: string | null;
    tags: string[];
    reading_time: string;
    like_count?: number;
    comment_count?: number;
};

type Props = {
    posts: Post[];
};

export default function PostList({ posts }: Props) {
    if (!posts || posts.length === 0) {
        return <div className="text-center text-gray-500 py-10">Chưa có bài viết nào.</div>;
    }

    return (
        <div className="flex flex-col gap-8 sm:gap-10">
            {posts.map((post) => (
                <Link
                    key={post.slug}
                    href={`/${post.slug}`}
                    className="group flex flex-col sm:flex-row gap-4 sm:gap-6 items-start -mx-3 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50/80"
                >
                    {/* Thumbnail */}
                    <div className="relative w-full sm:w-48 aspect-video sm:aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0 bg-gray-50/50 shadow-sm border border-gray-100">
                        {post.cover ? (
                            <Image
                                src={post.cover}
                                alt={post.cover_alt || post.title}
                                fill
                                className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                                <span className="text-3xl opacity-50">🌱</span>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-3 flex-1 w-full justify-center py-1">
                        <h3 className="text-lg sm:text-xl text-[#1d1d1d] group-hover:text-[#555451] transition-colors flex items-center gap-2 tracking-wider">
                            {post.title}
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#555451]" />
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#787670] font-medium lowercase tracking-wider">
                            <span suppressHydrationWarning>
                                {new Date(post.publish_date).toLocaleString("vi-VN", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span>{post.reading_time}</span>

                            {(post.like_count !== undefined || post.comment_count !== undefined) && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                    <div className="flex items-center gap-3">
                                        {post.like_count !== undefined && (
                                            <span className="flex items-center gap-1">
                                                <Heart className="w-3.5 h-3.5" /> {post.like_count}
                                            </span>
                                        )}
                                        {post.comment_count !== undefined && (
                                            <span className="flex items-center gap-1">
                                                <MessageCircle className="w-3.5 h-3.5" /> {post.comment_count}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-1">
                                {post.tags.map(tag => (
                                    <span key={tag} className="text-xs text-[#555451] bg-gray-100 px-2 py-1 rounded-md lowercase hover:bg-gray-200 transition-colors">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    );
}
