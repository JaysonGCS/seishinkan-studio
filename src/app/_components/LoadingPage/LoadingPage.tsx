import React from 'react';

import { LoadingSkeleton } from '../LoadingSkeleton/LoadingSkeleton';

export const LoadingPage = () => {
  return (
    <main className="flex justify-center">
      <div className="w-5/6 py-5 lg:w-6/12">
        <LoadingSkeleton count={10} />
      </div>
    </main>
  );
};
