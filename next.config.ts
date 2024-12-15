import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: '/movies/posters/:path*',
        destination: 'https://image.tmdb.org/t/p/:path*',
      },
    ];
  },
};

export default nextConfig;
