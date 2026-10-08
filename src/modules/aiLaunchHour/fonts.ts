import { DM_Mono, Manrope } from 'next/font/google';

// Kept local to this module so only the AI Launch Hour route loads these fonts.
export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
});

export const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});
