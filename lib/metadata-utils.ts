import { getAbsoluteUrl } from "@/lib/utils";
import { Metadata } from "next";

export function generateWritingsMetadata({
  title,
  description,
  canonical
}: {
  title: string;
  description: string;
  canonical: string;
}): Metadata {
  const url = getAbsoluteUrl();

  const ogImageUrl = new URL(`${url}/api/og`);

  ogImageUrl.searchParams.set("heading", title);
  ogImageUrl.searchParams.set("type", "post");
  ogImageUrl.searchParams.set("mode", "dark");

  return {
    title: {
      default: title,
      template: "%s | Tommy Lunde Barvåg"
    },
    description,
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: ogImageUrl
    },
    openGraph: {
      title,
      type: "website",
      url: getAbsoluteUrl(),
      siteName: title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Tommy Lunde Barvåg."
        }
      ]
    },
    alternates: {
      canonical
    }
  };
}
