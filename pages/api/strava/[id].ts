import strava from "@/lib/strava";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Activity(req: NextApiRequest, res: NextApiResponse) {
  const id: number = +req.query?.id;

  const activity = await strava.getById(id);

  if (activity === null || activity === undefined) {
    return res.status(404).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(activity);
  }

  if (req.method === "DELETE") {
    await strava.removeById(id);
    return res.status(204).json({});
  }

  return res.send("Method not allowed.");
}
