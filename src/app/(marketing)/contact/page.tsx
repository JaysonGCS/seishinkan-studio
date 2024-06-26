import type { Metadata } from 'next';

import { Mail, MapPinned } from 'lucide-react';
import React from 'react';

import { DisabledPage } from '../../_components/DisabledPage/DisabledPage';
import { HeroSection } from '../../_components/HeroSection/HeroSection';
import { Section } from '../../_components/Section/Section';
import {
  getGeneralDetails,
  getPageDetails,
  getSeoMetadata,
} from '../../_data-access/server';
import { DEFAULT_ENQUIRY_EMAIL_TITLE } from '../../_utils/Constants';
import { MainPage } from '../../_utils/Paths';
import { ContactArea } from './ContactArea';

const PAGE_KEY = MainPage.CONTACT;

export async function generateMetadata(): Promise<Metadata> {
  const { description, title } = await getSeoMetadata(PAGE_KEY);
  return {
    description,
    title,
  };
}

const ContactPage = async () => {
  const pageDetails = await getPageDetails(PAGE_KEY);
  const { address, email } = await getGeneralDetails();
  const { enabled: isEnabled, googleMapEmbededLink } = pageDetails;

  if (!isEnabled) {
    return <DisabledPage />;
  }
  const heroImage = pageDetails.heroImage;

  const showHeroSection = !(
    typeof heroImage === 'number' || heroImage === undefined
  );
  return (
    <main>
      {showHeroSection ? <HeroSection media={heroImage} /> : null}
      <Section title="Contact Us">
        <div className="flex w-5/6 flex-col items-center gap-10 lg:w-screen lg:flex-row lg:justify-evenly lg:gap-5">
          <ContactArea email={email} />
          <div className="flex flex-col gap-3 text-sm md:text-base">
            <a
              className="flex w-fit flex-row gap-2 underline hover:text-accent/90"
              href={`mailto:${email}?subject=${DEFAULT_ENQUIRY_EMAIL_TITLE}`}
            >
              <Mail />
              <span>{email}</span>
            </a>
            <div className="flex flex-row gap-2">
              <MapPinned />
              <span>{address}</span>
            </div>
            <iframe
              allowFullScreen={false}
              className="h-[300px] w-full lg:h-[315px] lg:w-[45vw]"
              id="contact-page-location-iframe"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={googleMapEmbededLink}
              title="Seishinkan Studio Location"
            />
          </div>
        </div>
      </Section>
    </main>
  );
};

export default ContactPage;
