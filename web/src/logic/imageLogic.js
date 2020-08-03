import { getSocialMediaImageUrl } from "../lib/sanity/api";

export const getSocialMediaImageFromPage = page => {
  const openGraphImageAsset = page?.openGraph?.image?.asset;
  if (openGraphImageAsset !== null && openGraphImageAsset !== undefined) {
    return getSocialMediaImageUrl(openGraphImageAsset);
  }

  const mainImageAsset = page?.mainImage?.asset;

  if (mainImageAsset !== null && mainImageAsset !== undefined) {
    return getSocialMediaImageUrl(mainImageAsset);
  }

  return "https://tommylb.com/logo.png";
};
