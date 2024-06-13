import { getAllArticleSlugs } from '@/src/app/_data-access/server';
import { NextResponse } from 'next/server';

import { logger } from '../../../_utils/Logger';

export async function GET() {
  try {
    const result = await getAllArticleSlugs();
    return NextResponse.json(result);
  } catch (e) {
    logger.error(`Failed to retrieve article slugs - ${e}`);
    return NextResponse.json(
      { message: 'Failed to load article slugs.' },
      { status: 500 },
    );
  }
}
