import type { GlobalConfig } from 'payload/types';

export const RentalPage: GlobalConfig = {
  slug: 'rental-page',
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
  ],
};
