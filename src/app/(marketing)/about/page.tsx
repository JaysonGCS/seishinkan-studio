import type { Metadata } from 'next';

import { DisabledPage } from '../../_components/DisabledPage/DisabledPage';
import { HeroSection } from '../../_components/HeroSection/HeroSection';
import { Section } from '../../_components/Section/Section';
import { getPageDetails } from '../../_data-access/PageDetails';
import { getSeoMetadata } from '../../_data-access/SeoMetadata';
import { MainPage } from '../../_utils/Paths';
import { VisionAndMissionArea } from './VisionAndMissionArea';

const PAGE_KEY = MainPage.ABOUT;

export async function generateMetadata(): Promise<Metadata> {
  const { description, title } = await getSeoMetadata(PAGE_KEY);
  return {
    description,
    title,
  };
}

const AboutPage = async () => {
  const pageDetails = await getPageDetails(PAGE_KEY);
  const {
    enabled: isEnabled,
    missionDescription,
    visionDescription,
  } = pageDetails;

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
      <Section className="py-14">
        <VisionAndMissionArea
          missionDescription={missionDescription}
          visionDescription={visionDescription}
        />
      </Section>
      <Section lightTheme>Founder</Section>
    </main>
  );
};

export default AboutPage;
