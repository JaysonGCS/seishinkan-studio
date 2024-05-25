import { getPayloadClient } from '@/src/getPayload';
import { type NextRequest, NextResponse } from 'next/server';

import {
  ValidationStatus,
  validateWebAccess,
} from '../../_utils/WebsiteAccess';

export async function GET(request: NextRequest) {
  const payload = await getPayloadClient();
  const validationStatus: ValidationStatus = validateWebAccess(
    payload,
    request,
  );
  if (validationStatus === ValidationStatus.LOGGED_IN) {
    return NextResponse.json({}, { status: 200 });
  }
  return NextResponse.json(
    { message: 'Unauthorised access.' },
    { status: 403 },
  );
}
