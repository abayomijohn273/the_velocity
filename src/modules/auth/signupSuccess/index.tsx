'use client';

import { CheckCircle } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import FormButton from '@/components/ui/formButton';
import AuthLayout from '@/modules/auth/components/authLayout';
import { routes } from '@/lib/constants/routes';

const SignupSuccess = () => {
  const router = useRouter();

  return (
    <AuthLayout title="You’re all set!" imagePosition="right">
      <div className="flex flex-col items-start gap-6">
        <CheckCircle size={64} weight="fill" className="text-secondary" />
        <p className="text-sm leading-relaxed text-gray-600">
          Your email has been verified and your account is ready. Log in to complete your profile
          and join The Velocity community.
        </p>
        <FormButton type="button" onClick={() => router.push(routes.login)}>
          Proceed to login
        </FormButton>
      </div>
    </AuthLayout>
  );
};

export default SignupSuccess;
