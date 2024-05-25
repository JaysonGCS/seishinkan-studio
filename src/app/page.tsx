import type { Metadata } from 'next';

import { DisabledPage } from './_components/DisabledPage/DisabledPage';
import { isPageEnabled } from './_data-access/PageValidation';
import { getSeoMetadata } from './_data-access/SeoMetadata';
import { MainPage } from './_utils/Paths';

const PAGE_KEY = MainPage.HOME;

export async function generateMetadata(): Promise<Metadata> {
  const { description, title } = await getSeoMetadata(PAGE_KEY);
  return {
    description,
    title,
  };
}

export default async function Home() {
  const isEnabled = await isPageEnabled(PAGE_KEY);
  if (!isEnabled) {
    return <DisabledPage />;
  }

  return <main>Home Page</main>;
}
