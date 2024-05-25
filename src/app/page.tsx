import type { Metadata } from 'next';

import React from 'react';

import { DisabledPage } from './_components/DisabledPage/DisabledPage';
import { HeroSection } from './_components/HeroSection/HeroSection';
import { Section } from './_components/Section/Section';
import { getPageDetails } from './_data-access/PageDetails';
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
  const pageDetails = await getPageDetails(PAGE_KEY);
  const heroImage = pageDetails.heroImage;

  const showHeroSection = !(
    typeof heroImage === 'number' || heroImage === undefined
  );
  return (
    <main>
      {showHeroSection ? <HeroSection isMainHero media={heroImage} /> : null}
      <Section>home</Section>
    </main>
  );
}
