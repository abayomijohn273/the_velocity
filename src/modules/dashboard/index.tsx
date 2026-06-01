'use client';

import { SignOut } from '@phosphor-icons/react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import WelcomeModal from './components/welcomeModal';
import { useLogout } from '@/hooks/auth';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { getErrorMessage } from '@/lib/api/formErrors';
import { routes } from '@/lib/constants/routes';

const Dashboard = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { data } = useCurrentUser();
  const logout = useLogout();
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  useEffect(() => {
    if (params.get('welcome') === 'true') setWelcomeOpen(true);
  }, [params]);

  const closeWelcome = () => {
    setWelcomeOpen(false);
    router.replace(routes.dashboard);
  };

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => router.replace(routes.login),
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  const profile = data?.profile;
  const displayName = profile?.firstName ?? data?.user.email?.split('@')[0];

  return (
    <div className="min-h-screen bg-[#f4f6ee]">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Image
            src="/assets/images/webp/logo.webp"
            alt="The Velocity"
            width={130}
            height={36}
            className="h-auto w-[120px]"
            priority
          />
          <button
            type="button"
            onClick={handleLogout}
            disabled={logout.isPending}
            className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-50 disabled:opacity-50"
          >
            <SignOut size={18} />
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-black sm:text-3xl">
          Welcome back{displayName ? `, ${displayName}` : ''} 👋
        </h1>
        <p className="mt-2 text-sm text-gray-600">This is your dashboard. More is coming soon.</p>
      </main>

      <WelcomeModal open={welcomeOpen} onClose={closeWelcome} name={profile?.firstName} />
    </div>
  );
};

export default Dashboard;
