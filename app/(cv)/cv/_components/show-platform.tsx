import { ShowPlatformContent } from "@/app/(cv)/cv/_components/show-platform-content";
import { getPlatform } from "@/lib/actions/bowser-actions";
import { type ReactNode } from "react";

function ShowPlatform({
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
  const platform = getPlatform();

  return (
    <ShowPlatformContent
      platform={platform}
      platforms={{ mobile, tablet, desktop, touch, bot, fallback }}
    />
  );
}

export { ShowPlatform };
