import type { PaginatedArticleResponse } from '@/src/types/apiTypes';

import { getAllArticlesExcludePinnedPayload } from '@/src/app/_data-access/server';
import { logger } from '@/src/app/_utils/Logger';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: { page: number } },
) {
  try {
    const resp = await getAllArticlesExcludePinnedPayload(params.page);
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
