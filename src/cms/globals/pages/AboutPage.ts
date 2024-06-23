import type { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types';
import type { GlobalConfig } from 'payload/types';

import { secondaryHeroFields } from '../../fields/secondaryHeroFields';

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
    ...secondaryHeroFields(),
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
    {
      name: 'team',
      type: 'array',
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.title || `Person ${String(index).padStart(2, '0')}`;
          },
        },
      },
      fields: [
        {
          name: 'profileImage',
          type: 'upload',
          label: 'Profile Photo',
          relationTo: 'profile-media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: false,
        },
        {
          name: 'introduction',
          type: 'textarea',
          required: true,
        },
        {
          name: 'achievements',
          type: 'array',
          admin: {
            components: {
              RowLabel: ({ data, index }: RowLabelArgs) => {
                return (
                  data?.title || `Achievement ${String(index).padStart(2, '0')}`
                );
              },
            },
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Title (max 50 characters)',
              maxLength: 50,
              required: true,
            },
            {
              name: 'date',
              type: 'date',
              admin: {
                date: {
                  displayFormat: 'MMM yyyy',
                  pickerAppearance: 'monthOnly',
                },
              },
              label: 'Date (MMM yyyy)',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
          ],
          label: 'Achievement',
          labels: {
            plural: 'Achievements',
            singular: 'Achievement',
          },
          required: false,
        },
      ],
      label: 'SSK Team',
      minRows: 1,
      required: true,
    },
  ],
};
