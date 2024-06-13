import type { SocialMedia } from '@/src/payload-types';

export const getClientSocialMedia = async (): Promise<SocialMedia> => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/social-media`, {
    method: 'GET',
  });
  if (!resp.ok) {
    throw new Error('Fail to get social media details.');
  }
  return await resp.json();
};
