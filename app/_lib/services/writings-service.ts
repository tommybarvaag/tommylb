import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";
import { z } from "zod";

// Metadata schema validation
const MetadataSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  alternates: z.object({ canonical: z.string().optional() }).optional()
});

/**
 * Retrieves writings with metadata and slugs.
 * @returns List of writings with slugs, titles, and descriptions
 */
const getWritings = cache(async () => {
  const directory = path.join(process.cwd(), "app", "(main)", "writings");

  try {
    const folders = await fs.readdir(directory);

    const writings = await Promise.all(
      folders.map(async slug => {
        const filePath = path.join(directory, slug, "page.mdx");

        try {
          const content = await fs.readFile(filePath, "utf-8");
          const match = content.match(/export\s+const\s+metadata\s*=\s*({[\s\S]*?});/);

          if (!match) {
            console.log(slug, "123");
            return null;
          }

          const metadata = MetadataSchema.safeParse(eval(`(${match[1]})`));

          if (!metadata.success) {
            console.log(metadata.error.errors);
            return null;
          }

          return {
            slug: `/writings/${slug}`,
            title: metadata.data.title,
            description: metadata.data.description || ""
          };
        } catch (error) {
          console.log(error);

          return null;
        }
      })
    );

    return writings.filter(Boolean);
  } catch {
    return [];
  }
});

export { getWritings };
