import type { NextRequest } from 'next/server';

import { getPayloadClient } from '@/src/getPayload';
import { loginFormSchema } from '@/src/validation/emailValidation';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import {
  SSK_WEB_COOKIE_HEADER,
  SSK_WEB_LOGIN_STATUS_HEADER,
} from '../../_utils/Constants';
import { logger } from '../../_utils/Logger';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const payload = await getPayloadClient();
  const body = await request.json();
  const { email, password } = loginFormSchema.parse(body);

  const isLoginPageEnabled = (await payload.findGlobal({ slug: 'login-page' }))
    .enabled;

  if (!isLoginPageEnabled) {
    logger.error(`Invalid log-in request - ${email}`);
    return NextResponse.json(
      { message: 'Log-in not allowed.' },
      { status: 405 },
    );
  }
  try {
    const validateVerifiedUser = await payload.find({
      collection: 'website-users',
      where: {
        _verified: { equals: true },
        email: { equals: email.toLowerCase() },
      },
    });
    if (validateVerifiedUser.totalDocs === 1) {
      const req = await payload.login({
        collection: 'website-users',
        data: { email: validateVerifiedUser.docs[0].email, password },
      });

      const partialResponseCookie = {};
      const collectionDetails = payload.config.collections.find(
        (collection) => collection.slug === 'website-users',
      );
      if (collectionDetails) {
        if (collectionDetails.auth.cookies.domain) {
          partialResponseCookie['domain'] =
            collectionDetails.auth.cookies.domain;
        }
        partialResponseCookie['sameSite'] =
          collectionDetails.auth.cookies.sameSite;
        partialResponseCookie['secure'] = collectionDetails.auth.cookies.secure;
      }

      const token = req.token;
      const exp = req.exp;
      if (token === undefined || token === null) {
        throw new Error('Invalid user token');
      }
      cookies().set(SSK_WEB_COOKIE_HEADER, token, {
        expires: exp ? new Date(exp * 1000) : undefined,
        httpOnly: true,
        path: '/',
        ...partialResponseCookie,
      });
      cookies().set(SSK_WEB_LOGIN_STATUS_HEADER, String(true), {
        httpOnly: false,
        path: '/',
      });
      return NextResponse.json({}, { status: 200 });
    } else {
      logger.error(`Unauthorised user - ${email}`);
      return NextResponse.json({ message: 'Unauthorised.' }, { status: 401 });
    }
  } catch (e) {
    logger.error(`Error for login - ${e}`);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
