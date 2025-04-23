import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const silka = localFont({
  variable: '--font-silka',
  src: [
    {
      path: './fonts/silka-regular-webfont.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
});

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
