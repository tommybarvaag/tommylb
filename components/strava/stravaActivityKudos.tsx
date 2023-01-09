"use client";

import { debounce } from "@/lib/debounce";
import { kudosSchema } from "@/lib/validations/strava/kudos";
import type { StravaActivity } from "@prisma/client";
import useLocalStorage from "hooks/use-local-storage";
import { ComponentPropsWithoutRef, useState } from "react";
import type { infer as zodInfer } from "zod";
import { Icons } from "../icons";
import Text from "../text";

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

const StravaActivityKudos = ({
  activityId,
  kudosCount: initialKudosCount,
  ...other
}: StravaActivityKudosProps) => {
  const [toggled, setToggled] = useLocalStorage(`strava-toggle-${activityId}`, false);
  const [kudosCount, setKudosCount] = useState(initialKudosCount);

  const handleClick = async () => {
    const newKudosCount = toggled ? kudosCount - 1 : kudosCount + 1;

    setToggled(toggle => !toggle);
    setKudosCount(() => newKudosCount);

    await debouncedPatchStravaActivityKudos("/api/strava/kudos", {
      activityId,
      kudosCount: newKudosCount
    });
  };

  return (
    <button
      className="group cursor-pointer flex gap-2 items-center select-none border rounded-full px-4 hover:border-zinc-500 active:border-zinc-300"
      onClick={handleClick}
      {...other}
    >
      <Icons.Fire className="h-5 w-5 group-hover:text-zinc-500 group-active:text-zinc-300" />
      <Text className="mb-0 group-hover:text-zinc-500 group-active:text-zinc-300">
        {kudosCount}
      </Text>
    </button>
  );
};

export { StravaActivityKudos };
