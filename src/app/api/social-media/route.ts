import { NextResponse } from 'next/server';

import { getSocialMediaPayload } from '../../_data-access/server';
import { logger } from '../../_utils/Logger';

export async function GET() {
  try {
    const resp = await getSocialMediaPayload();
    return NextResponse.json(resp);
  } catch (e) {
    logger.error(`Error for retrieving social media details - ${e}`);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
