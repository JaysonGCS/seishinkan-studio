import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z
    .string()
    .min(1, { message: 'Email field cannot be empty.' })
    .email('This is not a valid email.'),
  message: z
    .string()
    .min(1, { message: 'Message field cannot be empty.' })
    .max(300, {
      message: 'message must be within 300 characters.',
    }),
});
