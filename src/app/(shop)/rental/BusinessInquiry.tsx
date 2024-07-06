'use server';
import { ContactArea } from '../../(marketing)/contact/ContactArea';
import { getGeneralDetails } from '../../_data-access/server';

export const BusinessInquiry = async () => {
  const { email } = await getGeneralDetails();

  return (
    <div>
      {/* TODO: Refactor or relocate ContactArea to be reused properly */}
      <ContactArea email={email} />
    </div>
  );
};
