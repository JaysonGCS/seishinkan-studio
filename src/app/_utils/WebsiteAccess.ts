import type { NextRequest } from 'next/server';
import type { Payload } from 'payload';

import jwt from 'jsonwebtoken';

import { logger } from './Logger';
export const SSK_WEB_COOKIE_HEADER = 'ssk-web-token';

export const validateWebAccess = (
  payload: Payload,
  request: NextRequest,
): boolean => {
  const cookieStore = request.cookies;
  let existingToken;
  if (cookieStore.has(SSK_WEB_COOKIE_HEADER)) {
    const tokenCookie = cookieStore.get(SSK_WEB_COOKIE_HEADER);
    existingToken = tokenCookie;
  }
  if (existingToken === undefined) {
    return false;
  }
  try {
    const result = jwt.verify(existingToken.value, payload.secret);
    const expiry = result['exp'];
    if (expiry) {
      return Date.now() - expiry > 0;
    }
  } catch (e) {
    logger.error(`Failed to verify JWT token: ${e}`);
  }
  return false;
};
