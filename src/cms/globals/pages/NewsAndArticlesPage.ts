import type { GlobalConfig } from 'payload/types';

import { secondaryHeroFields } from '../../fields/secondaryHeroFields';

export const NewsAndArticlesPage: GlobalConfig = {
  slug: 'news-and-articles-page',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable Page',
    },
    ...secondaryHeroFields(),
    {
      name: 'pinnedArticles',
      type: 'relationship',
      hasMany: true,
      label: 'Pinned Article',
      maxRows: 3,
      relationTo: 'articles',
    },
  ],
};
