import type { RentalPage } from '@/src/payload-types';

import { StudioOverviewCarousel } from './StudioOverviewCarousel';

interface OwnProps {
  studioCarouselMedia: RentalPage['studioOverview']['studioCarouselMedia'];
  studioFacilityList: RentalPage['studioOverview']['studioFacilityList'];
  studioOverviewList: RentalPage['studioOverview']['studioOverviewList'];
}

export const StudioOverviewArea = (props: OwnProps) => {
  const { studioCarouselMedia, studioFacilityList, studioOverviewList } = props;

  const studioOverviewItems = studioOverviewList.map(
    ({ studioOverviewItem }, index) => (
      <li key={`rental-studio-overview-area-space-${index}`}>
        <span>{studioOverviewItem}</span>
      </li>
    ),
  );

  const studioFacilityItems = studioFacilityList.map(
    ({ studioFacilityItem }, index) => (
      <li key={`rental-studio-overview-area-facility-${index}`}>
        <span>{studioFacilityItem}</span>
      </li>
    ),
  );

  return (
    <div className="flex w-full flex-col justify-between gap-4 px-2 py-6 md:w-screen md:flex-row lg:px-14">
      <StudioOverviewCarousel studioCarouselMedia={studioCarouselMedia} />
      <div className="flex basis-1/2 flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold">Features</h2>
          <ul className="list-disc pl-4">{studioOverviewItems}</ul>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-bold">Facilities</h2>
          <ul className="list-disc pl-4">{studioFacilityItems}</ul>
        </div>
      </div>
    </div>
  );
};
