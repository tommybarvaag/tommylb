import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import { Drawer } from "@base-ui/react/drawer";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";
import { VercelAnalytics } from "@/components/vercel-analytics";

import { defaultMetadata } from "@/utils/metadata-utils";

import "@/app/global.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#242424" }
  ],
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
    <html lang="en" suppressHydrationWarning className={cn("", interFont.className)}>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Drawer.Provider>
            <Drawer.IndentBackground />
            <Drawer.Indent>
              {children}
              {modal}
            </Drawer.Indent>
          </Drawer.Provider>
        </ThemeProvider>
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
