import Markdown from 'markdown-to-jsx';
import { getPostContent, getPostMetadata } from '@/utils/blog';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { useMemo } from 'react';
import { shuffle } from '@/utils/helper';

type Props = {
  params: { slug: string };
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata('blogs');

  return posts.map((post) => ({ slug: post.slug }));
};

export async function generateMetadata({ params }: Props) {
  const post = getPostContent(params.slug);

  const metadata: Metadata = {
    title: `Chuyện mình kể ⋅ ${post.data.title}`,
    description: post.content.split('\n')[1],
    authors: {
      name: 'Thang Bui Q',
      url: 'https://thangbuiq.work/',
    },
    applicationName: 'Nghe Chuyện Mình Kể',
    creator: 'Thang Bui Q',
    generator: 'Next.js',
    keywords: [
      'nextjs',
      'blog',
      'blogs',
      'Nghe Chuyện Mình Kể',
      'Chuyện Mình Kể',
      'nghechuyenminhke',
      'chuyenminhke',
      'story',
      'mood',
      'tâm trạng',
    ],
    openGraph: {
      title: `Chuyện mình kể ⋅ ${post.data.title}`,
      description: post.content.split('\n')[1],
      url: `/${params.slug}`,
      siteName: 'Chuyện mình kể',
      images: [
        {
          url: `https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png`,
          width: 800,
          height: 600,
        },
        {
          url: `https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png`,
          width: 1920,
          height: 1440,
          alt: post.data.title,
        },
      ],
      locale: 'vi_VN',
      type: 'website',
    },
  };

  return metadata;
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
      <div className="h-[1px] mt-14 bg-slate-500/40 w-full"></div>
      <div className="h-14"></div>
    </>
  );
}
