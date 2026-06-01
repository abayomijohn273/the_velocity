import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Member avatars can be hosted on any https origin (storage/CDN).
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

export default nextConfig;
