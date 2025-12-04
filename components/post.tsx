'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useUser } from '@stackframe/stack';
import { Tooltip, Spinner, Card, Toast, ToastToggle } from 'flowbite-react';
import { BiSolidHeart, BiHeart } from 'react-icons/bi';
import { HiCheck } from 'react-icons/hi2';
import { HiX } from 'react-icons/hi';

export function Post({
  slug,
  hero,
  title,
  timeToRead,
  date,
  summary,
  liked,
  onUnlike,
}: {
  slug: string;
  hero: string;
  title: string;
  timeToRead: string;
  date: string;
  summary: string;
  liked: boolean;
  onUnlike?: (slug: string) => void;
}) {
  const user = useUser();
  const [isLiked, setIsLiked] = useState(liked);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    isError: false,
  });

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setToast({ show: true, message: error.message, isError: true });
    }
  };

  const handleAction = async (method: string, slug: string) => {
    try {
      const response = await fetch('/api/like', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug }),
      });
      const { message } = await response.json();
      if (!response.ok) {
        throw new Error(message || 'Something went wrong');
      }
      setToast({ show: true, message, isError: false });
    } catch (error) {
      throw error;
    }
  };

  const like = (slug: string) => handleAction('POST', slug);
  const unlike = (slug: string) => handleAction('DELETE', slug);

  const handleClick = async (liked: boolean, slug: string) => {
    try {
      setBusy(true);
      if (liked) {
        await unlike(slug);
        setIsLiked(false);
        onUnlike?.(slug);
      } else {
        await like(slug);
        setIsLiked(true);
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
                {isLiked ? (
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
      {toast.show && (
        <Toast className="absolute bottom-2 right-2">
          {!toast.isError && (
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
          )}
          {toast.isError && (
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
          )}
          <div className="ml-3 text-sm font-normal">{toast.message}</div>
          <ToastToggle />
        </Toast>
      )}
    </Card>
  );
}
