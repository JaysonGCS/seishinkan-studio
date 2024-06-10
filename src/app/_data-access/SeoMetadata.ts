import type { MainPage } from '../_utils/Paths';
import type { SeoMetadata } from '../api/seo-metadata/route';

export const getSeoMetadata = async (
  page: MainPage,
  slug?: string,
): Promise<SeoMetadata> => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/seo-metadata`, {
    body: JSON.stringify({
      slug,
      page,
    }),
    method: 'POST',
  });
  if (!resp.ok) {
    throw new Error('Fail to get seo metadata.');
  }
  return await resp.json();
};
