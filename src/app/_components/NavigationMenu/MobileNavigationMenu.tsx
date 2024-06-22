'use client';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useAtomValue } from 'jotai';
import { LogOut, MenuIcon, Swords, UserRound, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';

import { LoginStatus, loginStateAtom } from '../../_atoms/UserLoginAtoms';
import { InternalPortalPage, MainPage, OtherPage } from '../../_utils/Paths';

interface OwnProps {
  className?: string;
}

export const MobileNavigationMenu = (
  props: React.PropsWithChildren<OwnProps>,
) => {
  const { children, className } = props;
  const [open, setOpen] = useState(false);
  const loginState = useAtomValue(loginStateAtom);
  const router = useRouter();
  const currentPath = usePathname();

  const handleLogout = useCallback(async () => {
    // TODO: move to _data-access
    await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/logout`, {
      method: 'GET',
    });
    router.push(OtherPage.LOGOUT);
  }, [router]);

  const handleProfileSelect = useCallback(() => {
    if (currentPath === MainPage.MEMBER.toString()) {
      return;
    }
    router.push(MainPage.MEMBER);
    router.refresh();
  }, [currentPath, router]);

  const handleKendoMemberPageSelect = useCallback(() => {
    if (currentPath === InternalPortalPage.KENDO_MEMBER.toString()) {
      return;
    }
    router.push(InternalPortalPage.KENDO_MEMBER);
    router.refresh();
  }, [currentPath, router]);

  return (
    <div className={className}>
      <Drawer direction="right" onOpenChange={setOpen} open={open}>
        <DrawerTrigger asChild>
          <Button
            className="border-none bg-background hover:bg-background hover:text-accent/90"
            variant="outline"
          >
            <MenuIcon className="bg-background" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="w-full overflow-y-auto overflow-x-hidden">
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <div className="flex flex-row items-center justify-between">
                <DrawerTitle className="text-foreground">Menu</DrawerTitle>
                <DrawerClose asChild>
                  <X className="bg-background text-foreground hover:cursor-pointer hover:text-accent/90" />
                </DrawerClose>
              </div>
              {loginState === LoginStatus.LOGGED_IN ? (
                <div className="flex flex-col border-b-2">
                  <DrawerClose>
                    <Button
                      className="flex w-full flex-row justify-start"
                      onClick={handleProfileSelect}
                      variant="link"
                    >
                      <UserRound className="mr-2 size-4" />
                      <span>Profile</span>
                    </Button>
                  </DrawerClose>
                  <DrawerClose>
                    <Button
                      className="flex w-full flex-row justify-start"
                      onClick={handleKendoMemberPageSelect}
                      variant="link"
                    >
                      <Swords className="mr-2 size-4" />
                      <span>Kendo Member Page</span>
                    </Button>
                  </DrawerClose>
                </div>
              ) : null}
            </DrawerHeader>
            <ul
              className="flex flex-col gap-3 p-4 py-0 text-foreground"
              onClickCapture={(e) => {
                if (
                  e.target instanceof HTMLButtonElement ||
                  e.target instanceof SVGPathElement
                ) {
                  // Since there is no way to stop propagation at the moment, assume that if it is a button/path element, we do not want to close the drawer
                  return;
                }
                setOpen(false);
              }}
            >
              {children}
            </ul>
            <DrawerFooter>
              {loginState !== LoginStatus.LOGGED_IN ? (
                <DrawerClose asChild>
                  <Link href={MainPage.LOGIN}>
                    <Button className="w-full" variant="default">
                      Login
                    </Button>
                  </Link>
                </DrawerClose>
              ) : (
                <DrawerClose asChild>
                  <Button className="w-full" onClick={handleLogout}>
                    <LogOut className="mr-2 size-4" />
                    <span>Log out</span>
                  </Button>
                </DrawerClose>
              )}
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
