"use server";

import { headers as getHeaders } from "next/headers";

import Bowser from "bowser";

async function getPlatform() {
  try {
    const headers = await getHeaders();

    const browser = Bowser.parse(headers.get("user-agent") ?? "");

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

export { getPlatform };
export type { PlatformReturnType };
