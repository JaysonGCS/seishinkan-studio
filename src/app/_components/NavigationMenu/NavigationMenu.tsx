'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { MainPage, isMainPage } from '../../_utils/Paths';
import { MobileNavigationMenu } from './MobileNavigationMenu';
import { NavigationLink } from './NavigationLink';

export const NavigationMenu = () => {
  const currentPath = usePathname();
  const activePage = isMainPage(currentPath) ? currentPath : MainPage.HOME;

  return (
    <React.Fragment>
      <nav className="flex h-navigation-menu-mobile flex-row justify-between border-b-2 border-b-accent bg-background text-foreground md:hidden">
        <Link
          className="flex items-center px-4 md:text-sm lg:text-lg"
          href={MainPage.HOME}
        >
          誠心館
        </Link>
        <MobileNavigationMenu>
          <LinkList activePage={activePage} isMobileView />
        </MobileNavigationMenu>
      </nav>
      <nav className="hidden justify-between border-b-2 border-b-accent bg-background px-5 py-2 text-foreground md:flex md:h-navigation-menu-md lg:h-navigation-menu-large">
        <Link
          className="flex items-center md:text-sm lg:text-lg"
          href={MainPage.HOME}
        >
          誠心館
        </Link>
        <ul className="flex gap-5">
          <LinkList activePage={activePage} isMobileView={false} />
        </ul>
        <Link
          className="flex items-center hover:text-accent md:text-sm lg:text-lg"
          href={MainPage.LOGIN}
        >
          Login
        </Link>
      </nav>
    </React.Fragment>
  );
};

const LinkList = ({
  activePage,
  isMobileView,
}: {
  activePage: MainPage;
  isMobileView: boolean;
}) => {
  return (
    <React.Fragment>
      <NavigationLink
        activeHref={activePage}
        href={MainPage.HOME}
        name="Home"
      />
      <NavigationLink
        activeHref={activePage}
        href={MainPage.ABOUT}
        name="About"
      />
      <NavigationLink
        activeHref={activePage}
        href={MainPage.NEWS_AND_ARTICLES}
        name="News & Articles"
      />
      <NavigationLink
        activeHref={activePage}
        href={MainPage.KENDO}
        isMobileView={isMobileView}
        linkDetails={[
          {
            name: 'Introduction',
            activeHref: activePage,
            href: '/kendo/#introduction',
          },
          {
            name: 'Classes',
            activeHref: activePage,
            href: '/kendo/#kendo-classes',
          },
          {
            name: 'FAQ',
            activeHref: activePage,
            href: '/kendo/#faq',
          },
        ]}
        name="Kendo"
      />
      <NavigationLink
        activeHref={activePage}
        href={MainPage.RENTAL}
        name="Studio Rental"
      />
      <NavigationLink
        activeHref={activePage}
        href={MainPage.CONTACT}
        name="Contact"
      />
    </React.Fragment>
  );
};
