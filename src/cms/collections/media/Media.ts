import type { CollectionConfig } from 'payload/types';

import { MediaConstant } from '../../../Constants';
import { admins } from '../access/admins';
import { anyone } from '../access/anyone';

export const Media: CollectionConfig = {
  slug: 'media',
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
  upload: {
    adminThumbnail: 'thumbnail',
    disableLocalStorage: process.env.PAYLOAD_ENABLE_LOCAL_MEDIA !== 'true',
    imageSizes: [
      {
        // 4:3
        name: 'thumbnail',
        height: MediaConstant.thumbnail.height,
        position: 'centre',
        width: MediaConstant.thumbnail.width,
      },
      {
        // 3:4
        name: 'card',
        height: MediaConstant.card.height,
        position: 'centre',
        width: MediaConstant.card.width,
      },
      // 21:9
      {
        name: 'mobileHero',
        fit: 'contain',
        height: MediaConstant.mobileHero.height,
        position: 'centre',
        width: MediaConstant.mobileHero.width,
      },
      {
        // 21:9
        name: 'halfHero',
        fit: 'contain',
        height: MediaConstant.halfHero.height,
        position: 'centre',
        width: MediaConstant.halfHero.width,
      },
      {
        name: 'hero',
        fit: 'cover',
        height: undefined,
        position: 'centre',
        width: MediaConstant.hero.width,
      },
    ],
    mimeTypes: ['image/*'],
    staticDir: 'media',
    staticURL: '/media',
  },
};
