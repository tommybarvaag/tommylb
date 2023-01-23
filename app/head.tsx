import { getAbsoluteUrl } from "@/lib/utils";
import { getDefaultSeoDescription, getDefaultSeoTitle } from "@/utils/seo-utils";

export default function Head({ params }) {
  const url = getAbsoluteUrl();
  const title = getDefaultSeoTitle();
  const description = getDefaultSeoDescription(true);
  const name = "Tommy Lunde Barvåg";
  const image = `${url}/images/seo-banner.png`;

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
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
    </>
  );
}
