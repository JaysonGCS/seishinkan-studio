'use client';
import type { Article } from '@/src/payload-types';
import type { PaginatedDocs } from 'payload/database';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { atom, useAtom, useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import React, { useCallback, useMemo, useState } from 'react';

import {
  DEFAULT_INITIAL_PAGE_COUNTER,
  newsAndArticlePageCounter,
  paginatedArticleListAtomFamily,
} from '../../_atoms/ArticleAtoms';
import { LoadingSkeleton } from '../../_components/LoadingSkeleton/LoadingSkeleton';
import { PostsArea } from './PostsArea';

interface OwnProps {
  initialArticles: PaginatedDocs<Article>['docs'];
  initialNextPage: null | number;
  initialPageCounter: number;
  initialPrevPage: null | number;
  totalPages: number;
}
export const LatestPostsArea = (props: OwnProps) => {
  const {
    initialArticles,
    initialNextPage,
    initialPageCounter,
    initialPrevPage,
    totalPages,
  } = props;
  const [page, setPage] = useAtom(newsAndArticlePageCounter);
  const loadableAtom = useMemo(() => {
    return page === DEFAULT_INITIAL_PAGE_COUNTER
      ? atom(Promise.resolve(initialArticles))
      : paginatedArticleListAtomFamily(page);
  }, [initialArticles, page]);
  const loadablePaginatedArticleList = loadable(loadableAtom);
  const loadablePaginatedArticleListValue = useAtomValue(
    loadablePaginatedArticleList,
  );

  const [prevPage, setPrevPage] = useState<null | number>(initialPrevPage);
  const [nextPage, setNextPage] = useState<null | number>(initialNextPage);

  const handlePageChange = useCallback(
    (updatedPage: number) => {
      setPage(updatedPage);
      setPrevPage(() => {
        return updatedPage === initialPageCounter ? null : updatedPage - 1;
      });
      setNextPage(() => {
        return updatedPage === totalPages ? null : updatedPage + 1;
      });
    },
    [initialPageCounter, setPage, totalPages],
  );

  const paginationItems = Array.from(Array(totalPages).keys()).map(
    (pageIndex) => {
      const currentPage = pageIndex + 1;
      const isActive = currentPage === page;
      return (
        <PaginationItem
          className="cursor-pointer"
          key={`news-and-articles-latest-post-${pageIndex}`}
        >
          <PaginationLink
            isActive={isActive}
            onClick={() => !isActive && handlePageChange(currentPage)}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );
    },
  );

  const postContainer = () => {
    const state = loadablePaginatedArticleListValue.state;
    if (state === 'loading') {
      return (
        <div className="flex flex-col gap-2">
          <LoadingSkeleton count={3} />
          <LoadingSkeleton count={3} />
          <LoadingSkeleton count={3} />
        </div>
      );
    } else if (state === 'hasData') {
      return <PostsArea posts={loadablePaginatedArticleListValue.data} />;
    } else {
      return <div>Error fetching articles</div>;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {postContainer()}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => prevPage !== null && handlePageChange(prevPage)}
            />
          </PaginationItem>
          {paginationItems}
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => nextPage !== null && handlePageChange(nextPage)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
