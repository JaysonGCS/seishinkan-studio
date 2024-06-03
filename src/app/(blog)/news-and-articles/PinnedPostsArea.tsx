'use server';
import type { Article, NewsAndArticlesPage } from '@/src/payload-types';
import type { ReactElement } from 'react';

import React from 'react';

import { ArticleEntry } from '../../_components/ArticleEntry/ArticleEntry';

interface OwnProps {
  posts: NewsAndArticlesPage['pinnedArticles'];
}

const DEFAULT_POSTS = [];

const isArticle = (articles: Article | number): articles is Article => {
  return typeof articles !== 'number';
};

export const PinnedPostsArea = (props: OwnProps) => {
  const { posts } = props;

  const validPosts = (posts ?? DEFAULT_POSTS).filter<Article>(isArticle);

  const articles = validPosts.reduce<ReactElement[]>((total, post) => {
    const { slug, date, image, summary, title } = post;
    if (
      slug === null ||
      slug === undefined ||
      image === undefined ||
      typeof image === 'number'
    ) {
      return total;
    }
    total.push(
      <ArticleEntry
        date={date}
        image={image}
        slug={slug}
        summary={summary}
        title={title}
      />,
    );
    return total;
  }, []);

  return <div>{articles}</div>;
};
