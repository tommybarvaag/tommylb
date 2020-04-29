import Head from "next/head";
import React from "react";

export default function Seo(props) {
  return (
    <Head>
      <title lang="en">Hi, I'm Tommy Lunde Barvåg 👋</title>
      <meta
        name="description"
        content="Hi, I'm Tommy Lunde Barvåg 👋 I’m a full stack developer. I’ve spent the last six years creating web solutions for great companies."
      ></meta>
      <link rel="canonical" href="/no/"></link>
      <meta property="og:title" content=">Hi, I'm Tommy Lunde Barvåg 👋"></meta>
      <meta
        property="og:description"
        content="Hi, I'm Tommy Lunde Barvåg 👋 I’m a full stack developer. I’ve spent the last six years creating web solutions for great companies."
      ></meta>
      <meta property="og:url" content="/"></meta>
      <meta property="og:type" content="website"></meta>
      <meta property="og:image" content="https://tommylb.com/logo.jpg"></meta>
      <meta property="og:locale" content="en_US"></meta>
      <meta property="og:site_name" content="tommylb.com"></meta>
      <script type="application/ld+json">{`"@context": "https://schema.org",
        "@type": "Organization",
        "name": "Tommy Lunde Barvåg",
        "legalName": "Tommy Lunde Barvåg",
        "url": "https://tommylb.com/",
        "logo": "https://tommylb.com/logo.jpg",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Holtavegen 32",
            "addressLocality": "Rådal",
            "addressRegion": "Bergen",
            "postalCode": "5239",
            "addressCountry": "Norway"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Sales and support",
            "telephone": "+47 97 77 79 07",
            "email": "tommy@barvaag.com"
        },
        "sameAs": ["https://www.facebook.com/tommybarvaag","https://www.linkedin.com/in/tommybarvaag/"]`}</script>
    </Head>
  );
}
