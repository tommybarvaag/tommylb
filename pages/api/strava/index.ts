import strava from "@/lib/strava";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Activities(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const entries = await strava.get();

    return res.status(200).json(entries);
  }

  return res.send("Method not allowed.");
}
