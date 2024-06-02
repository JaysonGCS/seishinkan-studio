import type { Metadata } from 'next';

import React from 'react';

import { DisabledPage } from '../../_components/DisabledPage/DisabledPage';
import { HeroSection } from '../../_components/HeroSection/HeroSection';
import { Section } from '../../_components/Section/Section';
import { getPageDetails } from '../../_data-access/PageDetails';
import { getSeoMetadata } from '../../_data-access/SeoMetadata';
import { MainPage } from '../../_utils/Paths';
import { LatestPostsArea } from './LatestPostsArea';
import { PinnedPostsArea } from './PinnedPostsArea';

const PAGE_KEY = MainPage.NEWS_AND_ARTICLES;

export async function generateMetadata(): Promise<Metadata> {
  const { description, title } = await getSeoMetadata(PAGE_KEY);
  return {
    description,
    title,
  };
}

const NewsAndArticlesPage = async () => {
  const pageDetails = await getPageDetails(PAGE_KEY);
  const { enabled: isEnabled } = pageDetails;

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
      <Section>
        <div className="w-full px-8 py-14 lg:px-14">
          <h1 className="pb-8">Pinned Posts</h1>
          <PinnedPostsArea posts={pageDetails.pinnedArticles} />
        </div>
      </Section>
      <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-foreground md:my-10" />
      <Section>
        <div className="w-full px-8 pb-14 lg:px-14">
          <h1 className="pb-8">Latest Posts</h1>
          <LatestPostsArea />
        </div>
      </Section>
    </main>
  );
};

export default NewsAndArticlesPage;
