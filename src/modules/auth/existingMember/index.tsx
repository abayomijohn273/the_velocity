'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AuthLayout from '@/modules/auth/components/authLayout';
import EmailStepForm from '@/modules/auth/components/emailStepForm';
import { useExistingMember } from '@/hooks/auth';
import { getErrorMessage } from '@/lib/api/formErrors';
import { routes } from '@/lib/constants/routes';
import type { EmailOnlyInput } from '@/lib/validation/auth';

const ExistingMember = () => {
  const router = useRouter();
  const existingMember = useExistingMember();

  const onValid = ({ email }: EmailOnlyInput) => {
    existingMember.mutate(
      { email },
      {
        onSuccess: (data) => {
          toast.success('We sent a 6-digit code to your email.');
          router.push(
            `${routes.verifyOtp}?email=${encodeURIComponent(data.email)}&purpose=member_activation`
          );
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      }
    );
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your email to activate your membership"
      imagePosition="right"
    >
      <EmailStepForm submitLabel="Continue" loading={existingMember.isPending} onValid={onValid} />
      <p className="mt-6 text-sm text-gray-600">
        New here?{' '}
        <Link href={routes.signup} className="font-semibold text-black underline">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ExistingMember;
