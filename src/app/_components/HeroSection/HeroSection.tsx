'use client';
import type { Media } from '@/src/payload-types';

import { MediaConstant } from '@/src/Constants';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useMemo } from 'react';

import type { StandardWindowSize } from '../../_hooks/useWindowSize';

import { useWindowSize } from '../../_hooks/useWindowSize';
import { isNotNil } from '../../_utils/General';

interface OwnProps {
  isMainHero?: boolean;
  media: Media;
}

const DEFAULT_HALF_HERO_HEIGHT = MediaConstant.halfHero.height / 2;
const DEFAULT_MOBILE_HERO_HEIGHT = MediaConstant.mobileHero.height / 4;

export const HeroSection = (props: OwnProps) => {
  const { isMainHero = false, media } = props;
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
    isNotNil(mobileHeroUrl) && isNotNil(halfHeroUrl) && isNotNil(heroUrl) ? (
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
      {heroImageComponent}
    </div>
  );
};
