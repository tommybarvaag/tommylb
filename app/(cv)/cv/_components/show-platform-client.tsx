"use client";

import { ReactNode, useEffect, useState } from "react";

import { PlatformReturnType, getPlatform } from "@/lib/actions/bowser-actions";

import { ShowPlatformContent } from "@/app/(cv)/cv/_components/show-platform-content";

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

  useEffect(() => {
    let isActive = true;

    getPlatform().then(nextPlatform => {
      if (isActive) {
        setPlatform(nextPlatform);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <ShowPlatformContent
      platform={platform}
      platforms={{ mobile, tablet, desktop, touch, bot, fallback }}
    />
  );
}
