import { getAbsoluteUrl } from "@/lib/utils";
import { ServerRuntime } from "next";
import { permanentRedirect } from "next/navigation";

export const runtime: ServerRuntime = "edge";

export async function GET(request: Request) {
  return permanentRedirect(`${getAbsoluteUrl()}/cv/about`);
}
