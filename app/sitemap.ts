import type { MetadataRoute } from 'next';
import { allPosts } from 'content-collections';
import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

// Ensures the URL is always an absolute URL
function getImageUrl(image: string | undefined) {
  if (!image) return undefined;
  // Determines if the image is an absolute URL or a relative path
  const url = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  // Fix breaking XML characters
  return url.replace(/&/g, '&amp;');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: MetadataRoute.Sitemap = allPosts.map(({ slug, date, hero }) => ({
    url: `${SITE_URL}${slug}`,
    lastModified: new Date(date),
    changeFrequency: 'yearly' as const, // You can adjust as needed
    priority: 0.7, // You can adjust as needed
    images: [getImageUrl(hero)].filter(Boolean) as string[],
  }));

  // Used to get the last modified date of the home page
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
