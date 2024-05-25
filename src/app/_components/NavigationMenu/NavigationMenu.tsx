'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAtomValue, useSetAtom } from 'jotai';
import { CircleUserRound, LogOut, Swords, UserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';

import { LoginStatus, loginStateAtom } from '../../_atoms/UserLoginAtoms';
import { SSK_WEB_LOGIN_STATUS_HEADER } from '../../_utils/Constants';
import { getCookie } from '../../_utils/General';
import {
  MainPage,
  OtherPage,
  isMainPage,
  pageToAnchor,
} from '../../_utils/Paths';
import { MobileNavigationMenu } from './MobileNavigationMenu';
import { NavigationLink } from './NavigationLink';

export const NavigationMenu = () => {
  const currentPath = usePathname();
  const activePage = isMainPage(currentPath) ? currentPath : MainPage.HOME;
  const setLoginState = useSetAtom(loginStateAtom);

  useEffect(() => {
    // TODO: research to see if this can be replaced with jotai effects
    const loginStatusCookie = getCookie(SSK_WEB_LOGIN_STATUS_HEADER);
    if (loginStatusCookie === String(true)) {
      setLoginState(LoginStatus.LOGGED_IN);
    }
  }, [setLoginState]);

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
      <nav className="hidden items-center justify-between border-b-2 border-b-accent bg-background px-5 py-2 text-foreground md:flex md:h-navigation-menu-md lg:h-navigation-menu-large">
        <Link
          className="flex items-center md:text-sm lg:text-lg"
          href={MainPage.HOME}
        >
          誠心館
        </Link>
        <ul className="flex gap-5">
          <LinkList activePage={activePage} isMobileView={false} />
        </ul>
        <AccountNavigationMenu />
      </nav>
    </React.Fragment>
  );
};

const AccountNavigationMenu = () => {
  const loginState = useAtomValue(loginStateAtom);
  const router = useRouter();
  const currentPath = usePathname();
  const activePage = isMainPage(currentPath) ? currentPath : MainPage.HOME;

  const handleProfileSelect = useCallback(() => {
    // TODO
  }, []);

  const handleKendoMemberPageSelect = useCallback(() => {
    if (activePage === MainPage.MEMBER) {
      return;
    }
    router.push(MainPage.MEMBER);
    router.refresh();
  }, [activePage, router]);

  const handleLogout = useCallback(async () => {
    // TODO: move to _data-access
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/logout`, {
      method: 'GET',
    });
    router.push(OtherPage.LOGOUT);
  }, [router]);

  return (
    <React.Fragment>
      {loginState === LoginStatus.LOGGED_IN ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <CircleUserRound className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={handleProfileSelect}>
                <UserRound className="mr-2 size-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleKendoMemberPageSelect}>
                <Swords className="mr-2 size-4" />
                <span>Kendo Member Page</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleLogout}>
              <LogOut className="mr-2 size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          className="flex items-center hover:text-accent md:text-sm lg:text-lg"
          href={MainPage.LOGIN}
        >
          Login
        </Link>
      )}
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
            href: `${MainPage.KENDO}/${pageToAnchor[MainPage.KENDO].introduction}`,
          },
          {
            name: 'Classes',
            activeHref: activePage,
            href: `${MainPage.KENDO}/${pageToAnchor[MainPage.KENDO].classes}`,
          },
          {
            name: 'FAQ',
            activeHref: activePage,
            href: `${MainPage.KENDO}/${pageToAnchor[MainPage.KENDO].faq}`,
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
