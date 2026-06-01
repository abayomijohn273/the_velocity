'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import AuthLayout from '@/modules/auth/components/authLayout';
import SetPasswordForm from '@/modules/auth/components/setPasswordForm';
import { useCompleteSignup } from '@/hooks/auth';
import { getErrorMessage } from '@/lib/api/formErrors';
import { routes } from '@/lib/constants/routes';
import type { SetPasswordFormInput } from '@/lib/validation/auth';

const CompleteSignup = () => {
  const router = useRouter();
  const token = useSearchParams().get('token') ?? '';
  const completeSignup = useCompleteSignup();

  const onValid = (values: SetPasswordFormInput) => {
    completeSignup.mutate(
      { token, ...values },
      {
        onSuccess: () => {
          toast.success('Password set. You can now log in.');
          router.replace(routes.login);
        },
        onError: (error) => toast.error(getErrorMessage(error)),
      }
    );
  };

  return (
    <AuthLayout
      title="Set up your password"
      subtitle="Create a password to finish activating your membership"
      imagePosition="right"
    >
      <SetPasswordForm
        submitLabel="Save password"
        loading={completeSignup.isPending}
        onValid={onValid}
      />
    </AuthLayout>
  );
};

export default CompleteSignup;
