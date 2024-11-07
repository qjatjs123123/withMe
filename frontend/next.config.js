/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ['liveblocks.io', 'dummyimage.com', 'picsum.photos', 'hongboemsunimage.s3.ap-northeast-2.amazonaws.com'],
  },
  typescript: {
    ignoreBuildErrors: true, // This will ignore TypeScript errors during the build process
  },
};

module.exports = config;
