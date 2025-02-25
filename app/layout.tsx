import "@/app/global.css";
import { defaultMetadata } from "@/utils/metadata-utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { VercelAnalytics } from "./_components/vercel-analytics";
import { cn } from "./_lib/utils";

export const metadata: Metadata = {
  ...defaultMetadata
};

const interFont = Inter({
  subsets: ["latin"]
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const name = "Tommy Lunde Barvåg";

  return (
    <html lang="en" className={cn("", interFont.className)}>
      <body className="bg-zinc-50 text-zinc-950">
        {children}
        <SpeedInsights />
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
