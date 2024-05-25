import type { GeneratedTypes, Payload } from 'payload';

import { getPayloadClient } from '@/src/getPayload';
import { pageVerificationSchema } from '@/src/validation/pageValidation';
import { NextResponse } from 'next/server';

import { logger } from '../../_utils/Logger';
import { pageToCollectionSlugRecord } from '../../_utils/Paths';

export type SeoMetadata = {
  description?: null | string;
  title?: null | string;
};

export async function POST(request: Request) {
  const body = await request.json();
  const { page } = pageVerificationSchema.parse(body);
  const collection = pageToCollectionSlugRecord[page];
  const payload = await getPayloadClient();
  try {
    const seoMetadata: SeoMetadata =
      await collectionToPayloadValidationRecord[collection](payload);
    return NextResponse.json(seoMetadata);
  } catch (e) {
    logger.error(e);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

const collectionToPayloadValidationRecord: Record<
  keyof GeneratedTypes['globals'],
  (payload: Payload) => Promise<SeoMetadata>
> = {
  'about-page': async (payload) => {
    return (await payload.findGlobal({ slug: 'about-page' })).meta;
  },
  'contact-page': async (payload) => {
    return (await payload.findGlobal({ slug: 'contact-page' })).meta;
  },
  'home-page': async (payload) => {
    return (await payload.findGlobal({ slug: 'home-page' })).meta;
  },
  'kendo-page': async (payload) => {
    return (await payload.findGlobal({ slug: 'kendo-page' })).meta;
  },
  'login-page': () => {
    throw new Error('Function not implemented.');
  },
  'member-page': () => {
    throw new Error('Function not implemented.');
  },
  'news-and-articles-page': async (payload) => {
    return (await payload.findGlobal({ slug: 'news-and-articles-page' })).meta;
  },
  'rental-page': async (payload) => {
    return (await payload.findGlobal({ slug: 'rental-page' })).meta;
  },
  'social-media': () => {
    throw new Error('Function not implemented.');
  },
};
