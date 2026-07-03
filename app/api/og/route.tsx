import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ogImageSchema } from "@/lib/validations/og";

// Satori parses fonts with a DataView, which requires an ArrayBuffer — Node's readFile
// returns a Buffer (a view over a possibly-larger pool), so slice out its exact bytes.
function toArrayBuffer(buffer: Buffer): ArrayBuffer {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer;
}

function getFontSize(heading: string) {
  switch (true) {
    case heading.length > 80:
      return "70px";
    case heading.length > 50:
      return "80px";
    case heading.length > 45:
      return "90px";
    case heading.length > 40:
      return "100px";
    case heading.length > 35:
      return "110px";
    default:
      return "120px";
  }
}

// Read once per instance: the assets are immutable at runtime, and junk
// requests must be rejected before touching the filesystem.
// Node.js runtime (edge is unsupported under Cache Components): read bundled assets from
// the filesystem via fs.readFile. Node's fetch() cannot load file: URLs, so the previous
// fetch(new URL(..., import.meta.url)) pattern only worked on edge.
async function readAssets() {
  const [fontRegular, fontBold, image] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Geist-Regular.otf")),
    readFile(join(process.cwd(), "assets/fonts/Geist-Bold.otf")),
    readFile(join(process.cwd(), "public/images/tommy-zoom-256.jpg"))
  ]);

  return {
    fontRegularData: toArrayBuffer(fontRegular),
    fontBoldData: toArrayBuffer(fontBold),
    imageData: toArrayBuffer(image)
  };
}

let assetsPromise: ReturnType<typeof readAssets> | null = null;

function loadAssets() {
  assetsPromise ??= readAssets();

  return assetsPromise;
}

export async function GET(request: NextRequest) {
  const parsed = ogImageSchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));

  if (!parsed.success) {
    return new Response("Invalid og image params", { status: 400 });
  }

  try {
    const { fontRegularData, fontBoldData, imageData } = await loadAssets();

    const values = parsed.data;
    const heading =
      values.heading.length > 140 ? `${values.heading.substring(0, 140)}...` : values.heading;

    const { mode } = values;
    const paint = mode === "dark" ? "#fbfbf9" : "#0c0c09";

    let fontSize = getFontSize(heading);

    return new ImageResponse(
      <div
        tw="flex relative flex-col px-12 py-10 w-full h-full items-start"
        style={{
          color: paint,
          background: mode === "dark" ? "#474739" : "#fbfbf9"
        }}
      >
        <div tw="flex flex-col flex-1 py-10">
          <div
            tw="flex text-2xl uppercase font-bold tracking-tight mb-4"
            style={{ fontFamily: "Geist", fontWeight: "normal" }}
          >
            {values.type}
          </div>
          <div
            tw="flex leading-[1.1] text-[80px] grow items-center font-bold tracking-tighter"
            style={{
              fontFamily: "Geist",
              fontWeight: "bolder",
              marginLeft: "-3px",
              fontSize
            }}
          >
            {heading}
          </div>
        </div>
        <div tw="flex items-center w-full justify-between">
          <div tw="flex" style={{ fontFamily: "Geist", fontWeight: "normal" }}>
            <div tw="flex items-center justify-between">
              <div
                tw="flex h-[128px] w-[128px] border rounded-full overflow-hidden"
                style={{ fontFamily: "Geist", fontWeight: "normal" }}
              >
                {/* oxlint-disable nextjs/no-img-element -- Satori JSX; next/image cannot render inside ImageResponse */}
                {/* @ts-ignore */}
                <img src={imageData} height={128} width={128} alt="Tommy Lunde Barvåg" />
                {/* oxlint-enable nextjs/no-img-element */}
              </div>
              <div tw="flex flex-col ml-8">
                <div
                  tw="flex text-2xl font-bold tracking-tight"
                  style={{ fontFamily: "Geist", fontWeight: "bold" }}
                >
                  Tommy Lunde Barvåg
                </div>
                <div
                  tw="flex text-xl font-bold tracking-tight"
                  style={{
                    fontFamily: "Geist",
                    fontWeight: "normal",
                    color: mode === "dark" ? "#d8d8d0" : "#5b5b4b"
                  }}
                >
                  Senior front-end specialist
                </div>
              </div>
            </div>
          </div>
          <div tw="flex items-center text-xl" style={{ fontFamily: "Geist", fontWeight: "normal" }}>
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
              <path
                d="M30 44v-8a9.6 9.6 0 0 0-2-7c6 0 12-4 12-11 .16-2.5-.54-4.96-2-7 .56-2.3.56-4.7 0-7 0 0-2 0-6 3-5.28-1-10.72-1-16 0-4-3-6-3-6-3-.6 2.3-.6 4.7 0 7a10.806 10.806 0 0 0-2 7c0 7 6 11 12 11a9.43 9.43 0 0 0-1.7 3.3c-.34 1.2-.44 2.46-.3 3.7v8"
                stroke={paint}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 36c-9.02 4-10-4-14-4"
                stroke={paint}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div tw="flex ml-2">https://github.com/tommybarvaag</div>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        // next/og defaults to max-age=0 must-revalidate; keep @vercel/og's
        // immutable CDN caching, which this route relied on.
        headers: {
          "cache-control":
            process.env.NODE_ENV === "development"
              ? "no-cache, no-store"
              : "public, immutable, no-transform, max-age=31536000"
        },
        fonts: [
          {
            name: "Geist",
            data: fontRegularData,
            weight: 400,
            style: "normal"
          },
          {
            name: "Geist",
            data: fontBoldData,
            weight: 700,
            style: "normal"
          }
        ]
      }
    );
  } catch (error) {
    console.error("/api/og render failed", error);

    return new Response("Failed to generate image", { status: 500 });
  }
}
