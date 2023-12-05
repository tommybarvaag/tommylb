"use client";

import { Icons } from "@/components/icons";
import Text from "@/components/text";
import { debounce } from "@/lib/debounce";
import { cn } from "@/lib/utils";
import { kudosSchema } from "@/lib/validations/strava/kudos";
import type { StravaActivity } from "@prisma/client";
import useLocalStorage from "hooks/use-local-storage";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef, useMemo, useState, useTransition } from "react";
import type { infer as zodInfer } from "zod";

type StravaActivityKudosFormData = zodInfer<typeof kudosSchema>;

async function patchStravaActivityKudos(url: string, body: StravaActivityKudosFormData) {
  return fetch(url, {
    method: "PATCH",
    body: JSON.stringify(body)
  }).then(res => res.json());
}

const debouncedPatchStravaActivityKudos = debounce(patchStravaActivityKudos, 1000);

type StravaActivityKudosProps = ComponentPropsWithoutRef<"button"> & {
  activityId: StravaActivity["id"];
  kudosCount: StravaActivity["kudosCount"];
};

const StravaActivityKudos = ({ activityId, kudosCount, ...other }: StravaActivityKudosProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = useMemo(() => isFetching || isPending, [isFetching, isPending]);
  const [toggled, setToggled] = useLocalStorage(`strava-toggle-${activityId}`, false);

  const handleClick = async () => {
    setIsFetching(true);

    const newKudosCount = toggled ? kudosCount - 1 : kudosCount + 1;

    setToggled(toggle => !toggle);

    await debouncedPatchStravaActivityKudos("/api/strava/kudos", {
      activityId,
      kudosCount: newKudosCount
    });

    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <button
      className={cn(
        "group flex min-w-[85px] cursor-pointer select-none items-center justify-center gap-2 rounded-full border bg-zinc-800 px-4 hover:border-zinc-500 active:border-zinc-300",
        {
          "before:absolute before:inset-0 before:flex before:items-center before:justify-center before:rounded-full before:border-transparent before:bg-zinc-800 before:text-sm before:content-['Loading...']":
            false
        }
      )}
      onClick={handleClick}
      disabled={isMutating}
      {...other}
    >
      {isMutating ? (
        <Icons.Spinner className="h-5 w-5" />
      ) : (
        <Icons.Fire className="h-5 w-5 group-hover:text-zinc-500 group-active:text-zinc-300" />
      )}
      <Text className="mb-0 group-hover:text-zinc-500 group-active:text-zinc-300" noMargin>
        {kudosCount}
      </Text>
    </button>
  );
};

export { StravaActivityKudos };
