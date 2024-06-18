import type { GlobalConfig } from 'payload/types';

import { secondaryHeroFields } from '../../fields/secondaryHeroFields';

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
    ...secondaryHeroFields(),
    {
      name: 'studioOverviewList',
      type: 'array',
      fields: [
        {
          name: 'studioOverviewItem',
          type: 'text',
          required: true,
        },
      ],
      minRows: 3,
      required: true,
    },
    {
      name: 'studioCarouselMedia',
      type: 'array',
      fields: [
        {
          name: 'studioImage',
          type: 'upload',
          label: 'Studio Image',
          relationTo: 'studio-media',
          required: true,
        },
      ],
      minRows: 1,
      required: true,
    },
  ],
};
