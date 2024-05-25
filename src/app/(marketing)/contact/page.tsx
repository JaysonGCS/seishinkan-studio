import type { Metadata } from 'next';

import { ContactForm } from '../../_components/ContactForm/ContactForm';
import { DisabledPage } from '../../_components/DisabledPage/DisabledPage';
import { Section } from '../../_components/Section/Section';
import { getPageDetails } from '../../_data-access/PageDetails';
import { getSeoMetadata } from '../../_data-access/SeoMetadata';
import { MainPage } from '../../_utils/Paths';

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
  const { enabled: isEnabled, googleMapEmbededLink } = pageDetails;

  if (!isEnabled) {
    return <DisabledPage />;
  }
  return (
    <main>
      <Section title="Contact Us">
        <div className="flex w-5/6 flex-col items-center gap-5 lg:w-screen lg:flex-row lg:justify-evenly lg:gap-5">
          <ContactForm
            className="w-full max-w-[600px] lg:w-[45vw]"
            // TODO: update email and title
            fallback={{ emailAddress: '', emailTitle: '' }}
          />
          <div>
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
