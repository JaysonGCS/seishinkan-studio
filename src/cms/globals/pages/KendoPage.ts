import type { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types';
import type { GlobalConfig } from 'payload/types';

export const KendoPage: GlobalConfig = {
  slug: 'kendo-page',
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
      name: 'faqs',
      type: 'array',
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.title || `FAQ ${String(index).padStart(2, '0')}`;
          },
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
      label: 'FAQ',
      labels: {
        plural: 'FAQs',
        singular: 'FAQ',
      },
      maxRows: 10,
      minRows: 3,
    },
  ],
};
