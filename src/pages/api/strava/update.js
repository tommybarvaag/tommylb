import nextConnect from "next-connect";
import mongodb from "../../../middleware/mongodb";
import strava from "../../../middleware/strava";

const handler = nextConnect()
  .use(mongodb)
  .use(strava)
  .get(async (req, res) => {
    const VERIFY_TOKEN = "STRAVA";
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      res.json({ "hub.challenge": challenge });
    } else {
      res.status(403).end("Verify tokens do not match");
    }
  })
  .post(async (req, res) => {
    const { body } = req;

    if (!body || body.object_type !== "activity") {
      res.status(200).end();
    }

    if (body.aspect_type === "create") {
      const activity = await req.stravaClient.activities.get({
        id: body.object_id
      });

      await req.mongodb.collection("strava").insertOne(activity);

      res.status(200).end();
    }

    if (body.aspect_type === "update") {
      await req.mongodb.collection("strava").findOneAndUpdate(
        { id: body.object_id },
        {
          $set:
            body.updates && body.updates.title
              ? { ...body.updates, name: body.updates.title }
              : { ...body.updates }
        }
      );

      res.status(200).end();
    }

    if (body.aspect_type === "delete") {
      await req.mongodb.collection("strava").deleteOne({ id: body.object_id });

      res.status(200).end();
    }

    res.status(200).end();
  });

export default handler;
