import strava from "@/lib/strava";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Import(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await strava.importActivities();
    return res.status(200).json({ status: "Imported" });
  }

  return res.send("Method not allowed.");
}
