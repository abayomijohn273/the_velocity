'use client';

import FormButton from '@/components/ui/formButton';
import OtpInput from '@/components/ui/otpInput';
import { useResendOtp, useVerifyOtp } from '@/hooks/auth';
import { getErrorMessage } from '@/lib/api/formErrors';
import { routes } from '@/lib/constants/routes';
import AuthLayout from '@/modules/auth/components/authLayout';
import type { OtpPurpose } from '@/types/user';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const RESEND_SECONDS = 45;

const copy: Record<OtpPurpose, { title: string; subtitle: string }> = {
  email_verification: {
    title: 'Verify your email',
    subtitle: 'Enter the 6-digit code we sent to',
  },
  member_activation: {
    title: 'Confirm your membership',
    subtitle: 'Enter the 6-digit code we sent to',
  },
  password_reset: {
    title: 'Verify it’s you',
    subtitle: 'Enter the 6-digit code we sent to',
  },
};

const isPurpose = (value: string | null): value is OtpPurpose =>
  value === 'email_verification' || value === 'member_activation' || value === 'password_reset';

const VerifyOtp = () => {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get('email') ?? '';
  const purposeParam = params.get('purpose');
  const purpose: OtpPurpose = isPurpose(purposeParam) ? purposeParam : 'email_verification';

  const [code, setCode] = useState('');
  const [error, setError] = useState<string>();
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  const verify = useVerifyOtp();
  const resend = useResendOtp();

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const { title, subtitle } = useMemo(() => copy[purpose], [purpose]);

  const submit = (value: string) => {
    if (value.length !== 6) {
      setError('Enter the 6-digit code');
      return;
    }
    setError(undefined);
    verify.mutate(
      { email, purpose, code: value },
      {
        onSuccess: ({ actionToken }) => {
          toast.success('Verified successfully.');
          if (purpose === 'email_verification') {
            router.replace(routes.signupSuccess);
          } else if (purpose === 'member_activation') {
            router.replace(`${routes.completeSignup}?token=${actionToken}`);
          } else {
            router.replace(`${routes.resetPassword}?token=${actionToken}`);
          }
        },
        onError: (err) => {
          setError(getErrorMessage(err));
          toast.error(getErrorMessage(err));
        },
      }
    );
  };

  const handleResend = () => {
    resend.mutate(
      { email, purpose },
      {
        onSuccess: () => {
          toast.success('A new code is on its way.');
          setSeconds(RESEND_SECONDS);
        },
        onError: (err) => toast.error(getErrorMessage(err)),
      }
    );
  };

  return (
    <AuthLayout title={title} imagePosition="right">
      <p className="-mt-4 mb-6 text-sm text-gray-500">
        {subtitle} <span className="font-semibold text-black">{email || 'your email'}</span>
      </p>

      <div className="flex flex-col gap-6">
        <OtpInput value={code} onChange={setCode} onComplete={submit} error={error} />

        <FormButton type="button" loading={verify.isPending} onClick={() => submit(code)}>
          Verify
        </FormButton>

        <p className="text-sm text-gray-600">
          Didn’t get the code?{' '}
          {seconds > 0 ? (
            <span className="text-gray-400">Resend in {seconds}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resend.isPending}
              className="font-semibold text-secondary underline disabled:opacity-50 cursor-pointer"
            >
              Resend code
            </button>
          )}
        </p>

        <Link
          href={routes.login}
          className="text-sm font-medium text-gray-500 underline cursor-pointer"
        >
          Back to login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtp;
