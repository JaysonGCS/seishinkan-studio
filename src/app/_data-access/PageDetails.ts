import {
  type MainPage,
  type MainPageToPageDetails,
  pageToCollectionSlugRecord,
} from '../_utils/Paths';

export const getPageDetails = async <T extends MainPage>(
  page: T,
): Promise<MainPageToPageDetails[T]> => {
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
