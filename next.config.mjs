/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        hostname: "images.unsplash.com"
      },
      {
        hostname: "pbs.twimg.com"
      }
    ]
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
      },
      {
        source: "/cv",
        destination: "/cv/about",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
