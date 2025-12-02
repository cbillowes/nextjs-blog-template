import { unlike } from '@/db/likes';
import { stackServerApp } from '@/stack/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { slug } = await request.json();
  const user = await stackServerApp.getUser();
  if (user) {
    await unlike(slug);
    return NextResponse.json({
      message: 'Unliked',
      added: false,
    });
  } else {
    return NextResponse.json({
      message: 'You need to be logged in',
      added: false,
    });
  }
}
