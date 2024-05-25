import type { Metadata } from 'next';

import { DisabledPage } from '../../_components/DisabledPage/DisabledPage';
import { HeroSection } from '../../_components/HeroSection/HeroSection';
import { Section } from '../../_components/Section/Section';
import { getGeneralDetails } from '../../_data-access/GeneralDetails';
import { getPageDetails } from '../../_data-access/PageDetails';
import { getSeoMetadata } from '../../_data-access/SeoMetadata';
import { MainPage, pageToAnchor } from '../../_utils/Paths';
import { ContactArea } from '../contact/ContactArea';
import { FaqArea } from './FaqArea';
import { IntroductionArea } from './IntroductionArea';

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
  const { enabled: isEnabled, faqs, kendoIntroduction } = pageDetails;

  if (!isEnabled) {
    return <DisabledPage />;
  }
  const { email } = await getGeneralDetails();

  const heroImage = pageDetails.heroImage;

  const showHeroSection = !(
    typeof heroImage === 'number' || heroImage === undefined
  );

  return (
    <main>
      {showHeroSection ? <HeroSection media={heroImage} /> : null}
      <Section anchor={pageToAnchor[MainPage.KENDO].introduction}>
        <IntroductionArea kendoIntroduction={kendoIntroduction} />
      </Section>
      <Section anchor={pageToAnchor[MainPage.KENDO].classes} lightTheme>
        Classes
      </Section>
      <Section anchor={pageToAnchor[MainPage.KENDO].classes}>
        <h1>Join our Kendo Community</h1>
        {/* TODO: Refactor or relocate ContactArea to be reused properly */}
        <ContactArea email={email} />
      </Section>
      <Section anchor={pageToAnchor[MainPage.KENDO].faq} lightTheme>
        <FaqArea faqs={faqs} />
      </Section>
    </main>
  );
};

export default KendoPage;
