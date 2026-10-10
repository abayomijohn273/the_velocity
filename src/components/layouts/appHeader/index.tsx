'use client';

import Avatar from '@/components/ui/avatar';
import { useLogout } from '@/hooks/auth';
import { useCurrentUser } from '@/hooks/auth/useCurrentUser';
import { getErrorMessage } from '@/lib/api/formErrors';
import { routes } from '@/lib/constants/routes';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { CaretDown, Gear, ShieldCheck, SignOut } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import toast from 'react-hot-toast';

const AppHeader = () => {
  const router = useRouter();
  const { data } = useCurrentUser();
  const logout = useLogout();

  const profile = data?.profile;
  const email = data?.user.email ?? '';
  const firstName = profile?.firstName ?? email.split('@')[0] ?? 'Member';
  const isAdmin = data?.user.role === 'admin';

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => router.replace(routes.login),
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  };

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href={routes.dashboard} aria-label="The Velocity — dashboard">
          <Image
            src="/assets/images/webp/logo.webp"
            alt="The Velocity"
            width={130}
            height={36}
            className="h-auto w-[120px]"
            priority
          />
        </Link>

        <Menu as="div" className="relative">
          <MenuButton className="flex cursor-pointer items-center gap-2.5 rounded-full p-1 pr-2 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40">
            <Avatar
              src={profile?.avatar}
              firstName={profile?.firstName}
              lastName={profile?.lastName}
              size={40}
            />
            <span className="hidden flex-col items-start leading-tight sm:flex">
              <span className="text-sm font-semibold text-black">{firstName}</span>
              <span className="max-w-[14rem] truncate text-xs text-gray-500">{email}</span>
            </span>
            <CaretDown size={16} className="text-gray-400" aria-hidden="true" />
          </MenuButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-150"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <MenuItems className="absolute right-0 z-50 mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg focus:outline-none">
              <div className="border-b border-gray-100 px-4 py-3 sm:hidden">
                <p className="text-sm font-semibold text-black">{firstName}</p>
                <p className="truncate text-xs text-gray-500">{email}</p>
              </div>
              <div className="p-1.5">
                {isAdmin && (
                  <MenuItem>
                    <Link
                      href={routes.admin}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-black transition data-[focus]:bg-gray-50"
                    >
                      <ShieldCheck size={18} className="text-gray-500" />
                      Admin dashboard
                    </Link>
                  </MenuItem>
                )}
                <MenuItem>
                  <Link
                    href={routes.settings}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-black transition data-[focus]:bg-gray-50"
                  >
                    <Gear size={18} className="text-gray-500" />
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logout.isPending}
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition data-[focus]:bg-red-50 disabled:opacity-50"
                  >
                    <SignOut size={18} />
                    {logout.isPending ? 'Logging out…' : 'Log out'}
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default AppHeader;
