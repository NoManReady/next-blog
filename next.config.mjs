/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'next.131407.vip',
      },
    ],
  },
};

export default nextConfig;
