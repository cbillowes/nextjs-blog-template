import { allPosts } from '@/.content-collections/generated';
import { Posts } from '@/components/posts';
import { allLikes } from '@/db/likes';

export default async function BlogPage() {
  const likes = await allLikes();

  return (
    <main>
      <h1 className="text-4xl font-bold text-center my-8">
        Welcome to the Blog
      </h1>
      <Posts posts={allPosts} likes={likes} />
    </main>
  );
}
