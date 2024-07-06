import type { RentalPage } from '@/src/payload-types';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import dayjs from 'dayjs';
import React from 'react';

interface OwnProps {
  studioRates: RentalPage['studioBooking']['studioRates'];
}
export const BookingRate = (props: OwnProps) => {
  const { studioRates } = props;

  const rateCard = studioRates.map((rate) => {
    const { availableDays, endTime, hourlyRate, startTime, title } = rate;
    const startTimeHM = dayjs(new Date(startTime)).format('h.mm A');
    const endTimeHM = dayjs(new Date(endTime)).format('h.mm A');
    const availableDaysItems = availableDays.map((day) => {
      return (
        <div
          className="rounded-full border-2 border-solid border-accent p-2 font-bold"
          key={`studio-rental-booking-rate-available-day-${day}`}
        >
          {day}
        </div>
      );
    });
    return (
      <Card key={`studio-rental-booking-rate-card-${title}`}>
        <CardHeader className="pb-2">
          <CardDescription className="flex justify-center text-3xl font-bold">
            {title}
          </CardDescription>
          <CardTitle>
            <span>SGD </span>
            <span className="text-5xl">{hourlyRate}</span>
            <span> /Hour</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 text-xs">
          {availableDaysItems}
        </CardContent>
        <CardFooter>{`${startTimeHM} to ${endTimeHM}`}</CardFooter>
      </Card>
    );
  });

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row">{rateCard}</div>
    </div>
  );
};
