import type { RentalPage } from '@/src/payload-types';

import { StudioOverviewCarousel } from './StudioOverviewCarousel';

interface OwnProps {
  studioCarouselMedia: RentalPage['studioCarouselMedia'];
  studioOverviewList: RentalPage['studioOverviewList'];
}

export const StudioOverviewArea = (props: OwnProps) => {
  const { studioCarouselMedia, studioOverviewList } = props;

  const studioOverviewItems = studioOverviewList.map(
    ({ studioOverviewItem }, index) => (
      <li key={`rental-studio-overview-area-${index}`}>
        <span>{studioOverviewItem}</span>
      </li>
    ),
  );

  return (
    <div className="flex w-screen flex-col justify-between gap-4 px-8 py-6 md:flex-row lg:px-14">
      <StudioOverviewCarousel studioCarouselMedia={studioCarouselMedia} />
      <div className="basis-1/2">
        <h2>Features</h2>
        <ul className="list-disc pl-4">{studioOverviewItems}</ul>
      </div>
    </div>
  );
};
