import nextConnect from "next-connect";
import mongodb from "../../../middleware/mongodb";
import strava from "../../../middleware/strava";

const handler = nextConnect()
  .use(mongodb)
  .use(strava)
  .get(async (req, res) => {
    const VERIFY_TOKEN = "STRAVA";
    // Parses the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Verifies that the mode and token sent are valid
      if (mode === "subscribe" && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.json({ "hub.challenge": challenge });
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.status(403).end("Verify tokens do not match");
      }
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.status(403).end("No mode or verify token present");
    }
  })
  .post(async (req, res) => {
    const { body } = req;
    console.log(JSON.stringify(body));

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
