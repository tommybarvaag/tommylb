import { getPlatform } from "@/lib/actions/bowser-actions";
import { Platform } from "@/types";
import { type ReactNode } from "react";

function ShowPlatform({ platforms, children }: { platforms: Platform[]; children: ReactNode }) {
  const platform = getPlatform();

  const shouldShowChildren = platforms.some(p => {
    if (p === "mobile") return platform.isMobile;
    if (p === "tablet") return platform.isTablet;
    if (p === "desktop") return platform.isDesktop;
    if (p === "touch") return platform.isTouch;
  });

  return <>{shouldShowChildren ? children : null}</>;
}

export { ShowPlatform };
