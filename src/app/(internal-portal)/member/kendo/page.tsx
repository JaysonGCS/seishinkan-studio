import { DisabledPage } from '@/src/app/_components/DisabledPage/DisabledPage';
import { getPageDetails } from '@/src/app/_data-access/server';
import { MainPage } from '@/src/app/_utils/Paths';

import { KendoMemberPage } from './KendoMemberPage';

const PAGE_KEY = MainPage.MEMBER;

const Page = async () => {
  const pageDetails = await getPageDetails(PAGE_KEY);
  const { enabled: isEnabled } = pageDetails;

  if (!isEnabled) {
    return <DisabledPage />;
  }

  return (
    <main>
      <KendoMemberPage />
    </main>
  );
};

export default Page;
