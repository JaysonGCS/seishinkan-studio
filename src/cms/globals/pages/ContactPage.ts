import type { GlobalConfig } from 'payload/types';

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable Page',
    },
    {
      name: 'googleMapEmbededLink',
      type: 'text',
      admin: {
        placeholder:
          'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.73976638836!2d103.88991731582531!3d1.3322685990283198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da17f543bafc39%3A0x6a2e6ee5bcb5b25f!2sSeishinkan%20Kendo%20Studio%20Private%20Limited!5e0!3m2!1sen!2ssg!4v1667115817126!5m2!1sen!2ssg',
      },
      label: 'Google Map Embeded Link',
      required: true,
      validate: (val) => {
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
      },
    },
  ],
};
