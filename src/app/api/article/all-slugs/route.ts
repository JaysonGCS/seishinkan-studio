import type { Article } from '@/src/payload-types';
import type { PaginatedDocs } from 'payload/database';

import { getPayloadClient } from '@/src/getPayload';
import { NextResponse } from 'next/server';

import { logger } from '../../../_utils/Logger';

export async function GET() {
  const payload = await getPayloadClient();
  try {
    const resp = await payload.find<'articles'>({
      collection: 'articles',
    });
    const result = processAllSlugsResponse(resp);
    return NextResponse.json(result);
  } catch (e) {
    logger.error(`Failed to retrieve article slugs - ${e}`);
    return NextResponse.json(
      { message: 'Failed to load article slugs.' },
      { status: 500 },
    );
  }
}

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
