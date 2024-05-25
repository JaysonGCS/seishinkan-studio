import type { SocialMedia } from '@/src/payload-types';

import { getPayloadClient } from '@/src/getPayload';
import { NextResponse } from 'next/server';

import { logger } from '../../_utils/Logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  const payload = await getPayloadClient();
  try {
    const resp: SocialMedia = await payload.findGlobal({
      slug: 'social-media',
    });
    return NextResponse.json(resp);
  } catch (e) {
    logger.error(e);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
