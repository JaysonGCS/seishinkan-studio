import type { GeneratedTypes } from 'payload';

import { getPayloadClient } from '@/src/getPayload';

import type {
  MainPage,
  MainPageToSlug,
  SlugToPageDetails,
} from '../../_utils/Paths';

import { pageToCollectionSlugRecord } from '../../_utils/Paths';

export const getPageDetails = async <T extends MainPage>(
  page: T,
): Promise<SlugToPageDetails[MainPageToSlug[T]]> => {
  return (await getPageDetailsPayload(
    pageToCollectionSlugRecord[page],
  )) as SlugToPageDetails[MainPageToSlug[T]];
};

export const getPageDetailsPayload = async <
  T extends keyof GeneratedTypes['globals'],
>(
  pageSlug: T,
): Promise<SlugToPageDetails[T]> => {
  const payload = await getPayloadClient();
  try {
    const pageDetails = await payload.findGlobal<T>({
      slug: pageSlug,
    });
    return pageDetails;
  } catch (e) {
    throw new Error('Fail to get page details - ', e);
  }
};
