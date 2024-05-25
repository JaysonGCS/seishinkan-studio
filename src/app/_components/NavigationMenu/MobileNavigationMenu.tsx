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
import { MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { MainPage } from '../../_utils/Paths';

interface OwnProps {
  className?: string;
}

export const MobileNavigationMenu = (
  props: React.PropsWithChildren<OwnProps>,
) => {
  const { children, className } = props;
  const [open, setOpen] = useState(false);

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
            <DrawerHeader className="flex flex-row items-center justify-between">
              <DrawerTitle className="text-foreground">Menu</DrawerTitle>
              <DrawerClose asChild>
                <X className="bg-background text-foreground hover:cursor-pointer hover:text-accent/90" />
              </DrawerClose>
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
              <DrawerClose asChild>
                <Link href={MainPage.LOGIN}>
                  <Button className="w-full" variant="default">
                    Login
                  </Button>
                </Link>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
