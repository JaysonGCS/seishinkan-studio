import { pageVerificationSchema } from '@/src/validation/pageValidation';
import { NextResponse } from 'next/server';

import { isPageEnabledPayload } from '../../_data-access/server';
import { logger } from '../../_utils/Logger';

export async function POST(request: Request) {
  const body = await request.json();
  const { page } = pageVerificationSchema.parse(body);
  try {
    const { enabled } = await isPageEnabledPayload(page);
    return NextResponse.json({
      enabled,
    });
  } catch (e) {
    logger.error(`Error for validating allowed page - ${e}`);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
