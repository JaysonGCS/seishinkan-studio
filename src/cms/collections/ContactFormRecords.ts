import type { CollectionConfig } from 'payload/types';

import { admins } from './access/admins';
import { anyone } from './access/anyone';
import { checkRole } from './access/checkRole';

export const ContactFormRecords: CollectionConfig = {
  slug: 'contact-form-records',
  access: {
    admin: ({ req: { user } }) => checkRole(['admin'], user),
    create: admins,
    delete: admins,
    read: anyone,
    update: admins,
  },
  admin: {
    defaultColumns: ['name', 'email', 'message', 'created_at', 'updated_at'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'text',
      required: true,
    },
  ],
};
