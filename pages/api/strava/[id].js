import strava from "../../../lib/strava";

export default async (req, res) => {
  const { id } = req.query;

  const activity = await strava.getById(id);

  if (activity === null || activity === undefined) {
    return res.status(404).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(activity);
  }

  if (req.method === "DELETE") {
    await strava.remove(id);
    return res.status(204).json({});
  }

  return res.send("Method not allowed.");
};
