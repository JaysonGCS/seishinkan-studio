import { Toaster } from '@/components/ui/toaster';
import React, { Suspense } from 'react';

import { Footer } from './_components/Footer/Footer';
import { LoadingPage } from './_components/LoadingPage/LoadingPage';
import { NavigationMenu } from './_components/NavigationMenu/NavigationMenu';
import { font } from './_utils/Fonts';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} relative min-h-screen antialiased`}>
        <NavigationMenu />
        <Suspense fallback={<LoadingPage />}>
          <div className="min-h-[calc(100vh-theme(height.navigation-menu-mobile))] bg-card pb-[theme(height.footer)] md:min-h-[calc(100vh-theme(height.navigation-menu-md))] lg:min-h-[calc(100vh-theme(height.navigation-menu-large))]">
            {children}
          </div>
        </Suspense>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
