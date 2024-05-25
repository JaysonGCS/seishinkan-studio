import type { NextRequest } from 'next/server';

import { turnstileSchema } from '@/src/validation/turnstileValidation';
import { NextResponse } from 'next/server';

import { TURNSTILE_SITE_VERIFY } from '../../_utils/Constants';
import { logger } from '../../_utils/Logger';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { token } = turnstileSchema.parse(body);
  const ip = request.ip;

  const formData = new FormData();
  formData.append('secret', process.env.CAPTCHA_SECRET_KEY ?? '');
  formData.append('response', token);
  formData.append('remoteip', ip ?? '');
  const result = await fetch(TURNSTILE_SITE_VERIFY, {
    body: formData,
    method: 'POST',
  });
  const outcome = await result.json();
  try {
    if (outcome.success) {
      return NextResponse.json({}, { status: 200 });
    }
    return NextResponse.json(
      {
        message: `Validation Failed - ${JSON.stringify(outcome['error-codes']?.at(0) ?? 'Unknown')}`,
      },
      { status: 400 },
    );
  } catch (e) {
    logger.error(e);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
