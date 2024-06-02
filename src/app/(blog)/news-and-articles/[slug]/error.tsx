'use client';

import { Section } from '@/src/app/_components/Section/Section';

export default function Error() {
  // TODO: Log the error to an error reporting service. Reference: https://nextjs.org/docs/app/building-your-application/routing/error-handling
  //   useEffect(() => {
  //     console.error(error);
  //   }, [error]);

  return (
    <Section>
      <div>
        <h1>Something went wrong!</h1>
      </div>
    </Section>
  );
}
