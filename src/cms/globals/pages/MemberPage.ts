import type { GlobalConfig } from 'payload/types';

export const MemberPage: GlobalConfig = {
  slug: 'member-page',
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
  ],
};
