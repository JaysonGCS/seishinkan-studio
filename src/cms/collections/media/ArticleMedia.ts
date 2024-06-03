import type { CollectionConfig } from 'payload/types';

import { MediaConstant } from '../../../Constants';
import { admins } from '../access/admins';
import { anyone } from '../access/anyone';

export const ArticleMedia: CollectionConfig = {
  slug: 'article-media',
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
    ],
    mimeTypes: ['image/*'],
    staticDir: 'articleMedia',
    staticURL: '/article-media',
  },
};
