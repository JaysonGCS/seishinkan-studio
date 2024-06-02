import { getPayloadClient } from '@/src/getPayload';
import { slugSchema } from '@/src/validation/slugValidation';
import { NextResponse } from 'next/server';

import { logger } from '../../../_utils/Logger';

export const dynamic = 'force-dynamic';

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  const payload = await getPayloadClient();
  try {
    const { slug } = slugSchema.parse(params);
    const resp = await payload.find<'articles'>({
      collection: 'articles',
      limit: 1,
      where: {
        ['slug']: {
          equals: slug,
        },
      },
    });
    if (resp.totalDocs === 1) {
      return NextResponse.json(resp.docs[0]);
    }
    logger.error(`No article found - ${slug}`);
    return NextResponse.json({ message: 'No article found.' }, { status: 204 });
  } catch (e) {
    logger.error(`Failed to load article - ${e}`);
    return NextResponse.json(
      { message: 'Failed to load article.' },
      { status: 500 },
    );
  }
}
