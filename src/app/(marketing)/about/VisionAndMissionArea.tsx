import React from 'react';

interface OwnProps {
  missionDescription: string;
  visionDescription: string;
}
export const VisionAndMissionArea = (props: OwnProps) => {
  const { missionDescription, visionDescription } = props;
  return (
    <div className="flex w-full flex-col gap-14 px-8 py-5 lg:p-14">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold">Vision</h1>
        <p>{visionDescription}</p>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold">Mission</h1>
        <p>{missionDescription}</p>
      </div>
    </div>
  );
};
