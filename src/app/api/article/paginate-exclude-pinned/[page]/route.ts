import type { Article } from '@/src/payload-types';
import type { PaginatedDocs } from 'payload/database';

import { logger } from '@/src/app/_utils/Logger';
import { getPayloadClient } from '@/src/getPayload';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: { page: number } },
) {
  const pageNumber = Math.max(Number(params.page), 0);
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
      // TODO: increase limit
      limit: 1,
      page: pageNumber === 0 ? undefined : pageNumber,
      where: {
        ['id']: {
          not_in: pinnedArticlesIds,
        },
      },
    });
    const { docs, nextPage = null, prevPage = null, totalPages } = resp;
    return NextResponse.json({
      docs,
      nextPage,
      prevPage,
      totalPages,
    });
  } catch (e) {
    logger.error(`Failed to load articles - ${e}`);
    return NextResponse.json(
      { message: 'Failed to load articles.' },
      { status: 500 },
    );
  }
}

export interface PaginatedArticleResponse {
  docs: PaginatedDocs<Article>['docs'];
  nextPage: null | number;
  prevPage: null | number;
  totalPages: number;
}
