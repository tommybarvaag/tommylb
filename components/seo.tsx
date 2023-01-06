import Head from "next/head";
import Script from "next/script";
import { getDefaultSeoDescription, getDefaultSeoTitle } from "../utils/seoUtils";

type SeoProps = {};

const defaultDescription = getDefaultSeoDescription(true);

export default function Seo({}: SeoProps) {
  const url = "/";
  const title = getDefaultSeoTitle();
  const description = defaultDescription;
  const name = "Tommy Lunde Barvåg";
  const image = "https://tommylb.com/images/seo-banner.png";

  return (
    <>
      <Head>
        <title lang="no">{title}</title>
        <meta name="description" content={description}></meta>
        <link rel="canonical" href={`https://tommylb.com${url}`} />
        <meta property="og:title" content={title}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="og:url" content={`https://tommylb.com${url}`} />
        <meta property="og:type" content="website"></meta>
        <meta property="og:image" content={image}></meta>
        <meta property="og:locale" content="en_US"></meta>
        <meta property="og:site_name" content={name}></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tommybarvaag" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
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
    </>
  );
}
