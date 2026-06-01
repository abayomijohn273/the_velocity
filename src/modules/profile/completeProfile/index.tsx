'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import ProfileForm from './profileForm';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { useCompleteProfile } from '@/hooks/profile/useCompleteProfile';
import { getErrorMessage } from '@/lib/api/formErrors';
import { routes } from '@/lib/constants/routes';
import type { CompleteProfileInput } from '@/lib/validation/profile';

const CompleteProfile = () => {
  const router = useRouter();
  const { data, isLoading } = useCurrentUser();
  const completeProfile = useCompleteProfile();

  // Already-complete users shouldn't see this screen.
  useEffect(() => {
    if (data?.user.isRegistrationComplete) {
      router.replace(routes.dashboard);
    }
  }, [data, router]);

  const onValid = (values: CompleteProfileInput) => {
    completeProfile.mutate(values, {
      onSuccess: () => {
        toast.success('Profile completed. Welcome aboard!');
        router.replace(`${routes.dashboard}?welcome=true`);
      },
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  return (
    <main className="min-h-screen bg-[#e7efe6] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl sm:p-10">
        <Image
          src="/assets/images/webp/logo.webp"
          alt="The Velocity"
          width={150}
          height={40}
          className="mb-8 h-auto w-[140px]"
          priority
        />
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black sm:text-3xl">Complete your profile</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            Tell us a bit about yourself to finish setting up your account.
          </p>
        </div>

        {isLoading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : (
          <ProfileForm
            email={data?.user.email ?? ''}
            loading={completeProfile.isPending}
            onValid={onValid}
          />
        )}
      </div>
    </main>
  );
};

export default CompleteProfile;
