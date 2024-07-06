import type { Metadata } from 'next';

import { DisabledPage } from '../../_components/DisabledPage/DisabledPage';
import { HeroSection } from '../../_components/HeroSection/HeroSection';
import { Section } from '../../_components/Section/Section';
import { getPageDetails, getSeoMetadata } from '../../_data-access/server';
import { MainPage } from '../../_utils/Paths';
import { BookingRate } from './BookingRate';
import { BusinessInquiry } from './BusinessInquiry';
import { StudioOverviewArea } from './StudioOverviewArea';

const PAGE_KEY = MainPage.RENTAL;

export async function generateMetadata(): Promise<Metadata> {
  const { description, title } = await getSeoMetadata(PAGE_KEY);
  return {
    description,
    title,
  };
}

const RentalPage = async () => {
  const pageDetails = await getPageDetails(PAGE_KEY);
  const { enabled: isEnabled } = pageDetails;

  if (!isEnabled) {
    return <DisabledPage />;
  }
  const heroImage = pageDetails.heroImage;

  const showHeroSection = !(
    typeof heroImage === 'number' || heroImage === undefined
  );

  const { studioBooking, studioOverview } = pageDetails;
  const { studioCarouselMedia, studioFacilityList, studioOverviewList } =
    studioOverview;
  const { enabled: isStudioBookingEnabled } = studioBooking;

  return (
    <main>
      {showHeroSection ? <HeroSection media={heroImage} /> : null}
      <Section title="Studio Overview">
        <StudioOverviewArea
          studioCarouselMedia={studioCarouselMedia}
          studioFacilityList={studioFacilityList}
          studioOverviewList={studioOverviewList}
        />
      </Section>
      {isStudioBookingEnabled && (
        <Section lightTheme title="Booking Rate">
          <BookingRate />
        </Section>
      )}
      <Section title="Business Inquiry">
        <BusinessInquiry />
      </Section>
    </main>
  );
};

export default RentalPage;
