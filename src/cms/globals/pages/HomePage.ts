import type { GlobalConfig } from 'payload/types';

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'heroImage',
      type: 'upload',
      label: 'Hero Image (hero, halfHero and mobileHero)',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'announcementArticles',
      type: 'relationship',
      hasMany: true,
      label: 'Announcements (Max 6)',
      maxRows: 6,
      minRows: 1,
      relationTo: 'articles',
      required: true,
    },
  ],
};
