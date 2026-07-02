"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

type UseRouteModalOptions = {
  /**
   * Mount closed and open on the next frame so Base UI runs its entry
   * transition — a popup mounted with `open` already true skips
   * `data-starting-style`. Disable for server-rendered pages that must
   * paint open before hydration.
   */
  animateIn?: boolean;
  /** Runs after the exit transition completes; defaults to router.back(). */
  onClosed?: () => void;
};

export function useRouteModal({ animateIn = true, onClosed }: UseRouteModalOptions = {}) {
  const router = useRouter();
  const [open, setOpen] = useState(!animateIn);

  useEffect(() => {
    if (animateIn) {
      // intentional entry-animation flip; runs once
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  function onOpenChangeComplete(nextOpen: boolean) {
    if (nextOpen) {
      return;
    }

    if (onClosed) {
      onClosed();

      return;
    }

    router.back();
  }

  return { open, onOpenChange: setOpen, onOpenChangeComplete };
}
