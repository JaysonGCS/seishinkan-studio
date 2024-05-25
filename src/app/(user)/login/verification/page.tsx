'use server';

import { DisabledPage } from '../../../_components/DisabledPage/DisabledPage';
import { isPageEnabled } from '../../../_data-access/PageValidation';
import { MainPage } from '../../../_utils/Paths';
import { VerificationPage } from './VerificationPage';

const Page = async () => {
  const isEnabled = await isPageEnabled(MainPage.LOGIN);

  if (!isEnabled) {
    return <DisabledPage />;
  }

  return (
    <main className="flex justify-center py-5">
      <VerificationPage />
    </main>
  );
};

export default Page;
