import { getAbsoluteUrl } from "@/lib/utils";
import type { Metadata } from "next";
import { getDefaultSeoDescription } from "./seo-utils";

const url = getAbsoluteUrl();

const title = "Tommy Lunde Barvåg";
const description = getDefaultSeoDescription(true);

const ogImageUrl = `${url}/images/seo-banner.png`;

const defaultOg: Pick<Metadata, "openGraph">["openGraph"] = {
  title: {
    default: title,
    template: "%s | Tommy Lunde Barvåg"
  },
  type: "website",
  url: getAbsoluteUrl(),
  siteName: title,
  description,
  images: [
    {
      url: ogImageUrl,
      width: 1200,
      height: 630,
      alt: "Tommy Lunde Barvåg."
    }
  ]
};

const defaultTwitter: Pick<Metadata, "twitter">["twitter"] = {
  title,
  description,
  card: "summary_large_image",
  images: ogImageUrl
};

const defaultMetadata: Metadata = {
  themeColor: "#18181b",
  viewport: {
    width: "device-width",
    initialScale: 1
  },
  title: {
    default: title,
    template: "%s | Tommy Lunde Barvåg"
  },
  description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  twitter: {
    ...defaultTwitter
  },
  openGraph: {
    ...defaultOg
  },
  icons: {
    shortcut: "/favicon.ico",
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg"
      }
    ]
  },
  other: {
    robots: "max-snippet:-1, max-image-preview:large, max-video-preview:-1"
  },
  verification: {
    google: "XDSv8hkk6HystJxcyceiBz0bt_5vZJakkq-1fFTw8CU"
  }
};

export { defaultOg, defaultTwitter, defaultMetadata };
