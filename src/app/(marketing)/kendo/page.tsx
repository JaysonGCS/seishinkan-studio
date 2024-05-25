import type { Metadata } from 'next';

import { DisabledPage } from '../../_components/DisabledPage/DisabledPage';
import { HeroSection } from '../../_components/HeroSection/HeroSection';
import { Section } from '../../_components/Section/Section';
import { getPageDetails } from '../../_data-access/PageDetails';
import { getSeoMetadata } from '../../_data-access/SeoMetadata';
import { MainPage, pageToAnchor } from '../../_utils/Paths';
import { FaqArea } from './FaqArea';

const PAGE_KEY = MainPage.KENDO;

export async function generateMetadata(): Promise<Metadata> {
  const { description, title } = await getSeoMetadata(PAGE_KEY);
  return {
    description,
    title,
  };
}

const KendoPage = async () => {
  const pageDetails = await getPageDetails(PAGE_KEY);
  const { enabled: isEnabled, faqs } = pageDetails;

  if (!isEnabled) {
    return <DisabledPage />;
  }
  const heroImage = pageDetails.heroImage;

  const showHeroSection = !(
    typeof heroImage === 'number' || heroImage === undefined
  );

  return (
    <main>
      {showHeroSection ? <HeroSection media={heroImage} /> : null}
      <Section anchor={pageToAnchor[MainPage.KENDO].introduction}>
        Introduction
      </Section>
      <Section anchor={pageToAnchor[MainPage.KENDO].classes} lightTheme>
        Classes
      </Section>
      <Section anchor={pageToAnchor[MainPage.KENDO].classes}>
        Contact Us
      </Section>
      <Section
        anchor={pageToAnchor[MainPage.KENDO].faq}
        className="py-14"
        lightTheme
      >
        <FaqArea faqs={faqs} />
      </Section>
    </main>
  );
};

export default KendoPage;
