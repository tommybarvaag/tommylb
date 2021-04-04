import strava from "../../../lib/strava";

export default async (req, res) => {
  if (req.method === "GET") {
    await strava.importActivities();
    return res.status(200).json({ status: "Imported" });
  }

  return res.send("Method not allowed.");
};
