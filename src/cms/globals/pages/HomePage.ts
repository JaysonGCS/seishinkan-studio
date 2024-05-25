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
  ],
};
