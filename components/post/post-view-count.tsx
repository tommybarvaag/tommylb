"use client";

import fetcher from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { postSchema } from "@/lib/validations/post/post";
import { Post } from "@prisma/client";
import { FC, useEffect } from "react";
import useSWR from "swr";
import { Icons } from "../icons";

type PostViewCountProps = {
  slug: string;
};

const PostViewCount: FC<React.ComponentPropsWithoutRef<"div"> & PostViewCountProps> = ({
  slug,
  className,
  ...other
}) => {
  const { data, mutate } = useSWR<Post>(`/api/post/${slug}`, fetcher);

  useEffect(() => {
    const patchViewCount = async () => {
      const res = await fetch(`/api/post/view`, {
        method: "PATCH",
        body: JSON.stringify({ slug })
      }).then(res => res.json());

      const patchedPost = postSchema.safeParse(res);

      if (patchedPost.success) {
        mutate(patchedPost.data as Post, false);
      }
    };

    patchViewCount();
  }, [slug, mutate]);

  return (
    <div className={cn("flex min-h-[25px] items-center", className)} {...other}>
      {data ? (
        `${data.views} view${data?.views === 1 ? "" : "s"}`
      ) : (
        <Icons.Spinner className="h-5 w-5" />
      )}
    </div>
  );
};

export { PostViewCount };
