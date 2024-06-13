import type { PaginatedArticleResponse } from '@/src/types/apiTypes';

export const getClientAllArticlesExcludePinned = async (
  page: number,
): Promise<PaginatedArticleResponse> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/article/paginate-exclude-pinned/${page}`,
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
