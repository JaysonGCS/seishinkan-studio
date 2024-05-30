import type { CollectionConfig } from 'payload/types';

import { ProfileMediaConstant } from '../../Constants';
import { admins } from './access/admins';
import { anyone } from './access/anyone';

export const ProfileMedia: CollectionConfig = {
  slug: 'profile-media',
  access: {
    read: anyone,
    update: admins,
  },
  admin: {
    group: 'Media Resource',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
  labels: { plural: 'Profile Media', singular: 'Profile Media' },
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        // 1:1
        name: 'thumbnail',
        height: ProfileMediaConstant.thumbnail.height,
        position: 'centre',
        width: ProfileMediaConstant.thumbnail.width,
      },
    ],
    mimeTypes: ['image/*'],
    staticDir: 'profileMedia',
    staticURL: '/profile-media',
  },
};
