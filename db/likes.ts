'use server';

import { db } from '@/db';
import { likes } from '@/db/schema';
import { stackServerApp } from '@/stack/server';
import { eq, and, desc } from 'drizzle-orm';

export async function like(slug: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Not authenticated');
  await db.insert(likes).values({
    slug,
    userId: user.id,
  });
}

export async function allLikes() {
  const user = await stackServerApp.getUser();
  if (!user) return [];
  return db
    .select()
    .from(likes)
    .where(eq(likes.userId, user.id))
    .orderBy(desc(likes.slug));
}

export async function unlike(slug: string) {
  const user = await stackServerApp.getUser();
  if (!user) throw new Error('Not authenticated');
  await db
    .delete(likes)
    .where(and(eq(likes.userId, user.id), eq(likes.slug, slug)));
}
