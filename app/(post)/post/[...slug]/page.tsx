import Heading from "@/components/heading";
import { Icons } from "@/components/icons";
import Link from "@/components/link";
import { Mdx } from "@/components/mdx/mdx";
import Text from "@/components/text";
import { allAuthors, allPosts } from "@/contentlayer/generated";
import { formatDate } from "@/lib/utils";
import "@/styles/mdx.css";
import Image from "next/image";
import { notFound } from "next/navigation";

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
    <article className="container relative max-w-3xl">
      <Link
        href="/post"
        className="absolute -left-[200px] hidden items-center justify-center xl:inline-flex"
        underline={false}
        data-animate
        style={{
          "--stagger": "10"
        }}
      >
        <Icons.ArrowLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        {post.date && (
          <time
            dateTime={post.date}
            className="block text-sm text-slate-300"
            data-animate
            style={{
              "--stagger": "1"
            }}
          >
            Published on {formatDate(post.date)}
          </time>
        )}
        <Heading
          variant="pageHeading"
          data-animate
          style={{
            "--stagger": "2"
          }}
        >
          {post.title}
        </Heading>
        {authors?.length ? (
          <div
            className="mt-4 flex space-x-4"
            data-animate
            style={{
              "--stagger": "3"
            }}
          >
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
                  <Text className="font-medium text-slate-100">{author.title}</Text>
                  <Text className="text-[12px] text-slate-300">@{author.twitter}</Text>
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
          data-animate
          style={{
            "--stagger": "4"
          }}
        />
      )}
      <Mdx
        code={post.body.code}
        data-animate
        style={{
          "--stagger": "5"
        }}
      />
      <hr
        className="my-4 border-slate-200"
        data-animate
        style={{
          "--stagger": "6"
        }}
      />
      <div
        className="flex justify-center py-6 lg:py-10"
        data-animate
        style={{
          "--stagger": "7"
        }}
      >
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
