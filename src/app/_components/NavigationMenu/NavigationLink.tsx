'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

import styles from './NavigationLink.module.css';

const DEFAULT_DOWN_ARROW_SIZE = 15;

export interface LinkDetail {
  activeHref: string;
  href: string;
  isMobileView?: boolean;
  linkDetails?: LinkDetail[];
  name: string;
}

export const NavigationLink = (props: LinkDetail) => {
  const { activeHref, isMobileView = false } = props;
  const [selectedParent, setSelectedParent] = useState<string | undefined>(
    undefined,
  );

  const linkDetailsProp = useMemo(() => {
    return [props];
  }, [props]);

  const handleMobileButtonClick = useCallback((name: string) => {
    setSelectedParent((prev) => {
      return prev === name ? undefined : name;
    });
  }, []);

  const getLinkDetails = useCallback(
    (
      linkDetails: LinkDetail[] | undefined,
      isNested: boolean,
      parentName?: string,
    ) => {
      const hasNestedChildren = !(
        linkDetails === undefined || linkDetails.length === 0
      );
      const generateLinkElements = () => {
        if (!hasNestedChildren) {
          return null;
        }
        return linkDetails.map((link) => {
          const hasNestedLinks: boolean = link.linkDetails !== undefined;
          const isActive = activeHref === link.href;
          return (
            <li
              className={clsx({
                'bg-background px-2': isNested,
                hidden:
                  isMobileView &&
                  parentName !== undefined &&
                  parentName !== selectedParent,
                [styles.link]: !isMobileView,
              })}
              key={`${NavigationLink.name}-${link.href}`}
            >
              {isMobileView && !isNested ? (
                <button
                  className={clsx(
                    'flex items-center gap-1 p-1 hover:text-accent/90 [&>*]:hover:fill-accent/90',
                    {
                      'text-accent': isActive,
                    },
                  )}
                  onClick={() => handleMobileButtonClick(link.name)}
                  type="button"
                >
                  {link.name}
                  {hasNestedLinks ? (
                    <DropdownArrowIcon isActive={isActive} />
                  ) : null}
                </button>
              ) : (
                <Link
                  className={clsx(
                    'hover:text-accent/90 [&>*]:hover:fill-accent/90',
                    'flex items-center gap-1 p-1',
                    'md:text-sm lg:text-lg',
                    {
                      'text-accent': isActive,
                    },
                  )}
                  href={link.href}
                >
                  {link.name}
                  {hasNestedLinks ? (
                    <DropdownArrowIcon isActive={isActive} />
                  ) : null}
                </Link>
              )}
              {getLinkDetails(link.linkDetails, true, link.name)}
            </li>
          );
        });
      };
      return (
        <ConditionalWrapper
          isMobileView={isMobileView}
          shouldWrapAsList={hasNestedChildren && isNested}
        >
          {generateLinkElements()}
        </ConditionalWrapper>
      );
    },
    [activeHref, handleMobileButtonClick, isMobileView, selectedParent],
  );
  return getLinkDetails(linkDetailsProp, false);
};

const ConditionalWrapper = ({ children, isMobileView, shouldWrapAsList }) => {
  return shouldWrapAsList ? (
    <ul className={clsx({ 'absolute z-10': !isMobileView })}>{children}</ul>
  ) : (
    children
  );
};

const DropdownArrowIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <svg
      className={isActive ? 'fill-accent' : 'fill-foreground'}
      height={DEFAULT_DOWN_ARROW_SIZE}
      viewBox="0 0 512 512"
      width={DEFAULT_DOWN_ARROW_SIZE}
    >
      <path d="M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z" />
    </svg>
  );
};
