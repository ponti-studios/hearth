/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  // Portless serves dev on https://hearth.lvh.me:4200. Next blocks
  // cross-origin `/_next/*` requests in dev unless listed here — without
  // this, chunks 403 and the page never hydrates (clicks do nothing).
  allowedDevOrigins: ['hearth.lvh.me'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
