import type { SocialMedia } from '@/src/payload-types';

import { getPayloadClient } from '@/src/getPayload';

export const getSocialMedia = async (): Promise<SocialMedia> => {
  return getSocialMediaPayload();
};

export const getSocialMediaPayload = async (): Promise<SocialMedia> => {
  const payload = await getPayloadClient();
  try {
    const resp: SocialMedia = await payload.findGlobal({
      slug: 'social-media',
    });
    return resp;
  } catch (e) {
    throw new Error('Fail to get social media details - ', e);
  }
};
