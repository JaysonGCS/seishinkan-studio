import type { CollectionConfig } from 'payload/types';

import {
  HTMLConverterFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical';

import { slugField } from '../fields/slugField';
import { generateSlug } from '../utilities/formatSlug';
import { admins } from './access/admins';
import { anyone } from './access/anyone';
import { checkRole } from './access/checkRole';

export const Articles: CollectionConfig = {
  slug: 'articles',
  access: {
    admin: ({ req: { user } }) => checkRole(['admin'], user),
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  admin: {
    defaultColumns: ['title', 'createdAt', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    slugField('title', {
      hooks: {
        beforeValidate: [
          ({ siblingData, value }) => {
            const title = siblingData['title'];
            if (value === '') {
              return title ? generateSlug(title) : '';
            }
            return generateSlug(value);
          },
        ],
      },
      label: 'Slug (Auto generated from title if empty)',
      minLength: 5,
    }),
    {
      name: 'summary',
      type: 'text',
      label: 'Summary (Max 250 characters)',
      maxLength: 250,
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => {
          return [...defaultFeatures, HTMLConverterFeature({})];
        },
      }),
      required: true,
    },
    lexicalHTML('content', { name: 'content_html' }),
  ],
};
