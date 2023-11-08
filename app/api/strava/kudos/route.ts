import prisma from "@/lib/prisma";
import { kudosSchema } from "@/lib/validations/strava/kudos";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function PATCH(request: NextRequest) {
  try {
    const res = await request.json();

    const payload = kudosSchema.parse(res);

    const activity = await prisma.stravaActivity.update({
      where: {
        id: payload.activityId
      },
      data: {
        kudosCount: payload.kudosCount
      }
    });

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
