import type { SeoMetadata } from '@/src/types/apiTypes';

import type { MainPage } from '../../_utils/Paths';

export const getClientSeoMetadata = async (
  page: MainPage,
): Promise<SeoMetadata> => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/seo-metadata`, {
    body: JSON.stringify({
      page,
    }),
    method: 'POST',
  });
  if (!resp.ok) {
    throw new Error('Fail to get seo metadata.');
  }
  return await resp.json();
};
