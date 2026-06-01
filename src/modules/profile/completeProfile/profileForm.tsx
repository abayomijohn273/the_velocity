'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AvatarUpload from '@/components/ui/avatarUpload';
import Input from '@/components/ui/input';
import InputPhone from '@/components/ui/inputPhone';
import Select from '@/components/ui/select';
import FormButton from '@/components/ui/formButton';
import { countries } from '@/lib/constants/countries';
import { currentRoles } from '@/lib/constants/currentRoles';
import { industries } from '@/lib/constants/industries';
import { completeProfileSchema, type CompleteProfileInput } from '@/lib/validation/profile';

export interface AvatarSelection {
  file: File | null;
  removeExisting: boolean;
}

interface ProfileFormProps {
  email: string;
  loading: boolean;
  onValid: (values: CompleteProfileInput, avatar: AvatarSelection) => void;
  defaultValues?: Partial<CompleteProfileInput>;
  currentAvatarUrl?: string | null;
  submitLabel?: string;
}

const ProfileForm = ({
  email,
  loading,
  onValid,
  defaultValues,
  currentAvatarUrl,
  submitLabel = 'Complete profile',
}: ProfileFormProps) => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CompleteProfileInput>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      phoneNumber: '',
      whatsappNumber: '',
      referredBy: '',
      ...defaultValues,
    },
  });

  const submit = (values: CompleteProfileInput) =>
    onValid(values, { file: avatarFile, removeExisting: removeAvatar });

  const existingAvatar = removeAvatar ? null : (currentAvatarUrl ?? null);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5" noValidate>
      <AvatarUpload
        value={avatarFile}
        existingUrl={existingAvatar}
        onChange={(file) => {
          setAvatarFile(file);
          if (file) setRemoveAvatar(false);
        }}
        onRemoveExisting={() => {
          setRemoveAvatar(true);
          setAvatarFile(null);
        }}
        disabled={loading}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="First name"
          placeholder="First name"
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label="Last name"
          placeholder="Last name"
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>

      <Input label="Email" type="email" value={email} disabled readOnly />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <InputPhone
              label="Phone number"
              value={field.value}
              onChange={(value) => field.onChange(value ?? '')}
              onBlur={field.onBlur}
              error={errors.phoneNumber?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="whatsappNumber"
          render={({ field }) => (
            <InputPhone
              label="WhatsApp number"
              value={field.value}
              onChange={(value) => field.onChange(value ?? '')}
              onBlur={field.onBlur}
              error={errors.whatsappNumber?.message}
            />
          )}
        />
      </div>

      <Input
        label="LinkedIn URL"
        placeholder="https://linkedin.com/in/your-profile"
        error={errors.linkedinUrl?.message}
        {...register('linkedinUrl')}
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Controller
          control={control}
          name="currentRole"
          render={({ field }) => (
            <Select
              label="Current role"
              placeholder="Select your current role"
              options={currentRoles}
              value={field.value}
              onChange={field.onChange}
              error={errors.currentRole?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="industry"
          render={({ field }) => (
            <Select
              label="Industry"
              placeholder="Select your industry"
              options={industries}
              value={field.value}
              onChange={field.onChange}
              error={errors.industry?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Controller
          control={control}
          name="countryOfResidence"
          render={({ field }) => (
            <Select
              label="Country of residence"
              placeholder="Select your country"
              options={countries}
              value={field.value}
              onChange={field.onChange}
              error={errors.countryOfResidence?.message}
            />
          )}
        />
        <Input label="Date of birth" type="date" error={errors.dob?.message} {...register('dob')} />
      </div>

      <Input
        label="Referred by (optional)"
        placeholder="Who referred you?"
        error={errors.referredBy?.message}
        {...register('referredBy')}
      />

      <FormButton type="submit" loading={loading} className="mt-2">
        {submitLabel}
      </FormButton>
    </form>
  );
};

export default ProfileForm;
