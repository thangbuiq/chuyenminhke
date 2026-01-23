import Footer from "@/components/common/footer";
import PostList from "@/components/common/post-list";
import Hero from "@/components/home/hero";
import { prisma } from "@/lib/prisma";
import { getPostMetadata } from "@/utils/blog";

export default async function Home() {
  let postMetadata: any[] = [];
  try {
    postMetadata = getPostMetadata("blogs");
  } catch (error) {
    console.error("Failed to load blog posts:", error);
    postMetadata = [];
  }

  let postsWithStats = postMetadata;
  try {
    const slugs = postMetadata.map((p) => p.slug);

    const [likes, comments] = await Promise.all([
      prisma.like.findMany({
        where: { slug: { in: slugs } },
      }),
      prisma.comment.groupBy({
        by: ["slug"],
        _count: {
          id: true,
        },
        where: {
          slug: { in: slugs },
        },
      }),
    ]);

    postsWithStats = postMetadata.map((post) => {
      const like = likes.find((l) => l.slug === post.slug);
      const comment = comments.find((c) => c.slug === post.slug);

      return {
        ...post,
        like_count: like?.count || 0,
        comment_count: comment?._count.id || 0,
      };
    });
  } catch (error) {
    console.warn("Failed to fetch post stats:", error);
  }

  return (
    <>
      <Hero />
      <main className="mt-10 sm:mt-14 px-4 sm:px-0 flex flex-col gap-6">
        <div className="flex items-center mb-4">
          <h2
            className="text-lg sm:text-xl text-[#1d1d1d] font-semibold"
            id="frontpage-title"
          >
            nên mình viết...
          </h2>
        </div>

        <PostList posts={postsWithStats} />
        <Footer />
      </main>
    </>
  );
}
