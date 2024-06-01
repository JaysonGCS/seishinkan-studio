import type { FieldHook } from 'payload/types';

export const generateSlug = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase();

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') {
      return generateSlug(value);
    }

    if (operation === 'create') {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback];

      if (fallbackData && typeof fallbackData === 'string') {
        return generateSlug(fallbackData);
      }
    }

    return value;
  };
