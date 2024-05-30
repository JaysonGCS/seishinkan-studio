import type { CollectionConfig } from 'payload/types';

import { admins } from './access/admins';
import adminsAndUser from './access/adminsAndUser';
import { adminsCondition } from './access/adminsCondition';
import { checkRole } from './access/checkRole';

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => checkRole(['admin'], user),
    create: admins,
    delete: admins,
    read: adminsAndUser,
    update: admins,
  },
  admin: {
    defaultColumns: ['email', 'firstName', 'roles'],
    group: 'CMS Management',
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      admin: {
        condition: adminsCondition,
      },
      defaultValue: ['user'],
      hasMany: true,
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      saveToJWT: true,
    },
  ],
};
