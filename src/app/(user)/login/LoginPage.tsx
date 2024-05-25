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
import React, { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import type { CaptchaInnerFunctions } from '../../_components/Captcha/Captcha';

import { LoginStatus, loginStateAtom } from '../../_atoms/UserLoginAtoms';
import { Captcha } from '../../_components/Captcha/Captcha';
import { LoadableButton } from '../../_components/LoadableButton/LoadableButton';
import { Section } from '../../_components/Section/Section';
import { validateTurnstile } from '../../_data-access/TurnstileValidation';
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
  const [token, setToken] = useState<null | string>(null);
  const signUpCaptchaApiRef = useRef<CaptchaInnerFunctions>(null);
  const loginCaptchaApiRef = useRef<CaptchaInnerFunctions>(null);

  const handleVerify = useCallback((token) => {
    setToken(token);
  }, []);

  const handleExpired = useCallback(() => {
    setToken(null);
  }, []);

  const isTokenExist = useCallback((): boolean => {
    if (token === null) {
      toast({
        description: 'There was a problem with your request',
        duration: TOAST_ERROR_DURATION,
        title: 'Something went wrong.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  }, [token]);

  const validateToken = useCallback(async (token: string): Promise<boolean> => {
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
        description: errorMessage,
        duration: TOAST_ERROR_DURATION,
        title: 'Something went wrong.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  }, []);

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
      if (!isTokenExist()) {
        return;
      }
      setInProgress(true);
      if (token === null || !(await validateToken(token))) {
        setInProgress(false);
        return;
      }
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
    [isTokenExist, signUpForm, token, validateToken],
  );

  const onLoginSubmit = useCallback(
    async (values: z.infer<typeof loginFormSchema>) => {
      if (!isTokenExist()) {
        return;
      }
      setInProgress(true);
      if (token === null || !(await validateToken(token))) {
        setInProgress(false);
        return;
      }
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
    [isTokenExist, router, setLoginState, token, validateToken],
  );

  const handleSwitchToSignUp = useCallback(() => {
    setLoginStage('SIGNUP');
    setToken(null);
  }, []);

  const handleSwitchToLogin = useCallback(() => {
    setLoginStage('LOGIN');
    setToken(null);
  }, []);

  return (
    <Section>
      <div className="w-5/6 lg:w-6/12">
        {loginStage === 'SIGNUP' ? (
          <div className="flex flex-col gap-3">
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
                <div className="flex flex-row items-center">
                  <LoadableButton
                    className="min-w-32"
                    disabled={token === null || isInProgress}
                    isLoading={token === null}
                  />
                  <Button
                    disabled={token === null || isInProgress}
                    onClick={handleSwitchToLogin}
                    type="button"
                    variant="link"
                  >
                    Back to login
                  </Button>
                </div>
              </form>
            </Form>
            <Captcha
              onExpired={handleExpired}
              onVerify={handleVerify}
              ref={signUpCaptchaApiRef}
              refreshExpiredMode="manual"
              sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY ?? ''}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-3" key={`${LoginPage.name}-login`}>
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
                <div className="flex flex-row items-center">
                  <LoadableButton
                    className="min-w-32"
                    disabled={token === null || isInProgress}
                    isLoading={token === null}
                  />
                  <Button
                    disabled={token === null || isInProgress}
                    onClick={handleSwitchToSignUp}
                    type="button"
                    variant="link"
                  >
                    Create account
                  </Button>
                </div>
              </form>
            </Form>
            <Captcha
              onExpired={handleExpired}
              onVerify={handleVerify}
              ref={loginCaptchaApiRef}
              refreshExpiredMode="manual"
              sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY ?? ''}
            />
          </div>
        )}
      </div>
    </Section>
  );
};
