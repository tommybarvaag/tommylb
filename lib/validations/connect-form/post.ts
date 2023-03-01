import * as z from "zod";

export const connectFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  phone: z.string().optional(),
  location: z.string().optional()
});
