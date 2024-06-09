import type { Article } from '@/src/payload-types';
import type { Atom } from 'jotai';

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

import { getAllArticlesExcludePinned } from '../_data-access/Article';

export const DEFAULT_INITIAL_PAGE_COUNTER = 1;

export const paginatedArticleListAtomFamily = atomFamily<
  number,
  Atom<Promise<Article[]>>
>((pageCounter) => {
  return atom(async () => {
    return (await getAllArticlesExcludePinned(pageCounter)).docs;
  });
});

export const newsAndArticlePageCounter = atom<number>(
  DEFAULT_INITIAL_PAGE_COUNTER,
);
