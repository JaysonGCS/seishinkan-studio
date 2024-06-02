'use server';
import type { NewsAndArticlesPage } from '@/src/payload-types';
import type { ReactElement } from 'react';

import React from 'react';

import { ArticleEntry } from '../../_components/ArticleEntry/ArticleEntry';

interface OwnProps {
  posts: NewsAndArticlesPage['pinnedArticles'];
}

const DEFAULT_POSTS = [];

export const PinnedPostsArea = (props: OwnProps) => {
  const { posts } = props;

  const validPosts = (posts ?? DEFAULT_POSTS).filter((post) => {
    return typeof post !== 'number';
  });

  const articles = validPosts.reduce<ReactElement[]>((total, post) => {
    const { slug, title } = post;
    if (slug === null || slug === undefined) {
      return total;
    }
    total.push(<ArticleEntry slug={slug} title={title} />);
    return total;
  }, []);

  return <div>{articles}</div>;
};
