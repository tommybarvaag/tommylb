import { ogImageSchema } from "@/lib/validations/og";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

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

export async function GET(request: NextRequest) {
  try {
    const fontRegular = fetch(
      new URL("../../../assets/fonts/Geist-Regular.otf", import.meta.url)
    ).then(res => res.arrayBuffer());

    const fontBold = fetch(new URL("../../../assets/fonts/Geist-Bold.otf", import.meta.url)).then(
      res => res.arrayBuffer()
    );
    const image = fetch(new URL("../../../public/images/tommy-zoom-256.jpg", import.meta.url)).then(
      res => res.arrayBuffer()
    );

    const fontRegularData = await fontRegular;
    const fontBoldData = await fontBold;
    const imageData = await image;

    const values = ogImageSchema.parse(Object.fromEntries(request.nextUrl.searchParams));
    const heading =
      values.heading.length > 140 ? `${values.heading.substring(0, 140)}...` : values.heading;

    const { mode } = values;
    const paint = mode === "dark" ? "#fafafa" : "#18181b";

    let fontSize = getFontSize(heading);

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col px-12 py-10 w-full h-full items-start"
          style={{
            color: paint,
            background: mode === "dark" ? "#18181b" : "#fafafa"
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
                  {/* @ts-ignore */}
                  <img src={imageData} height="128" width="128" alt="WUT" />
                </div>
                <div tw="flex flex-col ml-8">
                  <div
                    tw="flex text-2xl font-bold tracking-tight"
                    style={{ fontFamily: "Geist", fontWeight: "bold" }}
                  >
                    Tommy Lunde Barvåg
                  </div>
                  <div
                    tw="flex text-xl font-bold tracking-tight text-zinc-400"
                    style={{ fontFamily: "Geist", fontWeight: "normal" }}
                  >
                    Senior front-end specialist
                  </div>
                </div>
              </div>
            </div>
            <div
              tw="flex items-center text-xl"
              style={{ fontFamily: "Geist", fontWeight: "normal" }}
            >
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
        </div>
      ),
      {
        width: 1200,
        height: 630,
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
    return new Response(`Failed to generate image`, {
      status: 500
    });
  }
}
