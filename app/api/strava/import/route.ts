import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // await strava.importActivities();
  return NextResponse.json({ status: "Imported" });
}
