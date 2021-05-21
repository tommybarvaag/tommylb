import strava from "../../../lib/strava";

export default async function Activities(req, res) {
  if (req.method === "GET") {
    const entries = await strava.get();

    return res.status(200).json(entries);
  }

  return res.send("Method not allowed.");
}
