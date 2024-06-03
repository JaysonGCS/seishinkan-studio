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

const DEFAULT_THUMBNAIL_WIDTH = MediaConstant.thumbnail.width;
const DEFAULT_THUMBNAIL_HEIGHT = MediaConstant.thumbnail.height;

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
    <article className="flex flex-col gap-4 md:flex-row">
      <Image
        alt={alt ?? ''}
        className="aspect-4/3 w-auto"
        height={DEFAULT_THUMBNAIL_HEIGHT}
        src={url}
        width={DEFAULT_THUMBNAIL_WIDTH}
      />
      <div className="flex flex-col justify-between">
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
