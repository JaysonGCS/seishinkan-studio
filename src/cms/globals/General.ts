import type { GlobalConfig } from 'payload/types';

import { admins } from '../collections/access/admins';
import { anyone } from '../collections/access/anyone';
import { validateEmailField } from '../validation/fieldValidation';

export const General: GlobalConfig = {
  slug: 'general',
  access: {
    read: anyone,
    update: admins,
  },
  fields: [
    {
      name: 'email',
      type: 'text',
      label: 'Seishinkan Email',
      required: true,
      validate: validateEmailField,
    },
    {
      name: 'address',
      type: 'text',
      label: 'Seishinkan Address',
      required: true,
    },
  ],
};
