import { withMethods } from "@/lib/api-middleware/with-methods";
import prisma from "@/lib/prisma";
import { kudosSchema } from "@/lib/validations/strava/kudos";
import type { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") {
    try {
      const body = JSON.parse(req.body);

      const payload = kudosSchema.parse(body);

      const activity = await prisma.stravaActivity.update({
        where: {
          id: payload.activityId
        },
        data: {
          kudosCount: payload.kudosCount
        }
      });

      return res.status(200).json(activity.kudosCount);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(422).end();
    }
  }
}

export default withMethods(["PATCH"], handler);
