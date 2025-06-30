'use client';

import Button from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '../../../../public/assets/images/webp/logo.webp';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (section: string) => {
    if (pathname === '/join-us') {
      router.push('/');
    }

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <header className="relative pt-6 md:pt-8 px-4 md:px-0">
      <nav
        className="flex justify-between items-center max-w-7xl mx-auto 
      bg-[#FBFFE7] shadow-[0px_4px_50px_0px_rgba(0,0,0,0.1)] py-3 md:py-3.5 pr-4 md:pr-5 pl-6 lg:pr-[22px] lg:pl-[40px] rounded-full"
      >
        <div className="w-5/12 md:w-3/12 lg:w-2/12">
          <Link href="/" className="text-xl md:text-2xl lg:text-[1.75rem] font-bold text-primary">
            <Image src={Logo} alt="Logo" className="w-44 lg:w-36" />
            <span className="sr-only">Velocity</span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleClick('about')}
              className="hidden md:block text-primary focus:outline-none ring-0 
            font-semibold hover:text-secondary transition-all duration-300 cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => handleClick('faqs')}
              className="hidden md:block text-primary focus:outline-none ring-0 
            font-semibold hover:text-secondary transition-all duration-300 cursor-pointer"
            >
              FAQs
            </button>
            <button
              onClick={() => handleClick('contact-us')}
              className="hidden md:block text-primary focus:outline-none ring-0 
            font-semibold hover:text-secondary transition-all duration-300 cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          <div className="items-center gap-6 hidden md:flex">
            {/* <Link
              href="/login"
              className="hidden md:block text-primary focus:outline-none ring-0 
            font-semibold hover:text-secondary transition-all duration-300 cursor-pointer"
            >
              BE A SPONSOR
            </Link> */}

            <Button href="/join-us" title="GET STARTED" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
