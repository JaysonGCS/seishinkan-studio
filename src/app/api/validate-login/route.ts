import { getPayloadClient } from '@/src/getPayload';
import { type NextRequest, NextResponse } from 'next/server';

import { LoginStatus } from '../../_atoms/UserLoginAtoms';
import { validateWebAccess } from '../../_utils/WebsiteAccess';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const payload = await getPayloadClient();
  const validationStatus: LoginStatus = validateWebAccess(payload, request);
  if (validationStatus === LoginStatus.LOGGED_IN) {
    return NextResponse.json({}, { status: 200 });
  }
  return NextResponse.json(
    { message: 'Unauthorised access.', reason: validationStatus },
    { status: 403 },
  );
}
