import type { WebsiteUser } from '@/src/payload-types';

import { getPayloadClient } from '@/src/getPayload';
import { signUpFormSchema } from '@/src/validation/emailValidation';
import { NextResponse } from 'next/server';

import { logger } from '../../_utils/Logger';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = signUpFormSchema.parse(body);

  const payload = await getPayloadClient();
  try {
    const matchingRecords = await payload.find({
      collection: 'website-users',
      where: { email: { equals: email.toLowerCase() } },
    });
    const isAvailableToRegister = matchingRecords.totalDocs === 0;
    if (isAvailableToRegister) {
      const valueArr = new Uint32Array(1);
      crypto.getRandomValues(valueArr);

      const _verificationToken = valueArr[0].toString();
      await payload.create({
        collection: 'website-users',
        data: {
          id: 0,
          _verificationToken,
          _verified: false,
          createdAt: new Date().toDateString(),
          email,
          password,
          updatedAt: new Date().toDateString(),
        } satisfies WebsiteUser,
      });
      return NextResponse.json(
        { message: `Please check your email - ${email}.` },
        { status: 200 },
      );
    } else {
      logger.error(`${email} already existed.`);
      return NextResponse.json(
        { message: `${email} already existed.` },
        { status: 409 },
      );
    }
  } catch (e) {
    logger.error(`Error for signup - ${e}`);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
