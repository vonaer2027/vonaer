import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/aircraft',
        destination: '/charter#aircraft',
        permanent: true,
      },
      {
        source: '/supercar',
        destination: '/charter#supercar',
        permanent: true,
      },
      {
        source: '/yacht',
        destination: '/charter#yacht',
        permanent: true,
      },
      {
        source: '/evtol',
        destination: '/charter#evtol',
        permanent: true,
      },
      {
        source: '/helicopter',
        destination: '/charter',
        permanent: true,
      },
      {
        source: '/jets',
        destination: '/charter#aircraft',
        permanent: true,
      },
    ]
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.jet-bay.com',
        port: '',
        pathname: '/_next/image/**',
      },
      {
        protocol: 'https',
        hostname: 'asserts.avi-go.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'qyipzxwadmmhitvuiade.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'xsctqzbwa1mbabgs.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
