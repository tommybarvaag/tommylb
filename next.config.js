module.exports = {
  future: {
    strictPostcssConfiguration: true
  },
  reactStrictMode: true,
  experimental: {
    turboMode: true,
    eslint: true
  },
  images: {
    domains: ["i.scdn.co", "pbs.twimg.com"]
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
