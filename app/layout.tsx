import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { twMerge } from 'tailwind-merge';

import './globals.css';

const robotoSans = Roboto({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500'],
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
      <body className={twMerge('antialiased', robotoSans.variable)}>
        {children}
      </body>
    </html>
  );
}
