import { getPayloadClient } from '@/src/getPayload';
import { type NextRequest, NextResponse } from 'next/server';

import { validateWebAccess } from '../../_utils/WebsiteAccess';

export async function GET(request: NextRequest) {
  const payload = await getPayloadClient();
  const isValidUser = validateWebAccess(payload, request);
  if (isValidUser) {
    return NextResponse.json({}, { status: 200 });
  }
  return NextResponse.json(
    { message: 'Unauthorised access.' },
    { status: 403 },
  );
}
