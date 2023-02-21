import Footer from "@/components/footer";
import Main from "@/components/main";
import { VercelAnalytics } from "@/components/vercel-analytics";
import { getAbsoluteUrl } from "@/lib/utils";
import { getDefaultSeoDescription } from "@/utils/seo-utils";
import { Inter } from "@next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import "styles/global.css";

export function generateMetadata(): Metadata {
  const url = getAbsoluteUrl();

  const title = "Tommy Lunde Barvåg";
  const description = getDefaultSeoDescription(true);

  const ogImageUrl = `${url}/images/seo-banner.png`;

  return {
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
      title,
      description,
      card: "summary_large_image",
      images: ogImageUrl
    },
    openGraph: {
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
}

const interFont = Inter();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const name = "Tommy Lunde Barvåg";

  return (
    <html lang="en" className={interFont.className}>
      <body className="bg-zinc-900 text-zinc-50">
        <Main className="pt-14 sm:pt-32">{children}</Main>
        <Footer />
        <VercelAnalytics />
      </body>
      <Script id="json-ld-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: name,
          legalName: name,
          url: "https://tommylb.com",
          logo: "https://tommylb.com/logo.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Holtavegen 32",
            addressRegion: "Rådal",
            postalCode: "5239",
            addressCountry: "Norway"
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Sales and support",
            telephone: "+4797777907",
            email: "tommy@barvaag.com"
          }
        })}
      </Script>
    </html>
  );
}
