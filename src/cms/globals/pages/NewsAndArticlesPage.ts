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
    {
      name: 'heroImage',
      type: 'upload',
      label: 'Hero Image (halfHero and mobileHero)',
      relationTo: 'media',
      required: true,
    },
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
