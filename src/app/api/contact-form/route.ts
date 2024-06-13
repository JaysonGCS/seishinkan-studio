import { getPayloadClient } from '@/src/getPayload';
import { contactFormSchema } from '@/src/validation/contactFormValidation';
import { NextResponse } from 'next/server';

import { logger } from '../../_utils/Logger';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const body = await request.json();
  const parsedBody = contactFormSchema.parse(body);
  const { name, email, message } = parsedBody;
  const payload = await getPayloadClient();

  try {
    const allCmsUsers = await payload.find({ collection: 'users' });
    const emailReceiverList = allCmsUsers.docs.map((doc) => doc.email);
    if (emailReceiverList.length === 0) {
      throw new Error('No email receiver list.');
    }
    // Save a record in database for future reference
    await payload.create({
      collection: 'contact-form-records',
      data: { name, email, message },
    });
    await payload.sendEmail({
      html: `<div><p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p></div>`,
      subject: 'Seishinkan Form Submission',
      to: emailReceiverList,
    });
    return NextResponse.json({}, { status: 200 });
  } catch (e) {
    logger.error(`Error for form submission - ${e}`);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
