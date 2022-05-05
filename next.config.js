/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  concurrentFeatures: true,
    productionBrowserSourceMaps: true,

  images: {
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
