import strava from "@/lib/strava";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const entries = await strava.getStats();

  return NextResponse.json(entries);
}
