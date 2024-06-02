import type { Metadata } from 'next';

import { DisabledPage } from '@/src/app/_components/DisabledPage/DisabledPage';
import { Section } from '@/src/app/_components/Section/Section';
import { getArticle } from '@/src/app/_data-access/Article';

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

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = await getArticle(slug);
  const content_html = article?.content_html;
  const title = article?.title;

  if (content_html === null || content_html === undefined) {
    return <DisabledPage />;
  }

  return (
    <Section>
      <div className="p-4 lg:px-20">
        <h2 className="pb-4">{title}</h2>
        <article dangerouslySetInnerHTML={{ __html: content_html }} />
      </div>
    </Section>
  );
}
