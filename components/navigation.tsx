'use client';

import { useStackApp, useUser } from '@stackframe/stack';
import Link from 'next/link';

export function Navigation() {
  const app = useStackApp();
  const user = useUser();

  return (
    <nav>
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
    </nav>
  );
}
