import type { CollectionConfig } from 'payload/types';

import { MediaConstant } from '../../../Constants';
import { admins } from '../access/admins';
import { anyone } from '../access/anyone';

export const StudioMedia: CollectionConfig = {
  slug: 'studio-media',
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
  labels: { plural: 'Studio Media', singular: 'Studio Media' },
  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        // 4:3
        name: 'thumbnail',
        height: MediaConstant.thumbnail.height,
        position: 'centre',
        width: MediaConstant.thumbnail.width,
      },
      {
        // 16:9
        name: 'heroCard',
        height: MediaConstant.heroCard.height,
        position: 'centre',
        width: MediaConstant.heroCard.width,
      },
    ],
    mimeTypes: ['image/*'],
    staticDir: 'studioMedia',
    staticURL: '/studio-media',
  },
};
