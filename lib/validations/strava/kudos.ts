import * as z from "zod";

export const kudosSchema = z.object({
  activityId: z.number(),
  kudosCount: z.number()
});
