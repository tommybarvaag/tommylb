"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const ActivityYearSelect = ({ years }: { years: string[] }) => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectProps: React.ComponentPropsWithoutRef<typeof Select> = searchParams.has("year")
    ? {
        defaultValue: searchParams.get("year")
      }
    : {};

  return (
    <Select
      onValueChange={value => {
        // add to search params
        const searchParams = new URLSearchParams(window.location.search);

        if (value === "all") {
          searchParams.delete("year");
        } else {
          searchParams.set("year", value);
        }

        // update url
        router.push(window.location.pathname + "?" + searchParams.toString(), {
          forceOptimisticNavigation: true
        });

        // start transition
        startTransition(() => {
          // Refresh the current route and fetch new data from the server without
          // losing client-side browser or React state.
          router.refresh();
        });
      }}
      disabled={isPending}
      {...selectProps}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Compare year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {years?.map(year => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const ActivityYearSelectSkeleton = () => {
  return (
    <div className="w-[180px]">
      <div className="h-[38px] animate-pulse rounded-lg bg-zinc-700"></div>
    </div>
  );
};

export { ActivityYearSelect, ActivityYearSelectSkeleton };
