import type { Metadata } from 'next';

import { DisabledPage } from '@/src/app/_components/DisabledPage/DisabledPage';
import { Section } from '@/src/app/_components/Section/Section';
import { getAllArticleSlugs, getArticle } from '@/src/app/_data-access/Article';
import dayjs from 'dayjs';
import Image from 'next/image';

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const slug = params.slug;
  const article = await getArticle(slug);

  return {
    description: article.meta?.description,
    title: article.meta?.title,
  };
}

export async function generateStaticParams() {
  const { slugs } = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = await getArticle(slug);
  const date = article.date;
  const content_html = article?.content_html;
  const title = article?.title;
  const image = article.image;

  if (
    content_html === null ||
    content_html === undefined ||
    typeof image === 'number'
  ) {
    return <DisabledPage />;
  }
  const alt = image.alt ?? '';
  const url = image.url;
  const height = image?.height ?? 0;
  const width = image?.width ?? 0;
  const dateStr = dayjs(date).format('D MMMM YYYY').toString();

  return (
    <Section>
      <div className="flex flex-col gap-4 p-4 lg:px-20">
        <h2 className="font-bold">
          <span>{title}</span>
          <span> • {dateStr}</span>
        </h2>
        {url ? (
          <div className="flex w-full justify-center">
            <Image
              alt={alt}
              className="aspect-4/3 w-auto"
              height={height}
              src={url}
              width={width}
            />
          </div>
        ) : null}
        <article dangerouslySetInnerHTML={{ __html: content_html }} />
      </div>
    </Section>
  );
}
