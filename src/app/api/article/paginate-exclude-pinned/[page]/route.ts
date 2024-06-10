import type { PaginatedArticleResponse } from '@/src/types/apiTypes';

import { logger } from '@/src/app/_utils/Logger';
import { getPayloadClient } from '@/src/getPayload';
import { NextResponse } from 'next/server';

const DEFAULT_ARTICLE_LIMIT = 5;

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
      limit: DEFAULT_ARTICLE_LIMIT,
      page: pageNumber === 0 ? undefined : pageNumber,
      where: {
        ['id']: {
          not_in: pinnedArticlesIds,
        },
      },
    });
    const { docs, nextPage = null, prevPage = null, totalPages } = resp;
    return NextResponse.json<PaginatedArticleResponse>({
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
