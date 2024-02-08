"use client";

import { ShowPlatformContent } from "@/app/(cv)/cv/_components/show-platform-content";
import { PlatformReturnType, getPlatform } from "@/lib/actions/bowser-actions";
import { ReactNode, useEffect, useState } from "react";

const initialState: PlatformReturnType = {
  isBot: false,
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isTouch: false,
  isError: false
};

export function ShowPlatformClient({
  platforms: { mobile, tablet, desktop, touch, bot, fallback }
}: {
  platforms: {
    mobile?: ReactNode;
    tablet?: ReactNode;
    desktop?: ReactNode;
    touch?: ReactNode;
    bot?: ReactNode;
    fallback?: ReactNode;
  };
}) {
  const [platform, setPlatform] = useState<PlatformReturnType>(initialState);

  const get = getPlatform.bind(null);

  useEffect(() => {
    async function checkPlatform() {
      const platform = await get();

      setPlatform(platform);
    }

    checkPlatform();
  });

  return (
    <ShowPlatformContent
      platform={platform}
      platforms={{ mobile, tablet, desktop, touch, bot, fallback }}
    />
  );
}
