'use client';

import { useStackApp, useUser } from '@stackframe/stack';
import Link from 'next/link';
import { Search } from '@/components/search';
import { ThemeToggle } from '@/components/theme-toggle';

export function Navigation() {
  const app = useStackApp();
  const user = useUser();

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200/50 dark:bg-gray-800/50 dark:border-gray-700 backdrop-blur-2xl z-100 py-2">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/zone">Dashboard</Link>
              </li>
              <li>
                <Link href={app.urls.accountSettings}>Profile</Link>
              </li>
              <li>
                <Link href={app.urls.signOut}>Logout</Link>
              </li>
            </>
          ) : (
            <li>
              <Link href={app.urls.signIn}>Login</Link>
            </li>
          )}
        </ul>
        <div className="flex items-center gap-2">
          <Search />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
