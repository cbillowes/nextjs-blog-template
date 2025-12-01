import { stackServerApp } from '@/stack/server';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await stackServerApp.getUser({ or: 'redirect' });
  return children;
}
