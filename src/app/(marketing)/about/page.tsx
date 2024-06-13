import type { Metadata } from 'next';

import { DisabledPage } from '../../_components/DisabledPage/DisabledPage';
import { HeroSection } from '../../_components/HeroSection/HeroSection';
import { Section } from '../../_components/Section/Section';
import { getPageDetails, getSeoMetadata } from '../../_data-access/server';
import { MainPage } from '../../_utils/Paths';
import { TeamArea } from './TeamArea';
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
    team,
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
      <Section>
        <VisionAndMissionArea
          missionDescription={missionDescription}
          visionDescription={visionDescription}
        />
      </Section>
      <Section lightTheme>
        <TeamArea team={team} />
      </Section>
    </main>
  );
};

export default AboutPage;
