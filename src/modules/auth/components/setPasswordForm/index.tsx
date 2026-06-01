'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import InputPassword from '@/components/ui/inputPassword';
import FormButton from '@/components/ui/formButton';
import { setPasswordFormSchema, type SetPasswordFormInput } from '@/lib/validation/auth';

interface SetPasswordFormProps {
  submitLabel: string;
  loading: boolean;
  onValid: (values: SetPasswordFormInput) => void;
}

/** Shared password + confirm-password form for complete-signup and reset-password. */
const SetPasswordForm = ({ submitLabel, loading, onValid }: SetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordFormInput>({ resolver: zodResolver(setPasswordFormSchema) });

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-5" noValidate>
      <InputPassword
        label="Password"
        autoComplete="new-password"
        placeholder="Create a password"
        error={errors.password?.message}
        {...register('password')}
      />
      <InputPassword
        label="Confirm password"
        autoComplete="new-password"
        placeholder="Re-enter your password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      <FormButton type="submit" loading={loading}>
        {submitLabel}
      </FormButton>
    </form>
  );
};

export default SetPasswordForm;
