const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    newNextLinkBehavior: true,
    serverComponentsExternalPackages: ["@prisma/client"],
    fontLoaders: [{ loader: "@next/font/google", options: { subsets: ["latin"] } }]
  },
  images: {
    domains: ["images.unsplash.com", "avatars.githubusercontent.com"]
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/post",
        permanent: true
      },
      {
        source: "/blog/:slug",
        destination: "/post/:slug",
        permanent: true
      }
    ];
  }
};

module.exports = withContentlayer({
  ...nextConfig
});
