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

export const validateEmailField: Validate = (email) => {
  if (email === undefined) {
    return false;
  }
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/,
  );
};
