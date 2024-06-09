import type { Article } from '@/src/payload-types';

import type { PaginatedArticleResponse } from '../api/article/paginate-exclude-pinned/[page]/route';

export const getArticle = async (slug: string): Promise<Article> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/article/${slug}`,
    {
      method: 'GET',
    },
  );
  if (!resp.ok) {
    const result = await resp.json();
    const message = result.message;
    throw new Error(message);
  }
  return await resp.json();
};

export const getAllArticleSlugs = async (): Promise<{ slugs: string[] }> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/article/all-slugs`,
    {
      method: 'GET',
    },
  );
  if (!resp.ok) {
    const result = await resp.json();
    const message = result.message;
    throw new Error(message);
  }
  return await resp.json();
};

export const getAllArticlesExcludePinned = async (
  page: number,
): Promise<PaginatedArticleResponse> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/article/paginate-exclude-pinned/${page}`,
    {
      method: 'GET',
    },
  );
  if (!resp.ok) {
    const result = await resp.json();
    const message = result.message;
    throw new Error(message);
  }
  return await resp.json();
};
