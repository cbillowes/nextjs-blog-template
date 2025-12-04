import { like, unlike } from '@/db/likes';
import { stackServerApp } from '@/stack/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { slug } = await request.json();
  const user = await stackServerApp.getUser();
  if (user) {
    await like(slug);
    return NextResponse.json({
      message: 'Liked',
    });
  } else {
    return NextResponse.json({
      message: 'You need to be logged in',
    });
  }
}

export async function DELETE(request: Request) {
  const { slug } = await request.json();
  const user = await stackServerApp.getUser();
  if (user) {
    await unlike(slug);
    return NextResponse.json({
      message: 'Unliked',
    });
  } else {
    return NextResponse.json({
      message: 'You need to be logged in',
    });
  }
}
