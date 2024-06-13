import { getPayloadClient } from '@/src/getPayload';
import { emailVerificationSchema } from '@/src/validation/emailValidation';
import { NextResponse } from 'next/server';

import { logger } from '../../_utils/Logger';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.json();
  const { token } = emailVerificationSchema.parse(body);

  const payload = await getPayloadClient();
  try {
    const result = await payload.find({
      collection: 'website-users',
      where: { _verificationToken: { equals: token } },
    });
    if (result.totalDocs === 1) {
      const user = result.docs[0];
      payload.update({
        id: user.id,
        collection: 'website-users',
        data: {
          _verified: true,
        },
      });
      return NextResponse.json({}, { status: 200 });
    }
    return NextResponse.json(
      { message: 'Unable to verify account.' },
      { status: 400 },
    );
  } catch (e) {
    logger.error(`Error for verifying user - ${e}`);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
