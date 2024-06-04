import React from 'react';

import { LoadingSkeleton } from '../LoadingSkeleton/LoadingSkeleton';

export const LoadingPage = () => {
  return (
    <main className="flex min-h-[calc(100vh-theme(height.navigation-menu-mobile))] justify-center bg-card pb-[theme(height.footer)] md:min-h-[calc(100vh-theme(height.navigation-menu-md))] lg:min-h-[calc(100vh-theme(height.navigation-menu-large))]">
      <div className="w-5/6 py-5 lg:w-6/12">
        <LoadingSkeleton count={20} />
      </div>
    </main>
  );
};
