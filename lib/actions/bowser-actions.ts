"use server";

import Bowser from "bowser";
import { revalidatePath } from "next/cache";
import { headers as getHeaders } from "next/headers";

function getPlatform() {
  const headers = getHeaders();

  const browser = Bowser.parse(headers.get("user-agent"));

  const { isMobile, isTablet, isDesktop, isTouch } = {
    isMobile: browser.platform.type === "mobile",
    isTablet: browser.platform.type === "tablet",
    isDesktop: browser.platform.type === "desktop",
    isTouch: browser.platform.type === "mobile" || browser.platform.type === "tablet"
  };

  return { isMobile, isTablet, isDesktop, isTouch };
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
