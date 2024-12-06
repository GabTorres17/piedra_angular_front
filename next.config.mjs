/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'api.piedraangular.es'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/api/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.piedraangular.es',
        pathname: '/api/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.piedraangular.es',
        pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig
