import { Markdown } from '@/components/markdown';
import { allPosts, Post } from 'content-collections';
import Image from 'next/image';

const SITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;

type Props = {
  params: {
    year: string;
    month: string;
    day: string;
    slug: string;
  };
};

async function isPostMatch(props: Props) {
  const { year, month, day, slug } = await props.params;
  return (post: Post) => post.slug.endsWith(`/${year}/${month}/${day}/${slug}`);
}

export async function generateMetadata({ params }: Props) {
  const post = allPosts.find(await isPostMatch({ params }));
  if (!post) return;

  const canonicalUrl = `${SITE_URL}/${post.slug}`;
  const imageUrl = `${SITE_URL}/${post.hero}`;
  return {
    title: post.title,
    authors: [{ name: 'Clarice Bouwer' }],
    description: `${post.summary.substring(0, 140)}${
      post.summary.length > 140 ? '...' : ''
    }`,
    imageUrl,
    url: canonicalUrl,
    type: 'article',
    openGraph: {
      siteName: 'My Next.js Blog',
      title: post.title,
      description: post.summary,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
          // You could create a preprocessor to convert all your images to png for your og:image
          // https://github.com/cbillowes/curious-programmer-mercury/blob/main/scripts/process-webp.js
          type: 'image/png',
        },
      ],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = allPosts.find(await isPostMatch({ params }));
  if (!post) {
    return <div>The post cannot be found.</div>;
  }
  return (
    <div>
      <Image
        src={post.hero}
        width={1024}
        height={800}
        alt="Hero image"
        className="object-cover w-full h-128 mb-4"
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-center text-7xl font-bold">{post.title}</h1>
        <p className="text-center text-gray-500 mb-8">
          {post.date} &middot; {post.timeToRead}
        </p>
        <div className="prose prose-lg mx-auto">
          <p>{post.summary}</p>
          <Markdown id="post" content={post.content} />
        </div>
      </div>
    </div>
  );
}
