import type { Validate } from 'payload/types';

export const validatePayloadUrlField: Validate = (val: string) => {
  if (val === '') {
    return true;
  } else {
    try {
      const isValidUrl = Boolean(new URL(val));
      if (isValidUrl) {
        return true;
      } else {
        return `"${val}" is invalid. It must be either empty or a valid URL`;
      }
    } catch (e) {
      return `"${val}" is invalid. It must be either empty or a valid URL`;
    }
  }
};
