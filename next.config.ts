import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   domains: ['localhost'],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'gen21api.test',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'app.gen21.com.au',
        port: '',
        pathname: '/storage/**',
      },
      {
        protocol: "https",
        hostname: "storage.gen21.com.au",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
