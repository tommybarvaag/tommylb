import strava from "../../../lib/strava";

export default async (req, res) => {
  const { id } = req.query;

  if (req.method === "GET") {
    const activity = strava.getById(id);
    return res.status(200).json(activity);
  }

  if (req.method === "DELETE") {
    await strava.remove(id);
    return res.status(204).json({});
  }

  return res.send("Method not allowed.");
};
