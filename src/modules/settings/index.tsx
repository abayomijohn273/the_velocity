'use client';

import AppHeader from '@/components/layouts/appHeader';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { useUpdateProfile } from '@/hooks/profile/useUpdateProfile';
import { useUploadAvatar } from '@/hooks/profile/useUploadAvatar';
import { getErrorMessage } from '@/lib/api/formErrors';
import type { CompleteProfileInput } from '@/lib/validation/profile';
import ProfileForm, { type AvatarSelection } from '@/modules/profile/completeProfile/profileForm';
import LogoutCard from '@/modules/settings/components/logoutCard';
import type { UserProfile } from '@/types/user';
import { useState } from 'react';
import toast from 'react-hot-toast';

const toFormDefaults = (profile: UserProfile): Partial<CompleteProfileInput> => ({
  firstName: profile.firstName ?? '',
  lastName: profile.lastName ?? '',
  phoneNumber: profile.phoneNumber ?? '',
  whatsappNumber: profile.whatsappNumber ?? '',
  linkedinUrl: profile.linkedinUrl ?? '',
  currentRole: profile.currentRole ?? '',
  countryOfResidence: profile.countryOfResidence ?? '',
  industry: profile.industry ?? '',
  dob: profile.dob ?? '',
  referredBy: profile.referredBy ?? '',
});

const Settings = () => {
  const { data, isLoading } = useCurrentUser();
  const updateProfile = useUpdateProfile();
  const uploadAvatar = useUploadAvatar();
  const [submitting, setSubmitting] = useState(false);

  const profile = data?.profile ?? null;

  const onValid = async (values: CompleteProfileInput, avatar: AvatarSelection) => {
    setSubmitting(true);
    try {
      let avatarUrl: string;
      if (avatar.file) {
        avatarUrl = (await uploadAvatar.mutateAsync(avatar.file)).url;
      } else if (avatar.removeExisting) {
        avatarUrl = '';
      } else {
        avatarUrl = profile?.avatar ?? '';
      }
      await updateProfile.mutateAsync({ ...values, avatar: avatarUrl });
      toast.success('Your profile has been updated.');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6ee]">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-black sm:text-3xl">Account settings</h1>
            <p className="mt-1.5 text-sm text-gray-500">Update your profile information below.</p>
          </div>

          {isLoading || !data ? (
            <p className="text-sm text-gray-500">Loading…</p>
          ) : (
            <div className="flex flex-col gap-8">
              <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
                <ProfileForm
                  email={data.user.email}
                  loading={submitting}
                  onValid={onValid}
                  defaultValues={profile ? toFormDefaults(profile) : undefined}
                  currentAvatarUrl={profile?.avatar ?? null}
                  submitLabel="Save changes"
                />
              </div>

              <LogoutCard />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Settings;
