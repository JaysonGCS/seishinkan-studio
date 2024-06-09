import { logger } from '@/src/app/_utils/Logger';
import { getPayloadClient } from '@/src/getPayload';
import { NextResponse } from 'next/server';

export async function GET() {
  const payload = await getPayloadClient();
  try {
    const resp = await payload.find<'articles'>({
      collection: 'articles',
    });
    const { docs } = resp;
    const slugs = docs.reduce<string[]>((total, doc) => {
      if (typeof doc.slug === 'string') {
        total.push(doc.slug);
      }
      return total;
    }, []);
    return NextResponse.json({
      slugs,
    });
  } catch (e) {
    logger.error(`Failed to retrieve article slugs - ${e}`);
    return NextResponse.json(
      { message: 'Failed to load article slugs.' },
      { status: 500 },
    );
  }
}
