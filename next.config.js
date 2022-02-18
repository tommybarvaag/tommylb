/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
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
