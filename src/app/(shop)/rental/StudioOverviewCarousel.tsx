'use client';
import type { RentalPage } from '@/src/payload-types';
import type { AutoplayType } from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import React, { useRef } from 'react';

interface OwnProps {
  studioCarouselMedia: RentalPage['studioOverview']['studioCarouselMedia'];
}

export const StudioOverviewCarousel = (props: OwnProps) => {
  const { studioCarouselMedia } = props;
  const plugin = useRef<AutoplayType>(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
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
    <div className="flex basis-1/2 justify-center px-10 md:px-20">
      <Carousel
        className="w-full min-w-full max-w-xs md:min-w-[40vw]"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        plugins={[plugin.current]}
      >
        <CarouselContent className="flex items-center">
          {carouselList}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
