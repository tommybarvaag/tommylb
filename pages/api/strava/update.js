import strava from "../../../lib/strava";

export default async (req, res) => {
  if (req.method === "GET") {
    const VERIFY_TOKEN = "STRAVA";
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      res.json({ "hub.challenge": challenge });
    } else {
      res.status(403).end("Verify tokens do not match");
    }
  }

  if (req.method === "POST") {
    const { body } = req;

    if (!body || body.object_type !== "activity") {
      res.status(200).end();
    }

    if (body.aspect_type === "create") {
      await strava.getAndCreate(body.object_id);
      res.status(200).end();
    }

    if (body.aspect_type === "update" && body?.updates?.title !== null) {
      await strava.update(body.object_id, {
        name: body.updates.title
      });

      res.status(200).end();
    }

    if (body.aspect_type === "delete") {
      await strava.remove(body.object_id);

      res.status(200).end();
    }

    res.status(200).end();
  }

  return res.send("Method not allowed.");
};
