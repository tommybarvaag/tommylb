import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn("h-5 w-1/5 animate-pulse rounded-lg bg-zinc-800", className)} {...props} />
  );
}
