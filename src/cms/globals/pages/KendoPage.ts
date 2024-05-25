import type { GlobalConfig } from 'payload/types';

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
  ],
};
