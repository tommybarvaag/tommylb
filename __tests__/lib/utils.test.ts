import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";

import { getAbsoluteUrl } from "@/lib/utils";

const ENV_KEYS = ["NEXT_PUBLIC_APP_URL", "NEXT_PUBLIC_VERCEL_URL", "VERCEL_URL"] as const;

describe("getAbsoluteUrl", () => {
  const snapshot: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const key of ENV_KEYS) {
      snapshot[key] = process.env[key];
      delete process.env[key];
    }
  });

  afterEach(() => {
    for (const key of ENV_KEYS) {
      if (snapshot[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = snapshot[key];
      }
    }
  });

  it("falls back to localhost when no env vars are set", () => {
    expect(getAbsoluteUrl()).toBe("http://localhost:3000");
  });

  it("prefers the canonical NEXT_PUBLIC_APP_URL over Vercel host vars", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://tommylb.com";
    process.env.VERCEL_URL = "preview.vercel.app";

    expect(getAbsoluteUrl()).toBe("https://tommylb.com");
  });

  it("prefixes https:// onto a host-only VERCEL_URL", () => {
    process.env.VERCEL_URL = "preview.vercel.app";

    expect(getAbsoluteUrl()).toBe("https://preview.vercel.app");
  });

  it("strips a trailing slash from the base", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://tommylb.com/";

    expect(getAbsoluteUrl()).toBe("https://tommylb.com");
  });

  it("joins a path without collapsing the protocol or doubling slashes", () => {
    process.env.NEXT_PUBLIC_APP_URL = "https://tommylb.com";

    expect(getAbsoluteUrl("api/og")).toBe("https://tommylb.com/api/og");
    expect(getAbsoluteUrl("/api/og")).toBe("https://tommylb.com/api/og");
  });

  it("produces a value that new URL() accepts", () => {
    expect(() => new URL(getAbsoluteUrl())).not.toThrow();

    process.env.NEXT_PUBLIC_APP_URL = "https://tommylb.com";

    expect(() => new URL(getAbsoluteUrl())).not.toThrow();
  });
});
