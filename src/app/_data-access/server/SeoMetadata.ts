import type { SeoMetadata } from '@/src/types/apiTypes';
import type { GeneratedTypes, Payload } from 'payload';

import { getPayloadClient } from '@/src/getPayload';

import type { MainPage } from '../../_utils/Paths';

import { pageToCollectionSlugRecord } from '../../_utils/Paths';

export const getSeoMetadata = async (page: MainPage): Promise<SeoMetadata> => {
  return await getSeoMetadataPayload(page);
};

export const getSeoMetadataPayload = async (
  page: MainPage,
): Promise<SeoMetadata> => {
  const collection = pageToCollectionSlugRecord[page];
  const payload = await getPayloadClient();
  try {
    const seoMetadata: SeoMetadata | undefined =
      await collectionToPayloadValidationRecord[collection](payload);
    if (seoMetadata === undefined) {
      throw new Error('Fail to get seo metadata');
    }
    return seoMetadata;
  } catch (e) {
    throw new Error('Fail to get seo metadata - ', e);
  }
};

const collectionToPayloadValidationRecord: Record<
  keyof GeneratedTypes['globals'],
  (payload: Payload) => Promise<SeoMetadata | undefined>
> = {
  'about-page': async (payload) => {
    return (await payload.findGlobal({ slug: 'about-page' })).meta;
  },
  'contact-page': async (payload) => {
    return (await payload.findGlobal({ slug: 'contact-page' })).meta;
  },
  general: () => {
    throw new Error('Function not implemented.');
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
