import type { Metadata } from 'next';

import { DisabledPage } from '../../_components/DisabledPage/DisabledPage';
import { getPageDetails } from '../../_data-access/PageDetails';
import { getSeoMetadata } from '../../_data-access/SeoMetadata';
import { MainPage } from '../../_utils/Paths';

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
  return <main>News and Articles</main>;
};

export default NewsAndArticlesPage;
