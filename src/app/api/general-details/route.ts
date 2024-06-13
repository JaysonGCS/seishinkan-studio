import type { General } from '@/src/payload-types';

import { NextResponse } from 'next/server';

import { getGeneralDetailsPayload } from '../../_data-access/server';
import { logger } from '../../_utils/Logger';

export async function GET() {
  try {
    const resp: General = await getGeneralDetailsPayload();
    return NextResponse.json(resp);
  } catch (e) {
    logger.error(`Error for getting general details - ${e}`);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
