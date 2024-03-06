"use server";

import Bowser from "bowser";
import { revalidatePath } from "next/cache";
import { headers as getHeaders } from "next/headers";

async function getPlatform() {
  try {
    const headers = getHeaders();

    const browser = Bowser.parse(headers.get("user-agent"));

    const { isMobile, isTablet, isDesktop, isTouch, isBot, isError } = {
      isMobile: browser.platform.type === "mobile",
      isTablet: browser.platform.type === "tablet",
      isDesktop: browser.platform.type === "desktop",
      isTouch: browser.platform.type === "mobile" || browser.platform.type === "tablet",
      isBot: browser.platform.type === "bot",
      isError: !browser.platform.type
    };

    return { isMobile, isTablet, isDesktop, isTouch, isBot, isError };
  } catch (error) {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isTouch: false,
      isBot: false,
      isError: true
    };
  }
}

type PlatformReturnType = Awaited<ReturnType<typeof getPlatform>>;

async function shouldRevalidatePlatform(platform: PlatformReturnType) {
  const up = await getPlatform();

  const platformChanged =
    platform.isMobile !== up.isMobile ||
    platform.isTablet !== up.isTablet ||
    platform.isDesktop !== up.isDesktop ||
    platform.isTouch !== up.isTouch;

  if (platformChanged) {
    revalidatePath("/", "layout");
  }
}

export { getPlatform, shouldRevalidatePlatform };
export type { PlatformReturnType };
