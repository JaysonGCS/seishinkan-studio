import type { GlobalConfig } from 'payload/types';

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
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
      name: 'visionDescription',
      type: 'textarea',
      defaultValue: '<tbc>',
      required: true,
    },
    {
      name: 'missionDescription',
      type: 'textarea',
      defaultValue: '<tbc>',
      required: true,
    },
  ],
};
