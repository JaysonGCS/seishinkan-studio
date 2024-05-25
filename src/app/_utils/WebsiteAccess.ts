import type { NextRequest } from 'next/server';
import type { Payload } from 'payload';

import jwt from 'jsonwebtoken';

import { logger } from './Logger';
export const SSK_WEB_COOKIE_HEADER = 'ssk-web-token';

export enum ValidationStatus {
  LOGGED_IN,
  EXPIRED,
  UNAUTHORISED,
  UNKNOWN,
}

export const validateWebAccess = (
  payload: Payload,
  request: NextRequest,
): ValidationStatus => {
  const cookieStore = request.cookies;
  let existingToken;
  if (cookieStore.has(SSK_WEB_COOKIE_HEADER)) {
    const tokenCookie = cookieStore.get(SSK_WEB_COOKIE_HEADER);
    existingToken = tokenCookie;
  }
  if (existingToken === undefined) {
    return ValidationStatus.UNAUTHORISED;
  }
  try {
    const result = jwt.verify(existingToken.value, payload.secret);
    const expiry = result['exp'];
    if (expiry && Date.now() - expiry > 0) {
      return ValidationStatus.LOGGED_IN;
    }
    return ValidationStatus.EXPIRED;
  } catch (e) {
    logger.error(`Failed to verify JWT token: ${e}`);
  }
  return ValidationStatus.UNKNOWN;
};
