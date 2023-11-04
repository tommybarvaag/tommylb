import Footer from "@/components/footer";
import { VercelAnalytics } from "@/components/vercel-analytics";
import { cn } from "@/lib/utils";
import { defaultMetadata } from "@/utils/metadata-utils";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "styles/global.css";

export const viewport: Viewport = {
  themeColor: "#18181b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export const metadata: Metadata = {
  ...defaultMetadata
};

const interFont = Inter({
  subsets: ["latin"]
});

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const name = "Tommy Lunde Barvåg";

  return (
    <html lang="en" className={cn("", interFont.className)}>
      <body className="bg-zinc-900 text-zinc-50">
        {children}
        <Footer />
        {modal}
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
