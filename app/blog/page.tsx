import { allPosts } from 'content-collections';
import Image from 'next/image';

export default function BlogPage() {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {allPosts.map((post) => (
        <li
          key={post.slug}
          className="border-10 border-gray-700 rounded-lg overflow-hidden shadow-lg"
        >
          <a href={post.slug}>
            <Image src={post.hero} alt={post.title} width={600} height={400} />
            <div className="p-4">
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p>
                {post.timeToRead} &middot; {post.date}
              </p>
              <p>{post.summary}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
