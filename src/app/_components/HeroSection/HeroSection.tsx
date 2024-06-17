'use client';
import type { Media } from '@/src/payload-types';

import { MediaConstant } from '@/src/Constants';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useMemo } from 'react';

import type { StandardWindowSize } from '../../_hooks/useWindowSize';

import { useWindowSize } from '../../_hooks/useWindowSize';

interface OwnProps {
  heroBannerMessage?: null | string;
  isMainHero?: boolean;
  media: Media;
}

const DEFAULT_HALF_HERO_HEIGHT = MediaConstant.halfHero.height / 2;
const DEFAULT_MOBILE_HERO_HEIGHT = MediaConstant.mobileHero.height / 4;

const isValidHeroUrl = (value: null | string | undefined): value is string => {
  return value !== null && value !== undefined;
};

export const HeroSection = (props: OwnProps) => {
  const { heroBannerMessage, isMainHero = false, media } = props;
  const sizes = media.sizes;
  const alr = media.alt ?? '';
  const windowSize = useWindowSize();

  const minHeight = useMemo<string | undefined>(() => {
    if (windowSize === 'lg' && isMainHero) {
      return undefined;
    }
    if (windowSize === 'sm') {
      return `${DEFAULT_MOBILE_HERO_HEIGHT}px`;
    }
    return `${DEFAULT_HALF_HERO_HEIGHT}px`;
  }, [isMainHero, windowSize]);

  if (windowSize === undefined) {
    return <React.Fragment />;
  }

  const mobileHeroUrl = sizes?.mobileHero?.url;
  const halfHeroUrl = sizes?.halfHero?.url;
  const heroUrl = sizes?.hero?.url;

  const heroImageComponent =
    isValidHeroUrl(mobileHeroUrl) &&
    isValidHeroUrl(halfHeroUrl) &&
    isValidHeroUrl(heroUrl) ? (
      <Image
        alt={alr}
        fetchPriority="high"
        fill
        loader={(props) => {
          const { src } = props;
          if (src === ('sm' satisfies StandardWindowSize)) {
            return mobileHeroUrl;
          } else if (src === ('md' satisfies StandardWindowSize)) {
            return halfHeroUrl;
          } else {
            return isMainHero ? heroUrl : halfHeroUrl;
          }
        }}
        quality={100}
        sizes="100vw"
        src={windowSize}
        style={{
          objectFit: 'cover',
          // FIXME: the 30% offset is currently hard-coded, consider making it configurable
          objectPosition: '50% 30%',
        }}
      />
    ) : null;

  if (heroImageComponent === null) {
    return null;
  }

  return (
    <div
      className={clsx('relative w-screen bg-card pb-[theme(height.footer)]', {
        'lg:min-h-[calc(100vh-theme(height.navigation-menu-large))]':
          isMainHero,
      })}
      style={{ minHeight }}
    >
      {typeof heroBannerMessage === 'string' ? (
        <p className="absolute inset-x-0 left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 whitespace-pre-wrap bg-black/50 p-2 text-white md:w-fit">
          {heroBannerMessage}
        </p>
      ) : null}
      {heroImageComponent}
    </div>
  );
};
