import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { getSocialMediaImageFromPage } from "../logic/imageLogic";

const defaultTitle = "Hi 👋";
const defaultDescription =
  "Hi, I'm Tommy Lunde Barvåg 👋 I’m a full stack developer. I’ve spent the last six years creating web solutions for great companies.";

export default function Seo({ page, info }) {
  const router = useRouter();
  const url = router.asPath ?? router.pathname;
  const title = `${page?.openGraph?.title ?? page?.title ?? defaultTitle} | Tommy Lunde Barvåg`;
  const description = page?.openGraph?.description ?? defaultDescription;
  const name = info?.name ?? "Tommy Lunde Barvåg";
  const image = getSocialMediaImageFromPage(page);

  return (
    <Head>
      <title lang="no">{title ?? defaultTitle}</title>
      <meta name="description" content={description}></meta>
      <link rel="canonical" href={url}></link>
      <meta property="og:title" content={title}></meta>
      <meta property="og:description" content={description}></meta>
      <meta property="og:url" content={url}></meta>
      <meta property="og:type" content="website"></meta>
      <meta property="og:image" content={image}></meta>
      <meta property="og:locale" content="en_US"></meta>
      <meta property="og:site_name" content={name}></meta>
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
