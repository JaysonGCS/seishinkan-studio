'use server';

import Image from 'next/image';

import { getSocialMedia } from '../../_data-access/server';

const DEFAULT_LOGO_WIDTH = 25;
const DEFAULT_LOGO_HEIGHT = 25;

export const Footer = async () => {
  const socialMedia = await getSocialMedia();

  return (
    <footer className="prose prose-invert absolute bottom-0 flex h-footer w-full max-w-none flex-col content-evenly items-center justify-between bg-background px-5 py-3 text-center">
      <span className="prose-base lg:prose-lg">誠心館</span>
      <div className="flex flex-row gap-5">
        {socialMedia.facebookUrl ? (
          <a
            href={socialMedia.facebookUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="Facebook logo"
              height={DEFAULT_LOGO_HEIGHT}
              src="/facebook_logo.svg"
              width={DEFAULT_LOGO_WIDTH}
            />
          </a>
        ) : null}
        {socialMedia.instagramUrl ? (
          <a
            href={socialMedia.instagramUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="Instagram logo"
              height={DEFAULT_LOGO_HEIGHT}
              src="/instagram_logo.svg"
              width={DEFAULT_LOGO_WIDTH}
            />
          </a>
        ) : null}
        {socialMedia.youtubeUrl ? (
          <a
            href={socialMedia.youtubeUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt="YouTube logo"
              height={DEFAULT_LOGO_HEIGHT}
              src="/youtube_logo.svg"
              width={DEFAULT_LOGO_WIDTH}
            />
          </a>
        ) : null}
      </div>
      <div className="py-1 text-xs lg:prose-sm">
        <span>© 2024 Seishinkan Studio • Built with </span>
        <span>
          <span
            aria-label="love emoji"
            className="absolute animate-ping opacity-75"
            role="img"
          >
            ❤️
          </span>
          <span aria-label="love emoji" role="img">
            ❤️
          </span>
        </span>
        <span> by </span>
        <a
          className="font-bold hover:bg-teal-500"
          href="https://github.com/JaysonGCS"
          rel="noreferrer"
          target="_blank"
        >
          Jayson GCS
        </a>
      </div>
    </footer>
  );
};
