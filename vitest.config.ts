import { playwright } from "@vitest/browser-playwright";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  test: {
    projects: [
      {
        resolve: {
          alias: { "@": root }
        },
        test: {
          name: "unit",
          environment: "node",
          include: ["__tests__/**/*.test.ts"]
        }
      },
      {
        resolve: {
          alias: { "@": root }
        },
        test: {
          name: "browser",
          include: ["__tests__/**/*.browser.test.tsx"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }]
          }
        }
      }
    ]
  }
});
