import { routes } from '@/lib/constants/routes';
import Image from 'next/image';
import Link from 'next/link';
import MediaPanel from './mediaPanel';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  /** Which side the image sits on at desktop. Signup = right, login = left. */
  imagePosition?: 'left' | 'right';
  children: React.ReactNode;
}

/** Shared split-card shell for every authentication screen. Responsive: the
 * media panel collapses on mobile so the form takes the full width. */
const AuthLayout = ({ title, subtitle, imagePosition = 'right', children }: AuthLayoutProps) => {
  const formPanel = (
    <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
      <Link href={routes.home} className="mb-8 inline-block w-fit">
        <Image
          src="/assets/images/webp/logo.webp"
          alt="The Velocity"
          width={150}
          height={40}
          className="h-auto w-[140px]"
          priority
        />
      </Link>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1.5 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {children}
    </div>
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e7efe6] p-4 sm:p-6 lg:p-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">
        {imagePosition === 'left' ? (
          <>
            <div className="hidden p-3 lg:block">
              <MediaPanel />
            </div>
            {formPanel}
          </>
        ) : (
          <>
            {formPanel}
            <div className="hidden p-3 lg:block">
              <MediaPanel />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default AuthLayout;
