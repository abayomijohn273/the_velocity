'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Input from '@/components/ui/input';
import InputPassword from '@/components/ui/inputPassword';
import FormButton from '@/components/ui/formButton';
import AuthLayout from '@/modules/auth/components/authLayout';
import { useSignup } from '@/hooks/auth';
import { applyApiFieldErrors, getErrorMessage } from '@/lib/api/formErrors';
import { routes } from '@/lib/constants/routes';
import { signupSchema, type SignupInput } from '@/lib/validation/auth';

const Signup = () => {
  const router = useRouter();
  const signup = useSignup();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupInput>({ resolver: zodResolver(signupSchema) });

  const onSubmit = handleSubmit((values) => {
    signup.mutate(values, {
      onSuccess: ({ email }) => {
        toast.success('We sent a 6-digit code to your email.');
        router.push(
          `${routes.verifyOtp}?email=${encodeURIComponent(email)}&purpose=email_verification`
        );
      },
      onError: (error) => {
        applyApiFieldErrors(error, setError);
        toast.error(getErrorMessage(error));
      },
    });
  });

  return (
    <AuthLayout title="Sign up" subtitle="Create your account for free" imagePosition="right">
      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        <Input
          label="Your e-mail"
          type="email"
          autoComplete="email"
          placeholder="email@domain.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <InputPassword
          label="Password"
          autoComplete="new-password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register('password')}
        />
        <FormButton type="submit" loading={signup.isPending}>
          Create account
        </FormButton>
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Already have an account?{' '}
        <Link href={routes.login} className="font-semibold text-black underline">
          Log in
        </Link>
      </p>
      <p className="mt-2 text-sm text-gray-600">
        Already a member?{' '}
        <Link href={routes.existingMember} className="font-semibold text-secondary underline">
          Activate your account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
