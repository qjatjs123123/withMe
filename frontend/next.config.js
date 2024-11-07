/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ['liveblocks.io', 'dummyimage.com', 'picsum.photos', 'withme.s3.amazonaws.com'],
  },
  typescript: {
    ignoreBuildErrors: true, // This will ignore TypeScript errors during the build process
  },
};

module.exports = config;
