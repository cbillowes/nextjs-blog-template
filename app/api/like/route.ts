import { like } from '@/db/likes';
import { stackServerApp } from '@/stack/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { slug } = await request.json();
  const user = await stackServerApp.getUser();
  if (user) {
    await like(slug);
    return NextResponse.json({
      message: 'Liked',
      added: true,
    });
  } else {
    return NextResponse.json({
      message: 'You need to be logged in',
      added: false,
    });
  }
}
