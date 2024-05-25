import type { General } from '@/src/payload-types';

export const getGeneralDetails = async (): Promise<General> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/general-details`,
    {
      method: 'GET',
    },
  );
  if (!resp.ok) {
    throw new Error('Fail to get general details.');
  }
  return await resp.json();
};
