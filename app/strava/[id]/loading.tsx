import { Skeleton } from "@/components/skeleton";

export default function StravaActivityLoading() {
  return (
    <article className="container relative max-w-3xl">
      <Skeleton className="h-5 absolute -left-[200px] hidden items-center justify-center xl:inline-flex" />
      <div>
        <Skeleton className="h-5 w-2/5 mb-8" />
        <div className="space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </div>
      </div>
    </article>
  );
}
