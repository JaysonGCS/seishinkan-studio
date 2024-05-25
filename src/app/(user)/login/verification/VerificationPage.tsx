'use client';

import { toast } from '@/components/ui/use-toast';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { LoadingSkeleton } from '../../../_components/LoadingSkeleton/LoadingSkeleton';
import { TOAST_ERROR_DURATION } from '../../../_utils/Constants';

type TVerificationStatus = 'FAILURE' | 'PROGRESS' | 'SUCCESS';

export const VerificationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [verificationStatus, setVerificationStatus] =
    useState<TVerificationStatus>('PROGRESS');

  useEffect(() => {
    if (token === null) {
      setVerificationStatus('FAILURE');
    } else if (verificationStatus === 'PROGRESS' && token !== null) {
      const verifyAccount = async () => {
        const resp = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/verification`,
          {
            body: JSON.stringify({ token }),
            method: 'POST',
          },
        );
        if (resp.status !== 200) {
          const { message } = await resp.json();
          toast({
            description: message,
            duration: TOAST_ERROR_DURATION,
            title: 'Something went wrong.',
            variant: 'destructive',
          });
          throw new Error(message);
        }
      };
      verifyAccount()
        .then(() => {
          setVerificationStatus('SUCCESS');
        })
        .catch(() => {
          setVerificationStatus('FAILURE');
        });
    }
  }, [token, verificationStatus]);

  return (
    <React.Fragment>
      {verificationStatus === 'PROGRESS' ? (
        <div className="w-5/6 lg:w-6/12 ">
          <LoadingSkeleton count={10} />
        </div>
      ) : verificationStatus === 'SUCCESS' ? (
        <div>Account verified, login now.</div>
      ) : (
        <div>Unable to verify account.</div>
      )}
    </React.Fragment>
  );
};
