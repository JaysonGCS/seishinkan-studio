import type { PropsWithChildren } from 'react';

import clsx from 'clsx';
import React from 'react';

interface OwnProps {
  anchor?: string;
  className?: string;
  lightTheme?: boolean;
  title?: string;
}

export const Section = (props: PropsWithChildren<OwnProps>) => {
  const { anchor, children, className, lightTheme = false, title } = props;

  return (
    <section
      className={clsx(
        'flex w-screen flex-col items-center px-6 py-4',
        {
          'bg-card text-card-foreground': !lightTheme,
          'bg-card-foreground text-card': lightTheme,
        },
        className,
      )}
      id={anchor}
    >
      {title ? <h1 className="place-self-start pb-2">{title}</h1> : null}
      {children}
    </section>
  );
};
