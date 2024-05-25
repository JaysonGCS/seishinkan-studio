import type { CollectionConfig } from 'payload/types';

import payload from 'payload';

import { PlaceholderField } from '../ui/PlaceholderField';
import { admins } from './access/admins';
import adminsAndUser from './access/adminsAndUser';
import { checkRole } from './access/checkRole';

export const InviteCodes: CollectionConfig = {
  slug: 'invite-codes',
  access: {
    admin: ({ req: { user } }) => checkRole(['admin'], user),
    create: admins,
    delete: admins,
    read: adminsAndUser,
    update: admins,
  },
  admin: {
    defaultColumns: [
      'inviteCode',
      'usage',
      'usageCounter',
      'createdAt',
      'updatedAt',
    ],
    useAsTitle: 'inviteCode',
  },
  fields: [
    {
      name: 'inviteCode',
      type: 'text',
      label:
        'Invite Code (Only allow alphabets and numbers without whitespace)',
      required: true,
      unique: true,
      validate: (val) => {
        const regexp = new RegExp(/^[a-zA-Z\d]*$/);
        if (regexp.test(val)) {
          return true;
        }
        return 'Only allow alphabets and numbers without whitespace.';
      },
    },
    {
      name: 'usage',
      type: 'number',
      label: 'Usage (1 to 50, the allowed usage range for the invite code)',
      max: 50,
      min: 1,
      required: true,
    },
    {
      name: 'usageCounter',
      type: 'number',
      admin: {
        components: {
          Field: PlaceholderField,
        },
      },
      defaultValue: 0,
      hooks: {
        afterRead: [
          async (data) => {
            const kendoUsers = await payload.find({
              collection: 'website-users',
            });

            const siblingData = data.siblingData;
            const usageCount = kendoUsers.docs.filter(
              (user) => user.signUpInviteCode === siblingData.inviteCode,
            ).length;
            return usageCount;
          },
        ],
      },
      label: 'Usage Counter',
    },
  ],
};
