import Markdown from 'markdown-to-jsx';
import { getPostContent, getPostMetadata } from '@/utils/blog';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata('blogs');

  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata({ params }: Props) {
  const id = params?.slug ? ' ⋅ ' + params?.slug : '';
  return {
    title: `Chuyện mình kể ${id.replaceAll('-', ' ')}`,
  };
}

export default function BlogPage({ params: { slug } }: { params: { slug: string } }) {
  const post = getPostContent(slug);

  return (
    <>
      <header className="pt-32">
        <Link href={'/'}>
          <Image src={'/icon.png'} alt="Nghe Chuyen Minh Ke Icon" width={70} height={70} />
        </Link>
      </header>
      <article className="mt-20">
        <h1 className="text-[#1d1d1d] text-xl">{post.data.title}</h1>
        <p className="mt-2 text-[#787670] text-sm">
          {post.data.publish_date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
        <div className="py-14">
          <Image
            src={post.data.cover}
            alt={post.data.cover_alt}
            priority
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
        <Markdown>{post.content}</Markdown>
      </article>
    </>
  );
}
