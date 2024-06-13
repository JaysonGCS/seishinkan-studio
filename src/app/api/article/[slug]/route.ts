import { getArticlePayload } from '@/src/app/_data-access/server';
import { slugSchema } from '@/src/validation/slugValidation';
import { NextResponse } from 'next/server';

import { logger } from '../../../_utils/Logger';

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = slugSchema.parse(params);
    const article = await getArticlePayload(slug);
    return NextResponse.json(article);
  } catch (e) {
    logger.error(`Failed to load article - ${e}`);
    return NextResponse.json(
      { message: 'Failed to load article.' },
      { status: 500 },
    );
  }
}
