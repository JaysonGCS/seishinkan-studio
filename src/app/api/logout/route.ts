import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { SSK_WEB_COOKIE_HEADER } from '../../_utils/WebsiteAccess';

export function GET() {
  cookies().delete(SSK_WEB_COOKIE_HEADER);
  return NextResponse.json({}, { status: 200 });
}
