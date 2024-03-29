import { PlatformReturnType } from "@/lib/actions/bowser-actions";
import { ShowPlatformProps } from "@/types";

function ShowPlatformContent({
  platform,
  platforms: { mobile, tablet, desktop, touch, bot, fallback }
}: ShowPlatformProps & {
  platform: PlatformReturnType;
}) {
  if (platform.isError && fallback) {
    return <>{fallback}</>;
  }

  if (platform.isBot) {
    // find any available react node and prioritize the following order:
    // 1. bot
    // 2. fallback
    // 3. desktop
    // 4. touch
    // 5. mobile
    // 6. tablet
    const node = bot || fallback || desktop || touch || mobile || tablet;
    return node ? <>{node}</> : null;
  }

  if (platform.isMobile && mobile) {
    return <>{mobile}</>;
  }

  if (platform.isTablet && tablet) {
    return <>{tablet}</>;
  }

  if (platform.isDesktop && desktop) {
    return <>{desktop}</>;
  }

  if (platform.isTouch && touch) {
    return <>{touch}</>;
  }

  return null;
}

export { ShowPlatformContent };
