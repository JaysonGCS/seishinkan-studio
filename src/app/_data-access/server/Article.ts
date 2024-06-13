import type { Article } from '@/src/payload-types';
import type { PaginatedArticleResponse } from '@/src/types/apiTypes';
import type { PaginatedDocs } from 'payload/database';

import { getPayloadClient } from '@/src/getPayload';

const DEFAULT_ARTICLE_LIMIT = 5;

export const getArticle = async (slug: string): Promise<Article> => {
  return await getArticlePayload(slug);
};

export const getArticlePayload = async (slug: string): Promise<Article> => {
  const payload = await getPayloadClient();
  try {
    const resp = await payload.find<'articles'>({
      collection: 'articles',
      limit: 1,
      where: {
        ['slug']: {
          equals: slug,
        },
      },
    });
    if (resp.totalDocs === 1) {
      return resp.docs[0];
    }
    throw new Error('No article found.');
  } catch (e) {
    throw new Error('Failed to load article.');
  }
};

export const getAllArticlesExcludePinned = async (
  page: number,
): Promise<PaginatedArticleResponse> => {
  return await getAllArticlesExcludePinnedPayload(page);
};

export const getAllArticlesExcludePinnedPayload = async (
  page: number,
): Promise<PaginatedArticleResponse> => {
  const pageNumber = Math.max(page, 0);
  const payload = await getPayloadClient();
  try {
    const newsAndArticlesPage = await payload.findGlobal({
      slug: 'news-and-articles-page',
    });
    const pinnedArticles = newsAndArticlesPage.pinnedArticles;
    const pinnedArticlesIds = (pinnedArticles ?? []).reduce<number[]>(
      (total, article) => {
        if (typeof article !== 'number') {
          total.push(article.id);
        }
        return total;
      },
      [],
    );
    const resp = await payload.find<'articles'>({
      collection: 'articles',
      limit: DEFAULT_ARTICLE_LIMIT,
      page: pageNumber === 0 ? undefined : pageNumber,
      where: {
        ['id']: {
          not_in: pinnedArticlesIds,
        },
      },
    });
    const { docs, nextPage = null, prevPage = null, totalPages } = resp;
    return {
      docs,
      nextPage,
      prevPage,
      totalPages,
    };
  } catch (e) {
    throw new Error('Failed to load article.');
  }
};

export const getAllArticleSlugs = async (): Promise<{ slugs: string[] }> => {
  const payload = await getPayloadClient();
  try {
    const resp = await payload.find<'articles'>({
      collection: 'articles',
    });
    return processAllSlugsResponse(resp);
  } catch (e) {
    throw new Error('Failed to load article slugs - ', e);
  }
};

const processAllSlugsResponse = (resp: PaginatedDocs<Article>) => {
  const { docs } = resp;
  const slugs = docs.reduce<string[]>((total, doc) => {
    if (typeof doc.slug === 'string') {
      total.push(doc.slug);
    }
    return total;
  }, []);
  return { slugs };
};
