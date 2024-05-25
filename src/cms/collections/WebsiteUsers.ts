import type { CollectionConfig } from 'payload/types';

import { admins } from './access/admins';
import adminsAndUser from './access/adminsAndUser';
import { checkRole } from './access/checkRole';

export const WebsiteUsers: CollectionConfig = {
  slug: 'website-users',
  access: {
    admin: ({ req: { user } }) => checkRole(['admin'], user),
    create: admins,
    delete: admins,
    read: adminsAndUser,
    update: admins,
  },
  admin: {
    defaultColumns: [
      'email',
      'userRole',
      'signUpInviteCode',
      'createdAt',
      'updatedAt',
      '_verified',
    ],
    useAsTitle: 'email',
  },
  auth: {
    // 3 days in seconds
    tokenExpiration: 259200,
    verify: {
      generateEmailHTML: (props) => {
        const { token } = props;
        const verificationUrl = `${process.env.NEXT_PUBLIC_HOST}/login/verification?token=${token}`;
        return `Please click on the following link or paste the URL below into your browser to verify your email: ${verificationUrl}`;
      },
      generateEmailSubject: () => 'Welcome to Seishinkan Singapore',
    },
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'signUpInviteCode',
      type: 'text',
      label: 'Invite code used for sign up',
    },
    {
      name: 'userRole',
      type: 'select',
      admin: {
        isClearable: true,
        isSortable: true,
      },
      defaultValue: 'none',
      hasMany: false,
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Full-time Kendo Member',
          value: 'full_time_kendo_member',
        },
      ],
    },
  ],
};
