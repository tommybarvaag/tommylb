/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    newNextLinkBehavior: true,
    serverComponentsExternalPackages: ["prisma"],
    fontLoaders: [{ loader: "@next/font/google", options: { subsets: ["latin"] } }]
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
