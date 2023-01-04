import { allAuthors } from "@/contentlayer/generated";
import Link from "next/link";

import Image from "next/image";

export default async function BlogPage() {
  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-extrabold tracking-tight text-slate-100 lg:text-5xl">
            Authors
          </h1>
          <p className="text-xl text-slate-300">A list of authors.</p>
        </div>
      </div>
      <hr className="my-8 border-slate-200" />
      {allAuthors?.length ? (
        <div className="mt-4 flex space-x-4">
          {allAuthors.map(author => (
            <Link
              key={author._id}
              href={author.slug}
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
  );
}
