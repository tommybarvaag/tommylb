import strava from "@/lib/strava";
import { NextApiRequest, NextApiResponse } from "next";

interface StravaNextApiRequest extends NextApiRequest {
  body: {
    object_id: number;
    object_type: string;
    aspect_type: string;
    updates: {
      title: string;
    };
  };
}

const revalidatePagesWithStravaData = async (res: NextApiResponse) => {
  try {
    await res.revalidate("/");
    await res.revalidate("/strava");
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
  }
};

export default async function Update(req: StravaNextApiRequest, res: NextApiResponse) {
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
    const stravaId = body.object_id?.toString();

    if (!body || body.object_type !== "activity") {
      return res.status(400).end();
    }

    if (body.aspect_type === "create") {
      await strava.getAndCreate(stravaId);
      await revalidatePagesWithStravaData(res);

      return res.status(200).end();
    }

    if (body.aspect_type === "update" && body?.updates?.title !== null) {
      await strava.update(stravaId, {
        name: body.updates.title
      });
      await revalidatePagesWithStravaData(res);

      return res.status(200).end();
    }

    if (body.aspect_type === "delete") {
      await strava.removeByStravaId(stravaId);
      await revalidatePagesWithStravaData(res);

      return res.status(204).end();
    }

    return res.status(400).end();
  }

  return res.send("Method not allowed.");
}
