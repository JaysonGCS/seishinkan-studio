import type { Metadata } from 'next';

import { DisabledPage } from '../../_components/DisabledPage/DisabledPage';
import { HeroSection } from '../../_components/HeroSection/HeroSection';
import { Section } from '../../_components/Section/Section';
import {
  getGeneralDetails,
  getPageDetails,
  getSeoMetadata,
} from '../../_data-access/server';
import { MainPage, pageToAnchor } from '../../_utils/Paths';
import { ContactArea } from '../contact/ContactArea';
import { ClassesArea } from './ClassesArea';
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
  const {
    enabled: isEnabled,
    faqs,
    kendoClasses,
    kendoIntroduction,
  } = pageDetails;

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
        <ClassesArea kendoClasses={kendoClasses} />
      </Section>
      <Section anchor={pageToAnchor[MainPage.KENDO].classes}>
        <h1 className="font-bold">Join our Kendo Community</h1>
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
