import Footer from "@/components/footer";
import Main from "@/components/main";
import { VercelAnalytics } from "@/components/vercel-analytics";
import { Inter } from "@next/font/google";
import Script from "next/script";
import "styles/global.css";

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
