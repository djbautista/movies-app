import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

import { Providers } from '@/components/Providers';

import './globals.css';

const robotoSans = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
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
      <body
        className={twMerge(
          'bg-neutral-900',
          'antialiased',
          robotoSans.className,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
