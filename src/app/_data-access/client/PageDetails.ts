import type {
  MainPage,
  MainPageToSlug,
  SlugToPageDetails,
} from '../../_utils/Paths';

import { pageToCollectionSlugRecord } from '../../_utils/Paths';

export const getClientPageDetails = async <T extends MainPage>(
  page: T,
): Promise<SlugToPageDetails[MainPageToSlug[T]]> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/page-details/${pageToCollectionSlugRecord[page]}`,
    {
      method: 'GET',
    },
  );
  if (!resp.ok) {
    throw new Error('Fail to get page details.');
  }
  return await resp.json();
};
