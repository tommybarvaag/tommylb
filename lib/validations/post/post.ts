import * as z from "zod";

export const postSchema = z.object({
  slug: z.string(),
  views: z.number().optional()
});
