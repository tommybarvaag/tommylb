import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { getDefaultSeoDescription, getDefaultSeoTitle } from "../utils/seoUtils";

const defaultDescription = getDefaultSeoDescription(true);

export default function Seo({ page, info }) {
  const router = useRouter();
  const url = router.asPath ?? router.pathname;
  const title = getDefaultSeoTitle(page?.openGraph?.title ?? page?.title);
  const description = page?.openGraph?.description ?? defaultDescription;
  const name = info?.name ?? "Tommy Lunde Barvåg";
  const image = "https://tommylb.com/images/seo-banner.png";

  return (
    <Head>
      <title lang="no">{title ?? defaultTitle}</title>
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
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: name,
          legalName: name,
          url: "https://tommylb.com/",
          logo: "https://tommylb.com/logo.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: info?.address1 ?? "Holtavegen 32",
            addressRegion: info?.city ?? "Rådal",
            postalCode: info?.zipCode ?? "5239",
            addressCountry: info?.country ?? "Norway"
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Sales and support",
            telephone: info?.phone ?? "+4797777907",
            email: info?.email ?? "tommy@barvaag.com"
          },
          sameAs: info?.socialMedias.map(socialMedia => socialMedia?.url) ?? []
        })}
      </script>
    </Head>
  );
}
