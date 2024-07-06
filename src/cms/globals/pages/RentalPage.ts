import type { GlobalConfig } from 'payload/types';

import { secondaryHeroFields } from '../../fields/secondaryHeroFields';

export const RentalPage: GlobalConfig = {
  slug: 'rental-page',
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
    ...secondaryHeroFields(),
    {
      type: 'collapsible',
      fields: [
        {
          name: 'studioOverview',
          type: 'group',
          fields: [
            {
              name: 'studioOverviewList',
              type: 'array',
              fields: [
                {
                  name: 'studioOverviewItem',
                  type: 'text',
                  required: true,
                },
              ],
              label:
                'General Studio/Space Overview (e.g., size, fits XX pax and etc)',
              minRows: 2,
              required: true,
            },
            {
              name: 'studioFacilityList',
              type: 'array',
              fields: [
                {
                  name: 'studioFacilityItem',
                  type: 'text',
                  required: true,
                },
              ],
              label: 'Studio Facility (e.g., Free Wifi, Speaker and etc)',
              minRows: 2,
              required: true,
            },
            {
              name: 'studioCarouselMedia',
              type: 'array',
              fields: [
                {
                  name: 'studioImage',
                  type: 'upload',
                  label: 'Studio Image',
                  relationTo: 'studio-media',
                  required: true,
                },
              ],
              minRows: 1,
              required: true,
            },
          ],
          label: 'Studio Overview',
        },
      ],
      label: 'Studio Overview Section',
    },
    {
      type: 'collapsible',
      fields: [
        {
          name: 'studioBooking',
          type: 'group',
          fields: [
            {
              name: 'enabled',
              type: 'checkbox',
              defaultValue: true,
              label: 'Enable Studio Booking',
              required: true,
            },
            {
              name: 'studioRates',
              type: 'array',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label:
                    'Title (free text - e.g., "Weekday Off Peak" or "Weekend")',
                  required: true,
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'hourlyRate',
                      type: 'number',
                      admin: {
                        step: 1,
                      },
                      min: 10,
                      required: true,
                    },
                    {
                      name: 'availableDays',
                      type: 'select',
                      admin: {
                        isClearable: true,
                      },
                      hasMany: true,
                      options: [
                        {
                          label: 'Monday',
                          value: 'MO',
                        },
                        {
                          label: 'Tuesday',
                          value: 'TU',
                        },
                        {
                          label: 'Wednesday',
                          value: 'WE',
                        },
                        {
                          label: 'Thursday',
                          value: 'TH',
                        },
                        {
                          label: 'Friday',
                          value: 'FR',
                        },
                        {
                          label: 'Saturday',
                          value: 'SA',
                        },
                        {
                          label: 'Sunday',
                          value: 'SU',
                        },
                      ],
                      required: true,
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'startTime',
                      type: 'date',
                      admin: {
                        date: {
                          displayFormat: 'h:mm aa',
                          pickerAppearance: 'timeOnly',
                        },
                      },
                      required: true,
                    },
                    {
                      name: 'endTime',
                      type: 'date',
                      admin: {
                        date: {
                          displayFormat: 'h:mm aa',
                          pickerAppearance: 'timeOnly',
                        },
                      },
                      required: true,
                    },
                  ],
                },
              ],
              label: 'Studio Booking Rates',
              minRows: 1,
              required: true,
            },
          ],
        },
      ],
      label: 'Studio Booking Section',
    },
  ],
};
