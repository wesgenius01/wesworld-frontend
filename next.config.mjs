/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cloudflare Pages doesn't support Next's default image optimizer,
    // so images are served as-is. The CMS already generates sized
    // variants (thumbnail/card/hero) for each upload.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
