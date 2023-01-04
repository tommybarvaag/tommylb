import Main from "@/components/main";
import { getDefaultSeoDescription, getDefaultSeoTitle } from "@/utils/seoUtils";
import Script from "next/script";
import "styles/global.css";

import Footer from "@/components/footer";
import { Inter } from "@next/font/google";

const interFont = Inter();

const defaultDescription = getDefaultSeoDescription(true);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const url = "/";
  const title = getDefaultSeoTitle();
  const description = defaultDescription;
  const name = "Tommy Lunde Barvåg";
  const image = "https://tommylb.com/images/seo-banner.png";

  return (
    <html lang="en" className={interFont.className}>
      <head>
        <meta charSet="utf-8" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#000000" />
        <title lang="no">{title}</title>
        <meta name="description" content={description}></meta>
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website"></meta>
        <meta property="og:image" content={image}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:site_name" content={name}></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tommybarvaag" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </head>
      <body className="bg-black text-gray-100">
        <Main className="pt-14 sm:pt-32">{children}</Main>
        <Footer />
      </body>
      <Script id="json-ld-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: name,
          legalName: name,
          url: "https://tommylb.com/",
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
