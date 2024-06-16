import type { GeneratedTypes } from 'payload';
import type { Payload } from 'payload/dist/payload';

import { getPayloadClient } from '@/src/getPayload';

import type { MainPage } from '../../_utils/Paths';

import { pageToCollectionSlugRecord } from '../../_utils/Paths';

export const isPageEnabled = async (page: MainPage): Promise<boolean> => {
  return (await isPageEnabledPayload(page)).enabled;
};

export const isPageEnabledPayload = async (
  page: MainPage,
): Promise<{
  enabled: boolean;
}> => {
  const collection = pageToCollectionSlugRecord[page];
  const payload = await getPayloadClient();
  try {
    const enabled =
      await collectionToPayloadValidationRecord[collection](payload);
    return {
      enabled,
    };
  } catch (_) {
    return {
      enabled: false,
    };
  }
};

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
  general(): Promise<boolean> {
    throw new Error('Function not implemented.');
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
