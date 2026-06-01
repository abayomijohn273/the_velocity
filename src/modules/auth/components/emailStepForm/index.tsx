'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/input';
import FormButton from '@/components/ui/formButton';
import { emailOnlySchema, type EmailOnlyInput } from '@/lib/validation/auth';

interface EmailStepFormProps {
  submitLabel: string;
  loading: boolean;
  onValid: (values: EmailOnlyInput) => void;
  serverError?: string;
}

/** Single email-field step shared by the existing-member and forgot-password flows. */
const EmailStepForm = ({ submitLabel, loading, onValid, serverError }: EmailStepFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailOnlyInput>({ resolver: zodResolver(emailOnlySchema) });

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-5" noValidate>
      <Input
        label="Your e-mail"
        type="email"
        autoComplete="email"
        placeholder="email@domain.com"
        error={errors.email?.message ?? serverError}
        {...register('email')}
      />
      <FormButton type="submit" loading={loading}>
        {submitLabel}
      </FormButton>
    </form>
  );
};

export default EmailStepForm;
