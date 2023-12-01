"use server";

import Bowser from "bowser";
import { revalidatePath } from "next/cache";
import { headers as getHeaders } from "next/headers";

function getPlatform() {
  const headers = getHeaders();

  try {
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

function shouldRevalidatePlatform(platform: ReturnType<typeof getPlatform>) {
  const checkDate = getPlatform();

  const platformChanged =
    platform.isMobile !== checkDate.isMobile ||
    platform.isTablet !== checkDate.isTablet ||
    platform.isDesktop !== checkDate.isDesktop ||
    platform.isTouch !== checkDate.isTouch;

  if (platformChanged) {
    revalidatePath("/", "layout");
  }
}

export { getPlatform, shouldRevalidatePlatform };
