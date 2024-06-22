'use server';
import { DisabledPage } from '../../_components/DisabledPage/DisabledPage';
import { getPageDetails } from '../../_data-access/server';
import { MainPage } from '../../_utils/Paths';
import { LoginPage } from './LoginPage';

const PAGE_KEY = MainPage.LOGIN;

// TODO: add recaptcha v3
const Page = async () => {
  const pageDetails = await getPageDetails(PAGE_KEY);
  const { allowSignup, enabled: isEnabled } = pageDetails;

  if (!isEnabled) {
    return <DisabledPage />;
  }

  return (
    <main className="flex justify-center">
      <LoginPage allowSignup={allowSignup ?? false} />
    </main>
  );
};

export default Page;
