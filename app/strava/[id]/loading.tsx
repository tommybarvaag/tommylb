import { Skeleton } from "@/components/skeleton";

export default function StravaActivityLoading() {
  return (
    <article className="container relative max-w-3xl">
      <Skeleton className="absolute -left-[200px] hidden h-5 items-center justify-center xl:inline-flex" />
      <div>
        <Skeleton className="mb-8 h-5 w-2/5" />
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
