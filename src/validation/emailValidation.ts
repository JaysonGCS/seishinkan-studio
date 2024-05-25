import { z } from 'zod';

export const emailVerificationSchema = z.object({ token: z.string() });

export const signUpFormSchema = z
  .object({
    confirm: z
      .string()
      .min(6, { message: 'Must contain at least 6 character(s)' })
      .max(20, { message: 'Cannot exceed 20 characters' }),
    email: z
      .string()
      .min(1, { message: 'This field cannot be empty.' })
      .email('This is not a valid email.'),
    password: z
      .string()
      .min(6, { message: 'Must contain at least 6 character(s)' })
      .max(20, { message: 'Cannot exceed 20 characters' }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  });

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field cannot be empty.' })
    .email('This is not a valid email.'),
  password: z
    .string()
    .min(6, { message: 'Must contain at least 6 character(s)' })
    .max(20, { message: 'Cannot exceed 20 characters' }),
});
