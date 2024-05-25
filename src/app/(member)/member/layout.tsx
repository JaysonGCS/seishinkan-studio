import { cookies } from 'next/headers';
import React from 'react';

import { Section } from '../../_components/Section/Section';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/validate-login`,
    {
      headers: { Cookie: cookies().toString() },
    },
  );
  if (!resp.ok) {
    return (
      <Section>
        <div>Unauthorised</div>
      </Section>
    );
  }
  return <React.Fragment>{children}</React.Fragment>;
}
