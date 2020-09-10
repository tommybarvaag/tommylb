import nextConnect from "next-connect";
import { getAllStravaActivities } from "../../../lib/mongodb/dbConnection";
import mongodb from "../../../middleware/mongodb";

const handler = nextConnect();

handler.use(mongodb);

handler.get(async (req, res) => {
  let activities = await getAllStravaActivities();

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(activities));
});

export default handler;
