import type { GeneratedTypes, Payload } from 'payload';

import { getPayloadClient } from '@/src/getPayload';
import { pageVerificationSchema } from '@/src/validation/pageValidation';
import { NextResponse } from 'next/server';

import { logger } from '../../_utils/Logger';
import { pageToCollectionSlugRecord } from '../../_utils/Paths';

export async function POST(request: Request) {
  const body = await request.json();
  const { page } = pageVerificationSchema.parse(body);
  const collection = pageToCollectionSlugRecord[page];
  const payload = await getPayloadClient();
  try {
    const enabled =
      await collectionToPayloadValidationRecord[collection](payload);
    return NextResponse.json({
      enabled,
    });
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
  (payload: Payload) => Promise<boolean>
> = {
  'about-page': async (payload) => {
    return (await payload.findGlobal({ slug: 'about-page' })).enabled ?? true;
  },
  'contact-page': async (payload) => {
    return (await payload.findGlobal({ slug: 'contact-page' })).enabled ?? true;
  },
  'home-page': () => {
    return Promise.resolve(true);
  },
  'kendo-page': async (payload) => {
    return (await payload.findGlobal({ slug: 'kendo-page' })).enabled ?? true;
  },
  'login-page': async (payload) => {
    return (await payload.findGlobal({ slug: 'login-page' })).enabled ?? true;
  },
  'member-page': async (payload) => {
    return (await payload.findGlobal({ slug: 'member-page' })).enabled ?? true;
  },
  'news-and-articles-page': async (payload) => {
    return (
      (await payload.findGlobal({ slug: 'news-and-articles-page' })).enabled ??
      true
    );
  },
  'rental-page': async (payload) => {
    return (await payload.findGlobal({ slug: 'rental-page' })).enabled ?? true;
  },
  'social-media'(): Promise<boolean> {
    throw new Error('Function not implemented.');
  },
};
