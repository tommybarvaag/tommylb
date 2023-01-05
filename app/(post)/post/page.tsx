import Heading from "@/components/heading";
import { Icons } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import { allPosts } from "@/contentlayer/generated";
import { formatDate } from "@/lib/utils";
import { compareDesc } from "date-fns";
import Image from "next/image";

export default async function BlogPage() {
  const posts = allPosts
    .filter(post => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <div className="relative container max-w-4xl">
      <Link
        href="/"
        className="absolute -left-[200px] hidden items-center justify-center xl:inline-flex"
        underline={false}
        data-animate
        style={{
          "--stagger": "10"
        }}
      >
        <Icons.BackToHome className="mr-2 h-4 w-4" />
        Home
      </Link>
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <Heading
            variant="pageHeading"
            data-animate
            style={{
              "--stagger": "1"
            }}
          >
            Blog
          </Heading>
          <Text
            data-animate
            style={{
              "--stagger": "2"
            }}
          >
            A blog built using Contentlayer. Posts are written in MDX.
          </Text>
        </div>
      </div>
      <hr
        className="my-8 border-slate-200"
        data-animate
        style={{
          "--stagger": "3"
        }}
      />
      {posts?.length ? (
        <div
          className="grid gap-10 sm:grid-cols-2"
          data-animate
          style={{
            "--stagger": "4"
          }}
        >
          {posts.map(post => (
            <article key={post._id} className="group relative flex flex-col space-y-2">
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={840}
                  height={450}
                  className="rounded-md border border-slate-900 bg-slate-900 transition-colors group-hover:border-slate-500"
                />
              )}
              <h2 className="text-2xl font-extrabold">{post.title}</h2>
              {post.description && <Text className="text-slate-300">{post.description}</Text>}
              {post.date && <Text className="text-sm text-slate-300">{formatDate(post.date)}</Text>}
              <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <Text>No posts published.</Text>
      )}
    </div>
  );
}
