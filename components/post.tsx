'use client';

import { useState } from 'react';
import { like, unlike } from '@/db/likes';
import { BiSolidHeart, BiHeart } from 'react-icons/bi';
import { useUser } from '@stackframe/stack';
import { Tooltip, Spinner, Card } from 'flowbite-react';
import Link from 'next/link';

export function Post({
  slug,
  hero,
  title,
  timeToRead,
  date,
  summary,
  liked,
}: {
  slug: string;
  hero: string;
  title: string;
  timeToRead: string;
  date: string;
  summary: string;
  liked: boolean;
}) {
  const user = useUser();
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setErrorMessage(error.message);
    }
  };

  const handleClick = async (liked: boolean, slug: string) => {
    try {
      setBusy(true);
      if (liked) {
        await unlike(slug);
      } else {
        await like(slug);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card className="w-full" imgAlt={title} imgSrc={hero}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <Link href={slug}>{title}</Link>
      </h5>
      <div className="font-normal text-gray-700 dark:text-gray-400">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {timeToRead} &middot; {date}
        </p>
        {summary}
      </div>
      <div>
        {!user && (
          <div className="flex items-center gap-2">
            <BiSolidHeart
              className="cursor-pointer"
              onClick={() => {
                window.location.href = '/handler/login';
              }}
            />
            Log in to like this post
          </div>
        )}
        {user && (
          <div>
            {busy && <Spinner size="sm" />}
            {!busy && (
              <div>
                {liked ? (
                  <Tooltip content="Unlike">
                    <BiSolidHeart
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        handleClick(true, slug);
                      }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip content="Like">
                    <BiHeart
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        handleClick(false, slug);
                      }}
                    />
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="text-red-400 font-bold">{errorMessage}</div>
      )}
    </Card>
  );
}
