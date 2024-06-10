import type { NextRequest } from 'next/server';

import { isPageSlug } from '@/src/app/_utils/Paths';
import { getPayloadClient } from '@/src/getPayload';
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
  const payload = await getPayloadClient();
  try {
    const pageDetails = await payload.findGlobal({
      slug: pageSlug,
    });
    return NextResponse.json(pageDetails);
  } catch (e) {
    logger.error(e);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
