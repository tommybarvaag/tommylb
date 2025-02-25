import { headers } from "next/headers";

type Platform = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  isBot: boolean;
  isError: boolean;
};

async function getPlatform(): Promise<Platform> {
  // Safely get headers using next/headers
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";

  // Detect device types based on user-agent
  const isMobile = /mobile/i.test(userAgent) && !/tablet/i.test(userAgent);
  const isTablet = /tablet/i.test(userAgent);
  // If not mobile or tablet, assume desktop
  const isDesktop = !isMobile && !isTablet;

  // Bot detection
  const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(userAgent);

  // Touch detection - note that this can't be reliably determined from user-agent alone
  // For server-side, we can make educated guesses based on device type
  // For better support you can use a library like https://github.com/bowser-js/bowser
  const isTouch = isMobile || isTablet;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    isBot,
    isError: false
  };
}

// Example usage in a Server Component
export async function ShowPlatform({
  platforms
}: {
  platforms: {
    mobile: React.ReactNode;
    tablet: React.ReactNode;
    desktop: React.ReactNode;
    touch: React.ReactNode;
    bot: React.ReactNode;
    fallback: React.ReactNode;
  };
}) {
  const platform = await getPlatform();

  return <ShowPlatformContent platform={platform} platforms={platforms} />;
}

// This would be your client component that receives the platform info
function ShowPlatformContent({
  platform,
  platforms
}: {
  platform: Platform;
  platforms: {
    mobile: React.ReactNode;
    tablet: React.ReactNode;
    desktop: React.ReactNode;
    touch: React.ReactNode;
    bot: React.ReactNode;
    fallback: React.ReactNode;
  };
}) {
  if (platform.isError) return platforms.fallback;
  if (platform.isBot) return platforms.bot;
  if (platform.isMobile) return platforms.mobile;
  if (platform.isTablet) return platforms.tablet;
  if (platform.isTouch) return platforms.touch;
  return platforms.desktop;
}
