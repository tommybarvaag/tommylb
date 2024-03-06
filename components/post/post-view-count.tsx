import { getPost, incrementPostViews } from "@/lib/actions/post-actions";
import { cn } from "@/lib/utils";

async function PostViewCount({ slug }: { slug: string }) {
  const data = await getPost(slug);
  void incrementPostViews(slug);

  return (
    <div className={cn("flex min-h-[25px] items-center justify-end")}>
      {`${data.views} view${data?.views === 1 ? "" : "s"}`}
    </div>
  );
}

export { PostViewCount };
