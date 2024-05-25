import type { NextRequest } from 'next/server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/validate-login`,
    {
      headers: { Cookie: cookies().toString() },
    },
  );
  if (resp.ok) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/logout', request.url));
}

export const config = {
  matcher: ['/member/:path*'],
};
