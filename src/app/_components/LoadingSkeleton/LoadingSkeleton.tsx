import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface OwnProps {
  count?: number;
}

export const LoadingSkeleton = (props: OwnProps) => {
  const { count = 1 } = props;
  return <Skeleton count={count} />;
};
