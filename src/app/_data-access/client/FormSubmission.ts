import type { contactFormSchema } from '@/src/validation/contactFormValidation';
import type { z } from 'zod';

export const submitClientContactForm = async (
  data: z.infer<typeof contactFormSchema>,
): Promise<void> => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/contact-form`, {
    body: JSON.stringify({
      ...data,
    }),
    method: 'POST',
  });
  if (!resp.ok) {
    throw new Error('Fail to create submission');
  }
};
