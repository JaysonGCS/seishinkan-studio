import type { RowLabelArgs } from 'payload/dist/admin/components/forms/RowLabel/types';
import type { GlobalConfig } from 'payload/types';

import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical';

import { secondaryHeroFields } from '../../fields/secondaryHeroFields';

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
    ...secondaryHeroFields(),
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
          required: true,
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
      required: true,
    },
    {
      name: 'kendoClasses',
      type: 'array',
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.title || `Class ${String(index).padStart(2, '0')}`;
          },
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Class Title (e.g., Beginner Class)',
          required: true,
        },
        {
          name: 'classSchedule',
          type: 'array',
          admin: {
            components: {
              RowLabel: ({ data, index }: RowLabelArgs) => {
                return (
                  data?.title || `Schedule ${String(index).padStart(2, '0')}`
                );
              },
            },
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label:
                'Title (free text - e.g., "Wednesdays" or "Saturdays & Sundays")',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'startTime',
                  type: 'date',
                  admin: {
                    date: {
                      displayFormat: 'h:mm aa',
                      pickerAppearance: 'timeOnly',
                    },
                  },
                  required: true,
                },
                {
                  name: 'endTime',
                  type: 'date',
                  admin: {
                    date: {
                      displayFormat: 'h:mm aa',
                      pickerAppearance: 'timeOnly',
                    },
                  },
                  required: false,
                },
              ],
            },
          ],
          label: 'Schedule',
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
          required: true,
        },
        lexicalHTML('description', { name: 'description_html' }),
      ],
      label: 'Kendo Class',
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
