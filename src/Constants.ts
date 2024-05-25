type MediaSize = {
  height: number;
  width: number;
};

type MediaSizeMapping = {
  card: MediaSize;
  halfHero: MediaSize;
  hero: Partial<Pick<MediaSize, 'height'>> & Pick<MediaSize, 'width'>;
  mobileHero: MediaSize;
  thumbnail: MediaSize;
};

export const MediaConstant: MediaSizeMapping = {
  // 4:3
  thumbnail: { height: 300, width: 400 },
  // 3:4
  card: {
    height: 1024,
    width: 768,
  },
  // 21:9
  mobileHero: {
    height: 720,
    width: 1680,
  },
  // 21:9
  halfHero: {
    height: 823,
    width: 1920,
  },
  hero: { height: undefined, width: 3840 },
};
