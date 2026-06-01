'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import AuthLayout from '@/modules/auth/components/authLayout';
import SetPasswordForm from '@/modules/auth/components/setPasswordForm';
import { useResetPassword } from '@/hooks/auth';
import { getErrorMessage } from '@/lib/api/formErrors';
import { routes } from '@/lib/constants/routes';
import type { SetPasswordFormInput } from '@/lib/validation/auth';

const ResetPassword = () => {
  const router = useRouter();
  const token = useSearchParams().get('token') ?? '';
  const resetPassword = useResetPassword();

  const onValid = (values: SetPasswordFormInput) => {
    resetPassword.mutate(
      { token, ...values },
      {
        onSuccess: () => {
          toast.success('Password reset. Please log in.');
          router.replace(routes.login);
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      }
    );
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Choose a new password for your account"
      imagePosition="left"
    >
      <SetPasswordForm
        submitLabel="Reset password"
        loading={resetPassword.isPending}
        onValid={onValid}
      />
    </AuthLayout>
  );
};

export default ResetPassword;
