'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HeartCrack } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Section } from './_components/Section/Section';
import { MainPage } from './_utils/Paths';

export default function NotFoundPage() {
  const router = useRouter();
  const [counter, setCounter] = useState(3);

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
          <HeartCrack className="size-4" />
          <AlertTitle>Page does not exist!</AlertTitle>
          <AlertDescription>Redirecting in {counter}...</AlertDescription>
        </Alert>
      </Section>
    </main>
  );
}
