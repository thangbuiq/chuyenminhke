"use client";

import { MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

interface CommentSectionProps {
  slug: string;
}

export default function CommentSection({ slug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    author: "Ẩn danh",
    content: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/${slug}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch(() => toast.error("Không thể tải bình luận"));
  }, [slug]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.author.trim() || !newComment.content.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/${slug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });

      const comment = await res.json();
      setComments((prev) => [comment, ...prev]);
      setNewComment({ author: "", content: "" });
      toast.success("Cảm ơn bạn đã chia sẻ! 🌱");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / 3600000);

    if (diffInHours < 1) return "vừa xong";
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    return `${Math.floor(diffInHours / 24)} ngày trước`;
  };

  return (
    <section className="mt-10 mb-10">
      <Card className="border-amber-200/50 bg-gradient-to-br from-amber-50/30 to-orange-50/30">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-2 text-lg font-light text-[#1d1d1d]">
            <MessageCircle size={20} />
            cảm xúc của bạn
          </CardTitle>
          <p className="text-sm text-[#666] mt-2">
            hãy chia sẻ những gì bạn cảm nhận sau khi đọc câu chuyện này
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="tên của bạn"
                value={newComment.author}
                onChange={(e) =>
                  setNewComment((prev) => ({ ...prev, author: e.target.value }))
                }
                className="border-amber-200 focus:border-amber-400 focus:ring-amber-200"
              />
            </div>

            <Textarea
              placeholder="chia sẻ cảm xúc của bạn về câu chuyện này..."
              value={newComment.content}
              onChange={(e) =>
                setNewComment((prev) => ({ ...prev, content: e.target.value }))
              }
              rows={4}
              className="border-amber-200 focus:border-amber-400 focus:ring-amber-200 resize-none"
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-amber-500 hover:bg-amber-600 text-white gap-2 transition-all duration-200"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    đang gửi...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    gửi cho tác giả
                  </>
                )}
              </Button>
            </div>
          </form>

          {comments.length > 0 && (
            <div className="space-y-4 border-t border-amber-200/50 pt-6">
              <h3 className="text-sm font-medium text-[#666] mb-4">
                {comments.length} cảm xúc đã được chia sẻ
              </h3>

              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white/60 rounded-lg p-4 border border-amber-100"
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 bg-amber-100">
                      <AvatarFallback className="text-amber-700 text-sm">
                        {comment.author.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-sm text-[#1d1d1d]">
                          {comment.author}
                        </span>
                        <span className="text-xs text-[#999792]">
                          {formatTimeAgo(comment.timestamp)}
                        </span>
                      </div>

                      <p className="text-sm text-[#666] leading-relaxed mb-3">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
