import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import { Providers } from '@/components/Providers';

import './globals.scss';

const robotoSans = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Popular Movies',
  description: 'Popular movies and TV shows',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoSans.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
