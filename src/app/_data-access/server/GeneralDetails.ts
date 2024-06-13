import type { General } from '@/src/payload-types';

import { getPayloadClient } from '@/src/getPayload';

export const getGeneralDetails = async (): Promise<General> => {
  return await getGeneralDetailsPayload();
};

export const getGeneralDetailsPayload = async (): Promise<General> => {
  const payload = await getPayloadClient();
  try {
    const resp: General = await payload.findGlobal<'general'>({
      slug: 'general',
    });
    return resp;
  } catch (e) {
    throw new Error('Fail to get general details - ', e);
  }
};
