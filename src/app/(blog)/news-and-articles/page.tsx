'use server';
import type { Metadata } from 'next';

import { Newspaper, Pin } from 'lucide-react';
import React from 'react';

import { DEFAULT_INITIAL_PAGE_COUNTER } from '../../_atoms/ArticleAtoms';
import { DisabledPage } from '../../_components/DisabledPage/DisabledPage';
import { HeroSection } from '../../_components/HeroSection/HeroSection';
import { Section } from '../../_components/Section/Section';
import {
  getAllArticlesExcludePinned,
  getPageDetails,
  getSeoMetadata,
} from '../../_data-access/server';
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
          <h1 className="flex items-center gap-2 pb-8">
            <Pin size={20} />
            <span>Pinned Posts</span>
          </h1>
          <PostsArea posts={pageDetails.pinnedArticles} />
        </div>
      </Section>
      <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-foreground md:my-10" />
      <Section>
        <div className="w-full px-8 pb-14 lg:px-14">
          <h1 className="flex items-center gap-2 pb-8">
            <Newspaper size={20} />
            <span>Latest Posts</span>
          </h1>
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
