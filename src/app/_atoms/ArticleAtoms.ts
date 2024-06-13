import type { Article } from '@/src/payload-types';
import type { Atom } from 'jotai';

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

import { getClientAllArticlesExcludePinned } from '../_data-access/client/AllArticlesExcludePinned';

export const DEFAULT_INITIAL_PAGE_COUNTER = 1;

export const paginatedArticleListAtomFamily = atomFamily<
  number,
  Atom<Promise<Article[]>>
>((pageCounter) => {
  return atom(async () => {
    return (await getClientAllArticlesExcludePinned(pageCounter)).docs;
  });
});

export const newsAndArticlePageCounter = atom<number>(
  DEFAULT_INITIAL_PAGE_COUNTER,
);
