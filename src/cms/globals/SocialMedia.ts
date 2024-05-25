import type { GlobalConfig } from 'payload/types';

import { admins } from '../collections/access/admins';
import { anyone } from '../collections/access/anyone';
import { validatePayloadUrlField } from '../validation/fieldValidation';

export const SocialMedia: GlobalConfig = {
  slug: 'social-media',
  access: {
    read: anyone,
    update: admins,
  },
  fields: [
    {
      name: 'facebookUrl',
      type: 'text',
      label: 'Facebook URL',
      required: false,
      validate: validatePayloadUrlField,
    },
    {
      name: 'instagramUrl',
      type: 'text',
      label: 'Instagram URL',
      required: false,
      validate: validatePayloadUrlField,
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube URL',
      required: false,
      validate: validatePayloadUrlField,
    },
  ],
};
