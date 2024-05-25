import { DisabledPage } from '../../_components/DisabledPage/DisabledPage';
import { getPageDetails } from '../../_data-access/PageDetails';
import { MainPage } from '../../_utils/Paths';
import { MemberPage } from './MemberPage';

const PAGE_KEY = MainPage.MEMBER;

const Page = async () => {
  const pageDetails = await getPageDetails(PAGE_KEY);
  const { enabled: isEnabled } = pageDetails;

  if (!isEnabled) {
    return <DisabledPage />;
  }

  return (
    <main>
      <MemberPage />
    </main>
  );
};

export default Page;
