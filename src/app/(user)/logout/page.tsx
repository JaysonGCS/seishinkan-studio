'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useSetAtom } from 'jotai';
import { RocketIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { LoginStatus, loginStateAtom } from '../../_atoms/UserLoginAtoms';
import { Section } from '../../_components/Section/Section';
import { MainPage, OtherPage, isOtherPage } from '../../_utils/Paths';

const Page = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const activeOtherPage = isOtherPage(currentPath) ? currentPath : undefined;
  const setLoginState = useSetAtom(loginStateAtom);
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    if (activeOtherPage === OtherPage.LOGOUT) {
      setLoginState(LoginStatus.UNAUTHORISED);
    }
  }, [activeOtherPage, setLoginState]);

  useEffect(() => {
    if (counter === 0) {
      router.replace(MainPage.HOME);
    }
    const id = setTimeout(() => {
      setCounter((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(id);
  }, [counter, router]);

  return (
    <main className="flex flex-col">
      <Section>
        <Alert className="md:w-2/5">
          <RocketIcon className="size-4" />
          <AlertTitle>You have logged out.</AlertTitle>
          <AlertDescription>Redirecting in {counter}...</AlertDescription>
        </Alert>
      </Section>
    </main>
  );
};

export default Page;
