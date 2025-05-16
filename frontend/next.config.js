/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1300, 1400, 1500, 1600, 1700, 1920, 2048, 3840],
    domains: [
      'liveblocks.io',
      'dummyimage.com',
      'picsum.photos',
      'hongboemsunimage.s3.ap-northeast-2.amazonaws.com',
      'avatars.githubusercontent.com',
      'withme.s3.amazonaws.com',
      'secure.gravatar.com',
    ],
    // loader: 'custom',  
    // loaderFile: './customImgLoader.js',
  },
  typescript: {
    ignoreBuildErrors: true, 
  },

  output: 'standalone',
  // assetPrefix: 'https://d2khml1veaagc6.cloudfront.net',
  async headers() {
    return [
      {
        source: '/explore', 
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=30, stale-while-revalidate=30', 
          },
        ],
      },
    ];
  },
};

module.exports = config;
