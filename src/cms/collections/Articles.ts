import type { CollectionConfig } from 'payload/types';

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
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
};
