/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  concurrentFeatures: true,
  images: {
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
