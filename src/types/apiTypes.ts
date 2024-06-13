import type { PaginatedDocs } from 'payload/database';

import type { Article } from '../payload-types';

export interface PaginatedArticleResponse {
  docs: PaginatedDocs<Article>['docs'];
  nextPage: null | number;
  prevPage: null | number;
  totalPages: number;
}

export type SeoMetadata = {
  description?: null | string;
  title?: null | string;
};
