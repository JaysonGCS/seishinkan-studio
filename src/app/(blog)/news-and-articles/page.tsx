import type { Metadata } from 'next';

import React from 'react';

import { DEFAULT_INITIAL_PAGE_COUNTER } from '../../_atoms/ArticleAtoms';
import { DisabledPage } from '../../_components/DisabledPage/DisabledPage';
import { HeroSection } from '../../_components/HeroSection/HeroSection';
import { Section } from '../../_components/Section/Section';
import { getAllArticlesExcludePinned } from '../../_data-access/Article';
import { getPageDetails } from '../../_data-access/PageDetails';
import { getSeoMetadata } from '../../_data-access/SeoMetadata';
import { MainPage } from '../../_utils/Paths';
import { LatestPostsArea } from './LatestPostsArea';
import { PostsArea } from './PostsArea';

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
  const initialPaginatedResp = await getAllArticlesExcludePinned(
    DEFAULT_INITIAL_PAGE_COUNTER,
  );
  const { docs, nextPage, prevPage, totalPages } = initialPaginatedResp;
  const showHeroSection = !(
    typeof heroImage === 'number' || heroImage === undefined
  );
  return (
    <main>
      {showHeroSection ? <HeroSection media={heroImage} /> : null}
      <Section>
        <div className="w-full px-8 py-14 lg:px-14">
          <h1 className="pb-8">Pinned Posts</h1>
          <PostsArea posts={pageDetails.pinnedArticles} />
        </div>
      </Section>
      <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-foreground md:my-10" />
      <Section>
        <div className="w-full px-8 pb-14 lg:px-14">
          <h1 className="pb-8">Latest Posts</h1>
          <LatestPostsArea
            initialArticles={docs}
            initialNextPage={nextPage}
            initialPageCounter={DEFAULT_INITIAL_PAGE_COUNTER}
            initialPrevPage={prevPage}
            totalPages={totalPages}
          />
        </div>
      </Section>
    </main>
  );
};

export default NewsAndArticlesPage;
