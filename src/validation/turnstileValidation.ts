import { z } from 'zod';

export const turnstileSchema = z.object({
  token: z.string().min(5).max(2048),
});
