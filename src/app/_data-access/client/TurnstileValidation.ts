import type { turnstileSchema } from '@/src/validation/turnstileValidation';
import type { z } from 'zod';

export const validateClientTurnstile = async (
  data: z.infer<typeof turnstileSchema>,
): Promise<{ isValid: boolean; message: string | undefined }> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/validate-turnstile`,
    {
      body: JSON.stringify({
        ...data,
      }),
      method: 'POST',
    },
  );
  const result = await resp.json();
  if (!resp.ok) {
    return { isValid: false, message: result.message };
  }
  return { isValid: true, message: result.message };
};
