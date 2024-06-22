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
    {
      name: 'allowSignup',
      type: 'checkbox',
      defaultValue: false,
      label: 'Allow Sign-up',
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
