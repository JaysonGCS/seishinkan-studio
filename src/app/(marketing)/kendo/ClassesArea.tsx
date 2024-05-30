import type { KendoPage } from '@/src/payload-types';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dayjs from 'dayjs';
import React from 'react';

interface OwnProps {
  kendoClasses: KendoPage['kendoClasses'];
}
export const ClassesArea = (props: OwnProps) => {
  const { kendoClasses } = props;

  const kendoClassList = kendoClasses.map((kendoClass) => {
    const { classSchedule, description_html, title } = kendoClass;
    return (
      <Card className="w-full lg:max-w-[90vw]" key={`kendo-classes-${title}`}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="pb-4">
            {classSchedule.map((schedule) => {
              const { endTime, startTime, title } = schedule;
              const startTimeHM = dayjs(new Date(startTime)).format('h.mm A');
              const endTimeHM = endTime
                ? dayjs(new Date(endTime)).format('h.mm A')
                : undefined;
              const timeStr = `${startTimeHM}${endTimeHM ? ` - ${endTimeHM}` : ''}`;
              return (
                <h3 className="font-bold text-accent">
                  <span>{title}: </span>
                  <span className="inline-block">{timeStr}</span>
                </h3>
              );
            })}
          </div>
          <div dangerouslySetInnerHTML={{ __html: description_html ?? '' }} />
        </CardContent>
      </Card>
    );
  });

  return (
    <div className="flex flex-col gap-4 lg:flex-row">{kendoClassList}</div>
  );
};
