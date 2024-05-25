import Script from 'next/script';
import React from 'react';

import { TURNSTILE_SCRIPT } from '../_utils/Constants';

export default function NextedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      {children}
      <Script async defer src={TURNSTILE_SCRIPT} />
    </React.Fragment>
  );
}
