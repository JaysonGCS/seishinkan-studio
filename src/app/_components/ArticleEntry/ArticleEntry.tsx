import type { ArticleMedia } from '@/src/payload-types';

import { MediaConstant } from '@/src/Constants';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

import { MainPage } from '../../_utils/Paths';

interface OwnProps {
  date: string;
  image: ArticleMedia;
  slug: string;
  summary: string;
  title: string;
}

const DEFAULT_THUMBNAIL_WIDTH = MediaConstant.thumbnail.width / 2;
const DEFAULT_THUMBNAIL_HEIGHT = MediaConstant.thumbnail.height / 2;

export const ArticleEntry = (props: OwnProps) => {
  const { slug, date, image, summary, title } = props;
  const href = `${MainPage.NEWS_AND_ARTICLES}/${slug}`;
  const { alt, sizes } = image;
  const thumbnail = sizes?.thumbnail;
  const url = thumbnail?.url;

  if (url === undefined || url === null) {
    return null;
  }
  const dateStr = dayjs(date).format('D MMMM YYYY').toString();
  return (
    <article className="flex flex-col items-center gap-4 md:flex-row md:items-start">
      <Link href={href}>
        <div
          className="relative aspect-4/3"
          style={{
            height: DEFAULT_THUMBNAIL_HEIGHT,
            width: DEFAULT_THUMBNAIL_WIDTH,
          }}
        >
          <Image
            alt={alt ?? ''}
            className="rounded-sm"
            fill
            objectFit="contain"
            src={url}
          />
        </div>
      </Link>
      <div className="flex h-full flex-col justify-between">
        <Link href={href}>
          <h3 className="font-bold">
            <span>{title}</span>
            <span> • {dateStr}</span>
          </h3>
        </Link>
        <div>
          <Link href={href}>
            <p>{summary}</p>
          </Link>
        </div>
      </div>
    </article>
  );
};
