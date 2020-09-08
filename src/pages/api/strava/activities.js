import nextConnect from "next-connect";
import mongodb from "../../../middleware/mongodb";

const handler = nextConnect();

handler.use(mongodb);

handler.get(async (req, res) => {
  let cursor = await req.mongodb.collection("strava").find({}).project({
    name: true,
    distance: true,
    moving_time: true,
    type: true,
    id: true,
    start_date: true,
    start_date_local: true,
    location_country: true,
    kudos_count: true,
    average_speed: true,
    max_speed: true,
    has_heartrate: true,
    average_heartrate: true,
    max_heartrate: true,
    suffer_score: true
  });

  let activities = [];

  while (await cursor.hasNext()) {
    const activity = await cursor.next();
    activities.push(activity);
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(activities));
});

export default handler;
