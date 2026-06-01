'use client';

import FormButton from '@/components/ui/formButton';
import Input from '@/components/ui/input';
import InputPassword from '@/components/ui/inputPassword';
import { useLogin } from '@/hooks/auth';
import { applyApiFieldErrors, getErrorMessage } from '@/lib/api/formErrors';
import { routes } from '@/lib/constants/routes';
import { loginSchema, type LoginInput } from '@/lib/validation/auth';
import AuthLayout from '@/modules/auth/components/authLayout';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Login = () => {
  const router = useRouter();
  const login = useLogin();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit((values) => {
    login.mutate(values, {
      onSuccess: ({ user }) => {
        toast.success('Welcome back!');
        router.replace(user.isRegistrationComplete ? routes.dashboard : routes.completeProfile);
      },
      onError: (error) => {
        applyApiFieldErrors(error, setError);
        toast.error(getErrorMessage(error));
      },
    });
  });

  return (
    <AuthLayout title="Login" subtitle="Manage your links" imagePosition="left">
      <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
        <Input
          label="Your e-mail"
          type="email"
          autoComplete="email"
          placeholder="email@domain.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <div className="flex flex-col gap-1.5">
          <InputPassword
            label="Password"
            autoComplete="current-password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register('password')}
          />
          <Link
            href={routes.forgotPassword}
            className="self-start text-xs font-medium text-gray-500 underline"
          >
            Forgot my password?
          </Link>
        </div>
        <FormButton type="submit" loading={login.isPending}>
          Login
        </FormButton>
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Don’t have an account?{' '}
        <Link href={routes.signup} className="font-semibold text-black underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
