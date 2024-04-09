// TODO: Update to app dir

import strava from "@/lib/strava";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const stravaRequestSchema = z
  .object({
    "hub.mode": z.string(),
    "hub.verify_token": z.string(),
    "hub.challenge": z.string()
  })
  .transform(data => ({
    mode: data["hub.mode"] ?? "",
    verifyToken: data["hub.verify_token"] ?? "",
    challenge: data["hub.challenge"] ?? ""
  }));

const stravaPostSchema = z.object({
  object_id: z.number(),
  object_type: z.string(),
  aspect_type: z.string(),
  updates: z.object({
    title: z.string().nullable()
  })
});

const revalidatePagesWithStravaData = async (res: NextApiResponse) => {
  try {
    await res.revalidate("/");
    await res.revalidate("/strava");
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
  }
};

export async function GET(request: NextRequest) {
  const VERIFY_TOKEN = "STRAVA";

  const params = await stravaRequestSchema.safeParseAsync(
    Object.fromEntries(request.nextUrl.searchParams)
  );

  if (!params.success) {
    return new Response("Bad data", { status: 400 });
  }

  const { mode, verifyToken, challenge } = params.data;

  if (mode === "subscribe" && verifyToken === VERIFY_TOKEN) {
    return NextResponse.json({ "hub.challenge": challenge });
  } else {
    // res.status(403).end("Verify tokens do not match");
    return new Response("Verify tokens do not match", { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();

    const body = await stravaPostSchema.safeParseAsync(res);

    console.log(body);

    if (!body.success) {
      return new Response("Bad data", { status: 400 });
    }

    const stravaId = body.data?.object_id?.toString();

    if (!body.data || body.data?.object_type !== "activity") {
      return new Response("Bad data", { status: 400 });
    }

    if (body.data?.aspect_type === "create") {
      await strava.getAndCreate(stravaId);
      await revalidatePagesWithStravaData(res);

      return new Response("Created", { status: 200 });
    }

    if (body.data?.aspect_type === "update" && body.data?.updates?.title !== null) {
      await strava.update(stravaId, {
        name: body.data?.updates.title
      });
      await revalidatePagesWithStravaData(res);

      return new Response("Updated", { status: 200 });
    }

    if (body.data?.aspect_type === "delete") {
      await strava.removeByStravaId(stravaId);
      await revalidatePagesWithStravaData(res);

      return new Response("Deleted", { status: 204 });
    }

    return new Response("Bad data", { status: 400 });
  } catch (err) {
    console.log(err);
    return new Response("Bad data", { status: 400 });
  }
}
