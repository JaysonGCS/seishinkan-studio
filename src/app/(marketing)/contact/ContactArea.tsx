'use client';
import React, { useCallback, useRef, useState } from 'react';

import type { CaptchaInnerFunctions } from '../../_components/Captcha/Captcha';

import { Captcha } from '../../_components/Captcha/Captcha';
import { ContactForm } from '../../_components/ContactForm/ContactForm';
import { DEFAULT_ENQUIRY_EMAIL_TITLE } from '../../_utils/Constants';

interface OwnProps {
  email: string;
}
export const ContactArea = (props: OwnProps) => {
  const { email } = props;
  const [token, setToken] = useState<null | string>(null);
  const captchaApiRef = useRef<CaptchaInnerFunctions>(null);

  const handleVerify = useCallback((token: string) => {
    setToken(token);
  }, []);

  const handleExpired = useCallback(() => {
    setToken(null);
  }, []);

  const handleTokenValidationFailed = useCallback(() => {
    captchaApiRef.current?.reset();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <ContactForm
        className="w-full max-w-[600px] lg:w-[45vw]"
        fallback={{
          emailAddress: email,
          emailTitle: DEFAULT_ENQUIRY_EMAIL_TITLE,
        }}
        onTokenValidationFailed={handleTokenValidationFailed}
        token={token}
      />
      <Captcha
        onExpired={handleExpired}
        onVerify={handleVerify}
        ref={captchaApiRef}
        refreshExpiredMode="manual"
        sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY ?? ''}
      />
    </div>
  );
};
