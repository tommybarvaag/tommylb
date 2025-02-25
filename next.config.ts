import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com"
      },
      {
        hostname: "pbs.twimg.com"
      }
    ]
  },
  experimental: {
    scrollRestoration: true,
    mdxRs: true,
    viewTransition: true,
    useCache: true
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/writings",
        permanent: true
      },
      {
        source: "/blog/:slug",
        destination: "/writings/:slug",
        permanent: true
      },
      {
        source: "/post/:slug",
        destination: "/writings/:slug",
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
      },
      {
        source: "/strava",
        destination: "https://www.strava.com/athletes/32487607",
        permanent: true
      },
      {
        source: "/strava/:id",
        destination: "https://www.strava.com/athletes/32487607",
        permanent: true
      },
      {
        source: "/github",
        destination: "https://github.com/tommybarvaag",
        permanent: true
      }
    ];
  }
} satisfies NextConfig;

const withMDX = createMDX({});

export default withMDX(nextConfig);
