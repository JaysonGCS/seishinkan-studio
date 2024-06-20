'use client';
import type { CarouselApi } from '@/components/ui/carousel';
import type { KendoPage } from '@/src/payload-types';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import React, { useEffect, useState } from 'react';

interface OwnProps {
  kendoIntroduction: KendoPage['kendoIntroduction'];
}

export const IntroductionArea = (props: OwnProps) => {
  const { kendoIntroduction } = props;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const carouselItems = kendoIntroduction?.map((intro) => {
    const { description_html, title } = intro;
    return (
      <CarouselItem
        className="flex flex-col gap-4 md:basis-1/2 lg:basis-1/3"
        key={`kendo-page-introduction-${title}`}
      >
        <h2 className="underline">{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: description_html ?? '' }} />
      </CarouselItem>
    );
  });
  return (
    <div className="flex w-full flex-col gap-4 px-10 py-5 lg:p-14">
      <h1 className="font-bold">Introduction</h1>
      <Carousel setApi={setApi}>
        <CarouselContent>{carouselItems}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        {current} of {count}
      </div>
    </div>
  );
};
