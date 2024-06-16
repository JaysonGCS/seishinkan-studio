import type { AboutPage, ProfileMedia } from '@/src/payload-types';

import Image from 'next/image';
import React, { useCallback } from 'react';

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
    achievements?.map((achievement) => {
      return (
        <li key={`team-section-achievement-${achievement.title}`}>
          <h3 className="my-0 text-left font-bold">{achievement.title}</h3>
          <p className="mb-0 text-left">{achievement.description}</p>
        </li>
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
        <div className="flex flex-col gap-4">
          <h2>
            <span className="font-bold">{`${name}${title ? ', ' : ''}`}</span>
            <span className="italic">{title}</span>
          </h2>
          <p className="whitespace-pre-wrap">{introduction}</p>
          <div>
            <ul>{generateAchievementList(achievements)}</ul>
          </div>
        </div>
      </div>
    );
  });
  return teamList.length > 0 ? (
    <div className="px-8 py-14 lg:px-14">{teamList}</div>
  ) : null;
};
