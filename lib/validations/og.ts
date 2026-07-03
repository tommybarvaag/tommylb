import * as z from "zod";

export const ogImageSchema = z.object({
  heading: z.string().min(1).max(300),
  type: z.string().min(1).max(60),
  mode: z.enum(["light", "dark"]).default("dark")
});
