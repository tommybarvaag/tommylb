import { promises as fs } from "fs";
import path from "path";
import { beforeAll, describe, expect, it, vi } from "vitest";

// lib/posts.ts calls cacheLife() at invocation time; outside the Next
// runtime it throws, so neutralize it.
vi.mock("next/cache", () => ({ cacheLife: vi.fn() }));

import { getPostSlugs } from "@/lib/posts";
import { ogImageSchema } from "@/lib/validations/og";

import { sourceFiles } from "@/app/mdx/component-source";
import { metadataWithCustomOgImage } from "@/utils/metadata-utils";

const postsDirectory = path.join(process.cwd(), "app", "(main)", "post", "_posts");

// getPosts() cannot run under vitest (its dynamic .mdx import has no
// loader), so post meta is validated at the text level. All posts follow
// the same literal shape: export const meta = { date: "YYYY-MM-DD", ... };
async function readMetaDate(fileName: string) {
  const source = await fs.readFile(path.join(postsDirectory, fileName), "utf8");
  const metaBlock = source.match(/export const meta = \{([\s\S]*?)\};/)?.[1];
  const date = metaBlock?.match(/date:\s*"([^"]+)"/)?.[1];

  return { hasMetadataExport: source.includes("export const metadata"), date };
}

describe("post content contract", () => {
  let files: string[] = [];

  beforeAll(async () => {
    const entries = await fs.readdir(postsDirectory);
    files = entries.filter(file => file.endsWith(".mdx"));
  });

  it("getPostSlugs returns exactly the .mdx files", async () => {
    const slugs = await getPostSlugs();

    expect(slugs.toSorted()).toEqual(files.map(file => file.replace(/\.mdx$/, "")).toSorted());
    expect(slugs.length).toBeGreaterThan(0);
  });

  it("every post exports metadata and a parseable meta.date", async () => {
    for (const file of files) {
      const { hasMetadataExport, date } = await readMetaDate(file);

      expect(hasMetadataExport, `${file} must export const metadata`).toBe(true);
      expect(date, `${file} must have a quoted meta.date`).toBeTruthy();
      expect(
        Number.isFinite(new Date(date as string).getTime()),
        `${file} meta.date "${date}" must parse as a valid Date`
      ).toBe(true);
    }
  });
});

describe("og image param contract", () => {
  it("accepts boundary-valid params and applies the dark default", () => {
    const parsed = ogImageSchema.safeParse({ heading: "x".repeat(300), type: "y".repeat(60) });

    expect(parsed.success).toBe(true);
    expect(parsed.success ? parsed.data.mode : null).toBe("dark");
  });

  it("rejects out-of-contract params", () => {
    expect(ogImageSchema.safeParse({ type: "post" }).success).toBe(false);
    expect(ogImageSchema.safeParse({ heading: "x".repeat(301), type: "post" }).success).toBe(false);
    expect(ogImageSchema.safeParse({ heading: "x", type: "y".repeat(61) }).success).toBe(false);
    expect(ogImageSchema.safeParse({ heading: "x", type: "post", mode: "sepia" }).success).toBe(
      false
    );
  });

  it("metadataWithCustomOgImage builds og params that re-parse under the schema", () => {
    const metadata = metadataWithCustomOgImage("Title", "Description", "Curriculum Vitae — About");
    const images = metadata.openGraph?.images;
    const image = Array.isArray(images) ? images[0] : images;
    const url = new URL(
      String(typeof image === "object" && image !== null && "url" in image ? image.url : image)
    );

    expect(url.pathname).toBe("/api/og");
    expect(ogImageSchema.safeParse(Object.fromEntries(url.searchParams)).success).toBe(true);
  });
});

describe("ComponentSource src ↔ allowlist contract", () => {
  it("every ComponentSource src in MDX exists in the sourceFiles allowlist", async () => {
    const allowlistKeys = Object.keys(sourceFiles);

    const entries = await fs.readdir(postsDirectory);
    const mdxFiles = entries.filter(file => file.endsWith(".mdx"));
    const usages: string[] = [];

    for (const file of mdxFiles) {
      const mdxContent = await fs.readFile(path.join(postsDirectory, file), "utf8");
      const matches = mdxContent.matchAll(/<ComponentSource\s+src="([^"]+)"/g);
      for (const match of matches) {
        usages.push(match[1]);
      }
    }

    expect(allowlistKeys.length).toBeGreaterThan(0);
    expect(usages.length).toBeGreaterThan(0);

    for (const src of usages) {
      expect(
        allowlistKeys.includes(src),
        `ComponentSource src "${src}" must be in the sourceFiles allowlist`
      ).toBe(true);
    }
  });
});
