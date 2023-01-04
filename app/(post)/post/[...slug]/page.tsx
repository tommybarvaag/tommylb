import { allAuthors, allPosts } from "@/contentlayer/generated";
import { notFound } from "next/navigation";

import { Icons } from "@/components/icons";
import { Mdx } from "@/components/mdx/mdx";
import { formatDate } from "@/lib/utils";
import "@/styles/mdx.css";
import Image from "next/image";
import Link from "next/link";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return allPosts.map(post => ({
    slug: post.slugAsParams.split("/")
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find(post => post.slugAsParams === slug);

  if (!post) {
    notFound();
  }

  const authors = post.authors.reduce((accumulator, author) => {
    const foundAuthor = allAuthors.find(({ slug }) => slug === `/author/${author}`);
    if (foundAuthor) {
      accumulator.push(foundAuthor);
    }
    return accumulator;
  }, []);

  return (
    <article className="container relative max-w-3xl py-6 lg:py-12">
      <Link
        href="/post"
        className="absolute top-14 -left-[200px] hidden items-center justify-center text-sm font-medium text-slate-300 hover:text-slate-100 xl:inline-flex"
      >
        <Icons.ChevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        {post.date && (
          <time dateTime={post.date} className="block text-sm text-slate-300">
            Published on {formatDate(post.date)}
          </time>
        )}
        <h1 className="mt-2 inline-block text-4xl font-extrabold leading-tight text-slate-100 lg:text-5xl">
          {post.title}
        </h1>
        {authors?.length ? (
          <div className="mt-4 flex space-x-4">
            {authors.map(author => (
              <Link
                key={author._id}
                href={`https://twitter.com/${author.twitter}`}
                className="flex items-center space-x-2 text-sm"
              >
                <Image
                  src={author.avatar}
                  alt={author.title}
                  width={42}
                  height={42}
                  className="rounded-full"
                />
                <div className="flex-1 text-left leading-tight">
                  <p className="font-medium text-slate-100">{author.title}</p>
                  <p className="text-[12px] text-slate-300">@{author.twitter}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={840}
          height={450}
          className="my-8 rounded-md border border-slate-200 bg-slate-200 transition-colors group-hover:border-slate-900"
        />
      )}
      <Mdx code={post.body.code} />
      <hr className="my-4 border-slate-200" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/post"
          className="inline-flex items-center justify-center text-sm font-medium text-slate-300 hover:text-slate-100"
        >
          <Icons.ChevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  );
}
