import type { MetadataRoute } from 'next';
import { allPosts } from 'content-collections';
import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

function getImageUrl(image: string | undefined) {
  if (!image) return undefined;
  const url = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  return url.replace(/&/g, '&amp;');
}

function getSitemapEntry(
  slug: string,
  date: string,
  image: string | undefined,
) {
  return {
    url: `${SITE_URL}${slug}`,
    lastModified: new Date(date),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
    images: [getImageUrl(image)].filter(Boolean) as string[],
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: MetadataRoute.Sitemap = allPosts.map((a) =>
    getSitemapEntry(a.slug, a.date, a.hero),
  );

  const homePageStat = fs.statSync(path.join(process.cwd(), 'app', 'page.tsx'));
  return [
    {
      url: SITE_URL,
      lastModified: new Date(homePageStat.mtime),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    ...posts,
  ];
}
