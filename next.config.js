/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  concurrentFeatures: true,

  images: {
    domains: ['res.cloudinary.com']
  },

  experimental: {
    modularizeImports: {
      '@mui/icons-material/?(((\\w*)?/?)*)': {
        transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}'
      }
    }
  }
}

module.exports = nextConfig
