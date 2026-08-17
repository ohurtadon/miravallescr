/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  experimental: {
    viewTransition: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "pub-d139a82f8c4144faa9fbfc430d4c7fdc.r2.dev"
      }
    ]
  }
};

export default nextConfig;
