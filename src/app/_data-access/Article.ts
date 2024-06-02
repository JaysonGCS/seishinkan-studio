import type { Article } from '@/src/payload-types';

export const getArticle = async (slug: string): Promise<Article> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/article/${slug}`,
    {
      method: 'GET',
    },
  );
  if (!resp.ok) {
    const result = await resp.json();
    const message = result.message;
    throw new Error(message);
  }
  return await resp.json();
};
