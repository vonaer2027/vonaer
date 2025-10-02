import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
        pathname: '/plane_img_jt/**',
      },
      {
        protocol: 'https',
        hostname: 'qyipzxwadmmhitvuiade.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
