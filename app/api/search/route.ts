import { NextResponse } from 'next/server';
import { allPosts } from 'content-collections';

function getPathWithDomain(path: string) {
  return path.startsWith('http')
    ? path
    : `${process.env.NEXT_PUBLIC_SEARCH_DOMAIN}${path}`;
}

export async function GET() {
  const articles = allPosts.map(
    ({ slug, title, summary, hero, tags, date, content }) => ({
      objectID: slug,
      date,
      title,
      tags,
      summary,
      slug,
      content,
      imageUrl: getPathWithDomain(hero),
    }),
  );
  const data = articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return NextResponse.json(data);
}
