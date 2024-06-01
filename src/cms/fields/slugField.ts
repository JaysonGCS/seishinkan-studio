import type { Field } from 'payload/types';

import { merge } from 'ts-deepmerge';

import { formatSlug } from '../utilities/formatSlug';

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field;

export const slugField: Slug = (fieldToUse = 'title', overrides = {}) => {
  return merge<[Field, Partial<Field>]>(
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug(fieldToUse)],
      },
      index: true,
      label: 'Slug',
    } satisfies Field,
    overrides,
  ) as Field;
};
