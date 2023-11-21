import { Heading } from "@/components/heading";
import Text from "@/components/text";
import { allAuthors } from "@/contentlayer/generated";
import { notFound } from "next/navigation";

import { HistoryBackLink } from "@/components/history-back-link";
import "@/styles/mdx.css";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return allAuthors.map(post => ({
    slug: post.slugAsParams.split("/")
  }));
}

export default async function AuthorPage({ params }: PostPageProps) {
  const pageSlug = params?.slug?.join("/");

  const author = allAuthors.find(({ slugAsParams }) => slugAsParams === pageSlug);

  if (!author) {
    notFound();
  }

  return (
    <article className="container relative max-w-3xl">
      <HistoryBackLink href="/author">Authors</HistoryBackLink>
      <div>
        <Heading>{author.title}</Heading>
        <Text>Desc...</Text>
      </div>
    </article>
  );
}
