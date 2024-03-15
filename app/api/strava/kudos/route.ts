import { db } from "@/db/db";
import { stravaActivity } from "@/db/schema";
import { kudosSchema } from "@/lib/validations/strava/kudos";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function PATCH(request: NextRequest) {
  try {
    const res = await request.json();

    const payload = kudosSchema.parse(res);

    const activity = await db
      .update(stravaActivity)
      .set({
        kudosCount: payload.kudosCount
      })
      .where(eq(stravaActivity.id, payload.activityId))
      .returning()
      .get();

    return NextResponse.json(activity.kudosCount);
  } catch (error) {
    console.error(JSON.stringify(error));
    if (error instanceof z.ZodError) {
      return NextResponse.json({ status: 422, body: error.issues });
    }

    return new NextResponse(error, {
      status: 422
    });
  }
}
