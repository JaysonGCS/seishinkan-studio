import type { GlobalConfig } from 'payload/types';

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
  ],
};
