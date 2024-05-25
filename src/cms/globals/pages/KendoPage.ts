import type { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types';
import type { GlobalConfig } from 'payload/types';

import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical';

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
      name: 'kendoIntroduction',
      type: 'array',
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.title || `Intro ${String(index).padStart(2, '0')}`;
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
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => {
              return [...defaultFeatures, HTMLConverterFeature({})];
            },
          }),
        },
        lexicalHTML('description', { name: 'description_html' }),
      ],
      label: 'Kendo Introduction',
      labels: {
        plural: 'Kendo Introduction',
        singular: 'Kendo Introduction',
      },
      maxRows: 6,
      minRows: 2,
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
