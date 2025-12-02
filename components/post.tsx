import { useState } from 'react';
import Image from 'next/image';
import { like, unlike } from '@/db/likes';
import { BiSolidHeart, BiHeart } from 'react-icons/bi';
import { Spinner } from '@/components/spinner';

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
  const [busy, setBusy] = useState(false);

  const handleLike = async (slug: string) => {
    setBusy(true);
    await like(slug);
    setBusy(false);
  };

  const handleUnlike = async (slug: string) => {
    setBusy(true);
    await unlike(slug);
    setBusy(false);
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
      <div className="p-4">
        {busy && <Spinner />}
        {!busy && (
          <div>
            {liked ? (
              <BiSolidHeart
                className="cursor-pointer"
                onClick={() => {
                  handleUnlike(slug);
                }}
              />
            ) : (
              <BiHeart
                className="cursor-pointer"
                onClick={() => {
                  handleLike(slug);
                }}
              />
            )}
          </div>
        )}
      </div>
    </li>
  );
}
