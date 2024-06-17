'use server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { HomePage } from '../payload-types';

import { MainPage } from './_utils/Paths';

interface OwnProps {
  articles: HomePage['announcementArticles'];
}

export const AnnouncementArea = (props: OwnProps) => {
  const { articles } = props;
  const validArticles = articles.filter(
    (article) => typeof article !== 'string',
  );
  const articleList = validArticles.reduce<React.ReactElement[]>(
    (total, article) => {
      if (typeof article !== 'number') {
        article.summary;
        const { slug, date, image, summary, title } = article;
        const href = `${MainPage.NEWS_AND_ARTICLES}/${slug}`;
        const dateStr = dayjs(date).format('D MMMM YYYY').toString();
        const getImage = () => {
          if (typeof image === 'number') {
            return null;
          }
          const alt = image.alt ?? '';
          const card = image.sizes?.card;
          const height = card?.height ?? 0;
          const width = card?.width ?? 0;
          const url = card?.url ?? '';
          return (
            <Link href={href}>
              <Image
                alt={alt}
                className="rounded-t-md"
                height={height}
                src={url}
                width={width}
              />
            </Link>
          );
        };
        total.push(
          <CarouselItem
            className="flex justify-center md:basis-1/2 lg:basis-1/3"
            key={`announcement-${title}`}
          >
            <Card className="w-[350px] bg-card-foreground text-card">
              {getImage()}
              <Link href={href}>
                <CardHeader>
                  <CardTitle className="text-primary-foreground">
                    {title}
                  </CardTitle>
                  <CardDescription className="text-muted">
                    {dateStr}
                  </CardDescription>
                </CardHeader>
              </Link>
              <CardContent>
                <Link href={href}>
                  <p className="text-primary-foreground">{summary}</p>
                </Link>
              </CardContent>
            </Card>
          </CarouselItem>,
        );
      }
      return total;
    },
    [],
  );

  return (
    <Carousel>
      <CarouselContent className="flex w-[80vw] content-center">
        {articleList}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
