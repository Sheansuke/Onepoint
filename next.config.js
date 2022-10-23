/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['res.cloudinary.com']
  },
  // experimental: {
  //   runtime: 'experimental-edge',
  // },
}

module.exports = nextConfig
