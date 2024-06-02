import { z } from 'zod';

export const slugSchema = z.object({
  slug: z.string().regex(new RegExp(/^[a-z\d]+(?:-[a-z\d]+)*$/)),
});
