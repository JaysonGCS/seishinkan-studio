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
import { toast } from '@/components/ui/use-toast';
import {
  loginFormSchema,
  signUpFormSchema,
} from '@/src/validation/emailValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';

import { LoginStatus, loginStateAtom } from '../../_atoms/UserLoginAtoms';
import { Section } from '../../_components/Section/Section';
import {
  TOAST_ERROR_DURATION,
  TOAST_INFO_DURATION,
} from '../../_utils/Constants';
import { MainPage } from '../../_utils/Paths';

type TLoginStage = 'LOGIN' | 'SIGNUP';

export const LoginPage = () => {
  const [loginStage, setLoginStage] = useState<TLoginStage>('LOGIN');
  const [isInProgress, setInProgress] = useState(false);
  const router = useRouter();
  const setLoginState = useSetAtom(loginStateAtom);

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    defaultValues: {
      confirm: '',
      email: '',
      password: '',
    },
    resolver: zodResolver(signUpFormSchema),
  });

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  });

  const onSignUpSubmit = useCallback(
    async (values: z.infer<typeof signUpFormSchema>) => {
      setInProgress(true);
      const resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
        body: JSON.stringify(values),
        method: 'POST',
      });
      if (resp.status === 200) {
        const result = await resp.json();
        toast({
          description: result.message,
          duration: TOAST_INFO_DURATION,
          title: 'Successful.',
          variant: 'default',
        });
        // Clear form after success
        signUpForm.reset();
      } else {
        const result = await resp.json();
        toast({
          description: result.message,
          duration: TOAST_ERROR_DURATION,
          title: 'Something went wrong.',
          variant: 'destructive',
        });
      }
      setInProgress(false);
    },
    [signUpForm],
  );

  const onLoginSubmit = useCallback(
    async (values: z.infer<typeof loginFormSchema>) => {
      setInProgress(true);
      // TODO: move to _data-access
      const resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        body: JSON.stringify(values),
        credentials: 'same-origin',
        method: 'POST',
      });
      if (resp.ok) {
        setLoginState(LoginStatus.LOGGED_IN);
        router.push(MainPage.MEMBER);
        router.refresh();
      } else {
        toast({
          description: 'There was a problem with your request.',
          duration: TOAST_ERROR_DURATION,
          title: 'Something went wrong.',
          variant: 'destructive',
        });
      }
      setInProgress(false);
    },
    [router, setLoginState],
  );

  const handleSwitchToSignUp = useCallback(() => {
    setLoginStage('SIGNUP');
  }, []);

  const handleSwitchToLogin = useCallback(() => {
    setLoginStage('LOGIN');
  }, []);

  return (
    <Section>
      <div className="w-5/6 lg:w-6/12">
        {loginStage === 'SIGNUP' ? (
          <Form key={`${LoginPage.name}-signup`} {...signUpForm}>
            <form
              className="space-y-8"
              onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
            >
              <FormField
                control={signUpForm.control}
                disabled={isInProgress}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Login Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                disabled={isInProgress}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signUpForm.control}
                disabled={isInProgress}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password Confirmation"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isInProgress} type="submit">
                Submit
              </Button>
              <Button
                disabled={isInProgress}
                onClick={handleSwitchToLogin}
                type="button"
                variant="link"
              >
                Back to login
              </Button>
            </form>
          </Form>
        ) : (
          <React.Fragment key={`${LoginPage.name}-login`}>
            <Form {...loginForm}>
              <form
                className="space-y-8"
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
              >
                <FormField
                  control={loginForm.control}
                  disabled={isInProgress}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Login Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  disabled={isInProgress}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isInProgress} type="submit">
                  Submit
                </Button>
                <Button
                  disabled={isInProgress}
                  onClick={handleSwitchToSignUp}
                  type="button"
                  variant="link"
                >
                  Create account
                </Button>
              </form>
            </Form>
          </React.Fragment>
        )}
      </div>
    </Section>
  );
};
