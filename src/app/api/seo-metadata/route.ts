import type { SeoMetadata } from '@/src/types/apiTypes';

import { seoVerificationSchema } from '@/src/validation/pageValidation';
import { NextResponse } from 'next/server';

import { getSeoMetadataPayload } from '../../_data-access/server';
import { logger } from '../../_utils/Logger';

export async function POST(request: Request) {
  const body = await request.json();
  const { page } = seoVerificationSchema.parse(body);
  try {
    const seoMetadata: SeoMetadata = await getSeoMetadataPayload(page);
    return NextResponse.json(seoMetadata);
  } catch (e) {
    logger.error(`Error for retrieving SEO metadata - ${e}`);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
