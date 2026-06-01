'use client';

import { useLogout } from '@/hooks/auth';
import { getErrorMessage } from '@/lib/api/formErrors';
import { routes } from '@/lib/constants/routes';
import { SignOut } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const LogoutCard = () => {
  const router = useRouter();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => router.replace(routes.login),
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-base font-semibold text-black">Log out</h2>
        <p className="mt-1 text-sm text-gray-500">Sign out of your account on this device.</p>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        disabled={logout.isPending}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-full border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-50"
      >
        <SignOut size={18} />
        {logout.isPending ? 'Logging out…' : 'Log out'}
      </button>
    </div>
  );
};

export default LogoutCard;
