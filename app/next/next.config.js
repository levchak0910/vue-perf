/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    largePageDataBytes: 5 * 1024 * 1024,
  },
};

module.exports = nextConfig;