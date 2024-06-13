import type { NextRequest } from 'next/server';

import { getPageDetailsPayload } from '@/src/app/_data-access/server';
import { isPageSlug } from '@/src/app/_utils/Paths';
import { NextResponse } from 'next/server';

import { logger } from '../../../_utils/Logger';

export async function GET(
  _request: NextRequest,
  { params }: { params: { pageSlug: string } },
) {
  const { pageSlug } = params;
  if (!isPageSlug(pageSlug)) {
    logger.error('Invalid page slug');
    return NextResponse.json({ message: 'Invalid page slug' }, { status: 400 });
  }
  try {
    const pageDetails = await getPageDetailsPayload(pageSlug);
    return NextResponse.json(pageDetails);
  } catch (e) {
    logger.error(`Error for retrieving page details - ${e}`);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
