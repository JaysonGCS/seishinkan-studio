type MediaSize = {
  height: number;
  width: number;
};

type MediaSizeMapping = {
  card: MediaSize;
  halfHero: MediaSize;
  hero: Partial<Pick<MediaSize, 'height'>> & Pick<MediaSize, 'width'>;
  heroCard: MediaSize;
  mobileHero: MediaSize;
  thumbnail: MediaSize;
};

type ProfileMediaSizeMapping = {
  profile: MediaSize;
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
  // 16:9
  heroCard: {
    height: 2160,
    width: 3840,
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

export const ProfileMediaConstant: ProfileMediaSizeMapping = {
  profile: { height: 1920, width: 1920 },
  thumbnail: {
    height: 400,
    width: 400,
  },
};
