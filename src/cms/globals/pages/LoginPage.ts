import type { GlobalConfig } from 'payload/types';

export const LoginPage: GlobalConfig = {
  slug: 'login-page',
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
  hooks: {
    afterChange: [
      (args) => {
        const { doc, previousDoc } = args;
        if (previousDoc.enabled !== doc.enabled) {
          // TODO: invalidate nextjs for the flag to take effect
        }
      },
    ],
  },
};
