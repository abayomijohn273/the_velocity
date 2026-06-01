'use client';

import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { routes } from '@/lib/constants/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AppHeader from '@/components/layouts/appHeader';
import MembersDirectory from './components/membersDirectory';
import WelcomeModal from './components/welcomeModal';

const Dashboard = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { data } = useCurrentUser();
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  useEffect(() => {
    if (params.get('welcome') === 'true') setWelcomeOpen(true);
  }, [params]);

  const closeWelcome = () => {
    setWelcomeOpen(false);
    router.replace(routes.dashboard);
  };

  const profile = data?.profile;
  const displayName = profile?.firstName ?? data?.user.email?.split('@')[0];

  return (
    <div className="min-h-screen bg-[#f4f6ee]">
      <AppHeader />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-black sm:text-3xl">
          Welcome back{displayName ? `, ${displayName}` : ''} 👋
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Explore the community and connect with fellow members.
        </p>

        <div className="mt-8">
          <MembersDirectory />
        </div>
      </main>

      <WelcomeModal open={welcomeOpen} onClose={closeWelcome} name={profile?.firstName} />
    </div>
  );
};

export default Dashboard;
