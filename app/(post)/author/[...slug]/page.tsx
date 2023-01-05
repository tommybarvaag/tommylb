import Heading from "@/components/heading";
import { Icons } from "@/components/icons";
import Text from "@/components/text";

import Link from "@/components/link";
import { allAuthors } from "@/contentlayer/generated";
import { notFound } from "next/navigation";

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

export default async function PostPage({ params }: PostPageProps) {
  const pageSlug = params?.slug?.join("/");

  const author = allAuthors.find(({ slugAsParams }) => slugAsParams === pageSlug);

  if (!author) {
    notFound();
  }

  return (
    <article className="relative container  max-w-3xl">
      <Link
        href="/author"
        className="absolute -left-[200px] hidden items-center justify-center xl:inline-flex"
        underline={false}
        data-animate
        style={{
          "--stagger": "10"
        }}
      >
        <Icons.ArrowLeft className="mr-2 h-4 w-4" />
        Authors
      </Link>
      <div>
        <Heading
          data-animate
          style={{
            "--stagger": "1"
          }}
        >
          {author.title}
        </Heading>
        <Text
          data-animate
          style={{
            "--stagger": "2"
          }}
        >
          Desc...
        </Text>
      </div>
    </article>
  );
}
