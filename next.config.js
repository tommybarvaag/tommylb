const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "avatars.githubusercontent.com", "pbs.twimg.com"]
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
      },
      {
        source: "/post/why-i-run",
        destination: "/post",
        permanent: true
      },
      {
        source: "/post/do-you-need-a-third-party-library",
        destination: "/post/do-you-need-a-third-party-form-library",
        permanent: true
      }
    ];
  },
  experimental: {
    scrollRestoration: true,
    webpackBuildWorker: true
  }
};

module.exports = withContentlayer({
  ...nextConfig
});
