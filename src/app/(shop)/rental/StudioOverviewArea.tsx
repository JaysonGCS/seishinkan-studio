import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import React from 'react';

import { getPageDetails } from '../../_data-access/server';
import { MainPage } from '../../_utils/Paths';

const PAGE_KEY = MainPage.RENTAL;

export const StudioOverviewArea = async () => {
  const pageDetails = await getPageDetails(PAGE_KEY);
  const { studioCarouselMedia, studioOverviewList } = pageDetails;

  const studioOverviewItems = studioOverviewList.map(
    ({ studioOverviewItem }, index) => (
      <li key={`rental-studio-overview-area-${index}`}>
        <span>{studioOverviewItem}</span>
      </li>
    ),
  );

  const carouselList = studioCarouselMedia.reduce<React.ReactElement[]>(
    (total, { studioImage }, index) => {
      if (typeof studioImage !== 'number') {
        const alt = studioImage.alt ?? '';
        const card = studioImage.sizes?.heroCard;
        let height: number;
        let width: number;
        let url: string;
        if (card?.url) {
          height = card?.height ?? 0;
          width = card?.width ?? 0;
          url = card?.url ?? '';
        } else {
          height = studioImage?.height ?? 0;
          width = studioImage?.width ?? 0;
          url = studioImage?.url ?? '';
        }

        total.push(
          <CarouselItem key={`rental-studio-overview-studio-media-${index}`}>
            <div className="p-1">
              <Card>
                <CardContent className="flex max-h-[400px] items-center justify-center p-6">
                  <Image
                    alt={alt}
                    className="rounded-t-md"
                    height={height}
                    src={url}
                    width={width}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>,
        );
      }
      return total;
    },
    [],
  );

  return (
    <div className="flex w-screen flex-col justify-between gap-4 px-8 py-6 md:flex-row lg:px-14">
      <div className="flex basis-1/2 justify-center px-10 md:px-20">
        <Carousel className="w-full min-w-full max-w-xs md:min-w-[40vw]">
          <CarouselContent className="flex items-center">
            {carouselList}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="basis-1/2">
        <h2>Features</h2>
        <ul className="list-disc pl-4">{studioOverviewItems}</ul>
      </div>
    </div>
  );
};
