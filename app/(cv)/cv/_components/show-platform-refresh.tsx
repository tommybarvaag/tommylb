"use client";

import { getPlatform, shouldRevalidatePlatform } from "@/lib/actions/bowser-actions";
import { useEffect } from "react";

export function ShowPlatformRefresh({ platform }: { platform: ReturnType<typeof getPlatform> }) {
  const check = shouldRevalidatePlatform.bind(null, platform);

  useEffect(() => {
    const onResize = () => {
      check();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [check]);

  return null;
}
