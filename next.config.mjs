const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = "miravallescr";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isGitHubPages ? `/${repositoryName}` : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
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
