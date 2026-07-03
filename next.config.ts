import type { NextConfig } from "next";

import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // react-pdf is server-externalized; nft cannot trace its runtime fs font
  // reads, so include the Geist files in the route's trace explicitly.
  outputFileTracingIncludes: {
    "/api/cv/pdf": ["./assets/fonts/*"]
  },
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  turbopack: {},
  transpilePackages: ["shiki"],
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
  experimental: {
    mdxRs: {
      mdxType: "gfm"
    }
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

const withMDX = createMDX();

export default withMDX(nextConfig);
