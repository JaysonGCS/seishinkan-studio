import Link from 'next/link';
import React from 'react';

import { getArticle } from '../../_data-access/Article';
import { MainPage } from '../../_utils/Paths';

interface OwnProps {
  slug: string;
  title: string;
}

export const ArticleEntry = async (props: OwnProps) => {
  const { slug, title } = props;
  const href = `${MainPage.NEWS_AND_ARTICLES}/${slug}`;
  const article = await getArticle(slug);
  const summary = article.summary;
  // TODO: add thumbnail
  return (
    <article>
      <div>
        <Link href={href}>
          <h3>{title}</h3>
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
