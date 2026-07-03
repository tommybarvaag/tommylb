import { renderCvPdf } from "@/lib/pdf/server/render";

export async function GET() {
  try {
    const buffer = await renderCvPdf();

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="tommy-lunde-barvag-cv.pdf"',
        "Cache-Control":
          process.env.NODE_ENV === "development" ? "no-cache, no-store" : "public, max-age=3600"
      }
    });
  } catch (error) {
    console.error("/api/cv/pdf render failed", error);

    return new Response("Failed to generate CV PDF", { status: 500 });
  }
}
