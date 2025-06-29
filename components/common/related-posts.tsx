import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  publish_date: Date;
  cover: string;
  cover_alt?: string;
  excerpt?: string;
  tags?: string[];
}

interface RelatedPostsProps {
  posts: Post[];
  title?: string;
}

export default function RelatedPosts({
  posts,
  title = "những câu chuyện khác có thể bạn sẽ thích",
}: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-xl font-light text-[#1d1d1d] mb-2">{title}</h2>
        <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/${post.slug}`}>
            <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
              <div className="relative overflow-hidden">
                <Image
                  src={post.cover}
                  alt={post.cover_alt || post.title}
                  width={400}
                  height={240}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <CardContent className="p-6">
                <h3 className="font-medium text-[#1d1d1d] mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-sm text-[#666] mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-[#999792] mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <time dateTime={post.publish_date.toISOString()}>
                      {post.publish_date.toLocaleDateString("vi-VN", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>3 phút đọc</span>
                  </div>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs bg-amber-100 text-amber-800 hover:bg-amber-200 border-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-gray-100 text-gray-600 border-0"
                      >
                        +{post.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-amber-700 hover:text-amber-800 transition-colors"
        >
          <span>xem tất cả câu chuyện</span>
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
