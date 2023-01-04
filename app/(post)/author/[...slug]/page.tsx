import { allAuthors } from "@/contentlayer/generated";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import Image from "next/image";

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
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Image
        src={author.avatar}
        alt={author.title}
        width={108}
        height={108}
        className="rounded-full"
      />
      <div className="flex-1 text-left leading-tight">
        <p className="font-medium text-slate-100">{author.title}</p>
        <p className="text-[12px] text-slate-300">@{author.twitter}</p>
      </div>
    </article>
  );
}
