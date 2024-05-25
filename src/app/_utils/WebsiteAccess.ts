import type { NextRequest } from 'next/server';
import type { Payload } from 'payload';

import jwt from 'jsonwebtoken';

import { LoginStatus } from '../_atoms/UserLoginAtoms';
import { SSK_WEB_COOKIE_HEADER } from './Constants';
import { logger } from './Logger';

export const validateWebAccess = (
  payload: Payload,
  request: NextRequest,
): LoginStatus => {
  const cookieStore = request.cookies;
  let existingToken;
  if (cookieStore.has(SSK_WEB_COOKIE_HEADER)) {
    const tokenCookie = cookieStore.get(SSK_WEB_COOKIE_HEADER);
    existingToken = tokenCookie;
  }
  if (existingToken === undefined) {
    return LoginStatus.UNAUTHORISED;
  }
  try {
    const result = jwt.verify(existingToken.value, payload.secret);
    const expiry = result['exp'];
    if (expiry && Date.now() - expiry > 0) {
      return LoginStatus.LOGGED_IN;
    }
    return LoginStatus.EXPIRED;
  } catch (e) {
    logger.error(`Failed to verify JWT token: ${e}`);
  }
  return LoginStatus.UNKNOWN;
};
