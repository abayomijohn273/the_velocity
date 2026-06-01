'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AuthLayout from '@/modules/auth/components/authLayout';
import EmailStepForm from '@/modules/auth/components/emailStepForm';
import { useForgotPassword } from '@/hooks/auth';
import { getErrorMessage } from '@/lib/api/formErrors';
import { routes } from '@/lib/constants/routes';
import type { EmailOnlyInput } from '@/lib/validation/auth';

const ForgotPassword = () => {
  const router = useRouter();
  const forgotPassword = useForgotPassword();

  const onValid = ({ email }: EmailOnlyInput) => {
    forgotPassword.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success('If that email exists, a code is on its way.');
          router.push(
            `${routes.verifyOtp}?email=${encodeURIComponent(email)}&purpose=password_reset`
          );
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      }
    );
  };

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="Enter your email and we’ll send you a reset code"
      imagePosition="left"
    >
      <EmailStepForm
        submitLabel="Send reset code"
        loading={forgotPassword.isPending}
        onValid={onValid}
      />
      <p className="mt-6 text-sm text-gray-600">
        Remembered it?{' '}
        <Link href={routes.login} className="font-semibold text-black underline">
          Back to login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPassword;
