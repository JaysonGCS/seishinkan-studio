'use client';

import type { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { contactFormSchema } from '@/src/validation/contactFormValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { submitContactForm } from '../../_data-access/FormSubmission';
import { validateTurnstile } from '../../_data-access/TurnstileValidation';
import {
  TOAST_ERROR_DURATION,
  TOAST_INFO_DURATION,
} from '../../_utils/Constants';
import { LoadableButton } from '../LoadableButton/LoadableButton';

interface OwnProps {
  className?: string;
  fallback: {
    emailAddress: string;
    emailTitle: string;
  };
  onTokenValidationFailed: () => void;
  token: null | string;
}

export const ContactForm = (props: OwnProps) => {
  const {
    className,
    fallback: { emailAddress, emailTitle },
    onTokenValidationFailed,
    token,
  } = props;
  const [isInProgress, setInProgress] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
    resolver: zodResolver(contactFormSchema),
  });

  const handleFailSubmit = useCallback(
    (data: z.infer<typeof contactFormSchema>) => {
      // Launch a contact email instead as fallback
      location.href = `mailto:${emailAddress}?subject=${emailTitle}&body=${data.message}`;
    },
    [emailAddress, emailTitle],
  );

  const handleSubmit = useCallback(
    async (data: z.infer<typeof contactFormSchema>) => {
      if (token === null) {
        toast({
          action: (
            <ToastAction
              altText="Email us"
              onClick={() => handleFailSubmit(data)}
            >
              Email us
            </ToastAction>
          ),
          description: 'There was a problem with your request.',
          duration: TOAST_ERROR_DURATION,
          title: 'Something went wrong.',
          variant: 'destructive',
        });
        return;
      }
      setInProgress(true);
      let isValidRequest = false;
      let errorMessage: string | undefined = undefined;
      try {
        const result = await validateTurnstile({ token });
        errorMessage = result.message;
        isValidRequest = result.isValid;
      } catch (e) {
        errorMessage = 'Failed to validate request.';
        isValidRequest = false;
      }
      if (!isValidRequest) {
        toast({
          action: (
            <ToastAction
              altText="Email us"
              onClick={() => handleFailSubmit(data)}
            >
              Email us
            </ToastAction>
          ),
          description: errorMessage,
          duration: TOAST_ERROR_DURATION,
          title: 'Something went wrong.',
          variant: 'destructive',
        });
        onTokenValidationFailed();
        setInProgress(false);
        return;
      }
      try {
        await submitContactForm(data);
        toast({
          description: 'Your message has been sent.',
          duration: TOAST_INFO_DURATION,
        });
        form.reset();
      } catch (e) {
        toast({
          action: (
            <ToastAction
              altText="Email us"
              onClick={() => handleFailSubmit(data)}
            >
              Email us
            </ToastAction>
          ),
          description: 'There was a problem with your request.',
          duration: TOAST_ERROR_DURATION,
          title: 'Something went wrong.',
          variant: 'destructive',
        });
      }
      setInProgress(false);
    },
    [form, handleFailSubmit, onTokenValidationFailed, toast, token],
  );

  return (
    <Form {...form}>
      <form className={className} onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          disabled={isInProgress}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={isInProgress}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          disabled={isInProgress}
          name="message"
          render={({ field }) => (
            <FormItem className="pb-4">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  placeholder="Hello there!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadableButton
          className="w-full"
          disabled={token === null || isInProgress}
          isLoading={token === null}
        />
      </form>
    </Form>
  );
};
