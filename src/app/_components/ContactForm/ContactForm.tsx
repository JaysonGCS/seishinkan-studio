'use client';

import type { z } from 'zod';

import { Button } from '@/components/ui/button';
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
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { submitContactForm } from '../../_data-access/FormSubmission';
import {
  TOAST_ERROR_DURATION,
  TOAST_INFO_DURATION,
} from '../../_utils/Constants';

interface OwnProps {
  className?: string;
  fallback: {
    emailAddress: string;
    emailTitle: string;
  };
}

export const ContactForm = (props: OwnProps) => {
  const {
    className,
    fallback: { emailAddress, emailTitle },
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
      setInProgress(true);
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
              altText="Try again"
              onClick={() => handleFailSubmit(data)}
            >
              Try again
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
    [form, handleFailSubmit, toast],
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
        <Button className="w-full" disabled={isInProgress} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
