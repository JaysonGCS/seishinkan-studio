import { Button } from '@/components/ui/button';
import { MainPage } from '@/src/app/_utils/Paths';
import { Undo2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function NextedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Link
        className="block overflow-hidden rounded-lg"
        href={MainPage.NEWS_AND_ARTICLES}
      >
        <Button variant="link">
          <Undo2 size={16} />
          <span className="pl-2">Return to news & articles</span>
        </Button>
      </Link>
      {children}
    </React.Fragment>
  );
}
