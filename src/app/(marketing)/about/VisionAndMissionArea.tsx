import React from 'react';

interface OwnProps {
  missionDescription: string;
  visionDescription: string;
}
export const VisionAndMissionArea = (props: OwnProps) => {
  const { missionDescription, visionDescription } = props;
  return (
    <div className="flex w-full flex-col gap-14 px-8 lg:px-14">
      <div className="flex flex-col gap-4">
        <h1>Vision</h1>
        <p>{visionDescription}</p>
      </div>
      <div className="flex flex-col gap-4">
        <h1>Mission</h1>
        <p>{missionDescription}</p>
      </div>
    </div>
  );
};
