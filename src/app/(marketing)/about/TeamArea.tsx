import type { AboutPage, ProfileMedia } from '@/src/payload-types';

import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useCallback } from 'react';

import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from '../../_components/Shadcn/Timeline';

interface OwnProps {
  team: AboutPage['team'];
}

export const TeamArea = (props: OwnProps) => {
  const { team } = props;

  const generateProfile = useCallback((profileMedia: ProfileMedia) => {
    const alt = profileMedia.alt ?? '';
    const originalUrl = profileMedia.url;
    if (typeof originalUrl === 'string') {
      return (
        <div className="flex w-full flex-col items-center md:min-w-[30vw]">
          <Image
            alt={alt}
            className="rounded-sm"
            height={500}
            quality={100}
            src={originalUrl}
            width={500}
          />
        </div>
      );
    }
    return null;
  }, []);

  // TODO: Enhance this with timeline once this PR is merged https://github.com/shadcn-ui/ui/pull/3374
  const generateAchievementList = (
    achievements: AboutPage['team'][0]['achievements'],
  ) =>
    achievements?.map((achievement, index) => {
      const parsedDate = dayjs(new Date(achievement.date)).format('MMM YYYY');
      return (
        <TimelineItem
          key={`team-section-achievement-${achievement.title}`}
          status="done"
        >
          <TimelineHeading
            className="line-clamp-none text-clip text-sm lg:text-base"
            side="left"
            variant="secondary"
          >
            {parsedDate}
          </TimelineHeading>
          <TimelineHeading
            className="line-clamp-none text-clip text-sm lg:text-base"
            side="right"
          >
            {achievement.title}
          </TimelineHeading>
          <TimelineContent side="right">
            {achievement.description}
          </TimelineContent>
          <TimelineDot status="current" />
          {index !== achievements.length - 1 && (
            <React.Fragment>
              <TimelineLine />
            </React.Fragment>
          )}
        </TimelineItem>
      );
    });

  const teamList = team.map((personDetail) => {
    const { name, achievements, introduction, profileImage, title } =
      personDetail;
    const profileMedia =
      typeof profileImage === 'number'
        ? null
        : (profileImage satisfies ProfileMedia);
    const media = profileMedia ? generateProfile(profileMedia) : null;
    return (
      <div
        className="flex flex-col gap-14 md:flex-row lg:flex-row"
        key={`about-page-profile-${personDetail.name}`}
      >
        {media}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1>
              <span className="font-bold">{`${name}${title ? ', ' : ''}`}</span>
              <span className="italic">{title}</span>
            </h1>
            <p className="whitespace-pre-wrap">{introduction}</p>
          </div>
          {achievements && achievements.length > 0 && (
            <div className="flex flex-col gap-4 ">
              <h2 className="font-bold">Achievements</h2>
              <Timeline
                className="[&>li]:grid-cols-[1fr_min-content_4fr]"
                positions="center"
              >
                {generateAchievementList(achievements)}
              </Timeline>
            </div>
          )}
        </div>
      </div>
    );
  });
  return teamList.length > 0 ? (
    <div className="px-2 py-5 lg:p-14">{teamList}</div>
  ) : null;
};
