/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  trailingSlash: true,
};

module.exports = nextConfig;
