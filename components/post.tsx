import { useState } from 'react';
import Image from 'next/image';
import { like, unlike } from '@/db/likes';
import { BiSolidHeart, BiHeart } from 'react-icons/bi';
import { Spinner } from '@/components/spinner';
import { useUser } from '@stackframe/stack';

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
    <li
      key={slug}
      className="border-10 border-gray-700 rounded-lg overflow-hidden shadow-lg"
    >
      <a href={slug}>
        <Image src={hero} alt={title} width={600} height={400} />
        <div className="p-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <p>
            {timeToRead} &middot; {date}
          </p>
          <p>{summary}</p>
        </div>
      </a>
      {!user && (
        <div className="p-4 text-gray-500 flex items-center gap-2">
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
        <div className="p-4">
          {busy && <Spinner />}
          {!busy && (
            <div>
              {liked ? (
                <BiSolidHeart
                  className="cursor-pointer"
                  onClick={() => {
                    handleClick(true, slug);
                  }}
                />
              ) : (
                <BiHeart
                  className="cursor-pointer"
                  onClick={() => {
                    handleClick(false, slug);
                  }}
                />
              )}
            </div>
          )}
          {errorMessage && (
            <div className="text-red-400 font-bold">Error: {errorMessage}</div>
          )}
        </div>
      )}
    </li>
  );
}
