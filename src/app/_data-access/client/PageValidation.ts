import type { MainPage } from '../../_utils/Paths';

export const isClientPageEnabled = async (page: MainPage): Promise<boolean> => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/page-allow`, {
    body: JSON.stringify({
      page,
    }),
    method: 'POST',
  });

  if (resp.status === 200) {
    const result = await resp.json();
    const { enabled } = result;
    return enabled;
  }
  return false;
};
