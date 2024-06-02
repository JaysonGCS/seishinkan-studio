import { z } from 'zod';

import { MainPage } from '../app/_utils/Paths';

export const pageVerificationSchema = z.object({
  page: z.nativeEnum(MainPage),
});

export const seoVerificationSchema = z.object({
  page: z.nativeEnum(MainPage),
});
