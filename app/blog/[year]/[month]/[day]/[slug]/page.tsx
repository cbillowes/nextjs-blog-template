import { Markdown } from '@/components/markdown';
import { allPosts, Post } from 'content-collections';
import Image from 'next/image';

export default async function BlogPostPage({
  params,
}: {
  params: { year: string; month: string; day: string; slug: string };
}) {
  const { year, month, day, slug } = await params;

  const isMatch = (post: Post) =>
    post.slug.endsWith(`${year}/${month}/${day}/${slug}`);

  const post = allPosts.find(isMatch);
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
