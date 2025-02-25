import { formatSlug } from "@/lib/utils";
import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";

/**
 * Retrieves writings with metadata and slugs.
 * @returns List of writings with slugs, titles, and descriptions
 */
const getWritings = cache(async () => {
  const directory = path.join(process.cwd(), "app", "(main)", "writings");

  try {
    const folders = await fs.readdir(directory, {
      withFileTypes: true
    });

    const writings = await Promise.all(
      folders
        .filter(x => x.isDirectory())
        .map(async slug => {
          return {
            slug: `/writings/${slug.name}`,
            title: formatSlug(slug.name)
          };
        })
    );

    return writings.filter(Boolean);
  } catch {
    return [];
  }
});

export { getWritings };
