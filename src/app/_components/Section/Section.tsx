import type { PropsWithChildren } from 'react';

import React from 'react';

interface OwnProps {
  title?: string;
}

export const Section = (props: PropsWithChildren<OwnProps>) => {
  const { children, title } = props;

  return (
    <section className="flex w-screen flex-col items-center bg-card px-6 py-4 text-card-foreground">
      {title ? <h1 className="place-self-start pb-2">{title}</h1> : null}
      {children}
    </section>
  );
};
