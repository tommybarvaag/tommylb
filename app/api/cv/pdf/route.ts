import { renderCvPdf } from "@/lib/pdf/server/render";

const isDevelopment = process.env.NODE_ENV === "development";

let pdfPromise: Promise<Buffer> | null = null;

function loadCvPdf() {
  // Reset on failure so one bad render cannot poison a warm instance.
  pdfPromise ??= renderCvPdf().catch((error: unknown) => {
    pdfPromise = null;

    throw error;
  });

  return pdfPromise;
}

export async function GET() {
  try {
    const buffer = isDevelopment ? await renderCvPdf() : await loadCvPdf();

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="tommy-lunde-barvag-cv.pdf"',
        "Cache-Control": isDevelopment
          ? "no-cache, no-store"
          : "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
      }
    });
  } catch (error) {
    console.error("/api/cv/pdf render failed", error);

    return new Response("Failed to generate CV PDF", { status: 500 });
  }
}
