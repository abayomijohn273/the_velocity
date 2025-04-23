import { inter, silka } from '@/styles/font';
import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'The Velocity',
  description: 'Rising Stars Collaborating and Moving Together to Achieve Big Things',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${silka.variable} ${inter.variable} antialiased`}>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
