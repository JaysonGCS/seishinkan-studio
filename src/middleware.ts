import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import {
  SSK_WEB_COOKIE_HEADER,
  SSK_WEB_LOGIN_STATUS_HEADER,
} from './app/_utils/Constants';
import { MainPage, OtherPage } from './app/_utils/Paths';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path.startsWith(MainPage.MEMBER)) {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/validate-login`,
      {
        headers: { Cookie: request.cookies.toString() },
      },
    );
    if (resp.ok) {
      request.cookies.set(SSK_WEB_LOGIN_STATUS_HEADER, String(true));
      const response = NextResponse.next();
      response.cookies.set({
        name: SSK_WEB_LOGIN_STATUS_HEADER,
        httpOnly: false,
        path: '/',
        value: String(true),
      });
      return response;
    }
    const response = NextResponse.redirect(
      new URL(OtherPage.LOGOUT, request.url),
    );
    response.cookies.delete(SSK_WEB_LOGIN_STATUS_HEADER);
    return response;
  } else if (
    request.cookies.has(SSK_WEB_COOKIE_HEADER) &&
    !request.cookies.has(SSK_WEB_LOGIN_STATUS_HEADER) &&
    Object.values(MainPage).some((mainPage) => {
      if (mainPage === MainPage.HOME) {
        return path === mainPage.toString();
      }
      return path.startsWith(mainPage);
    })
  ) {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/validate-login`,
      {
        headers: { Cookie: request.cookies.toString() },
      },
    );
    if (resp.ok) {
      request.cookies.set(SSK_WEB_LOGIN_STATUS_HEADER, String(true));
      const response = NextResponse.next();
      response.cookies.set({
        name: SSK_WEB_LOGIN_STATUS_HEADER,
        httpOnly: false,
        path: '/',
        value: String(true),
      });
      return response;
    }
  } else if (
    !request.cookies.has(SSK_WEB_COOKIE_HEADER) &&
    request.cookies.has(SSK_WEB_LOGIN_STATUS_HEADER)
  ) {
    const response = NextResponse.next();
    response.cookies.delete(SSK_WEB_LOGIN_STATUS_HEADER);
    return response;
  }
  return NextResponse.next();
}
