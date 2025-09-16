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
    ],
  },
};

export default nextConfig;
