import { allDocuments } from "@/contentlayer/generated";

interface MdxHeadProps {
  params: {
    slug?: string[];
  };
}

export default function MdxHead({ params }: MdxHeadProps) {
  const slug = params?.slug?.join("/") || "";
  const mdxDoc = allDocuments.find(doc => doc.slugAsParams === slug);

  if (!mdxDoc) {
    return null;
  }

  const title = `${mdxDoc.title} - tommylb.com`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={mdxDoc.description} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://tommylb.com" />
      <meta property="og:image" content="https://tommylb.com/og.jpg" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://tommylb.com" />
      <meta property="twitter:image" content="https://tommylb.com/og.jpg" />
    </>
  );
}
