import { allPosts } from '@/.content-collections/generated';
import { Posts } from '@/components/posts';
import { allLikes } from '@/db/likes';

export default async function ZonePage() {
  const likes = await allLikes();
  const likedPosts = allPosts.filter((post) =>
    likes.find((like) => like.slug === post.slug),
  );

  return (
    <main>
      <h1 className="text-4xl font-bold text-center my-8">
        Welcome to the Blog
      </h1>
      <Posts posts={likedPosts} likes={likes} />
    </main>
  );
}
