import type { Field } from 'payload/types';

export const secondaryHeroFields = (): Field[] => {
  return [
    {
      name: 'heroImage',
      type: 'upload',
      label: 'Hero Image (halfHero and mobileHero)',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'heroBannerMessage',
      type: 'textarea',
      maxLength: 250,
      required: false,
    },
  ];
};
