/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  concurrentFeatures: true,

  images: {
    domains: ['res.cloudinary.com']
  },
  experimental: {
    runtime: 'experimental-edge',
  },
}

module.exports = nextConfig
