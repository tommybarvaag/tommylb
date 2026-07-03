import { afterEach, describe, expect, it, vi } from "vitest";

const renderCvPdfMock = vi.fn<() => Promise<Buffer>>();

vi.mock("@/lib/pdf/server/render", () => ({
  renderCvPdf: renderCvPdfMock
}));

async function importRoute() {
  vi.resetModules();

  return import("@/app/api/cv/pdf/route");
}

describe("GET /api/cv/pdf", () => {
  afterEach(() => {
    renderCvPdfMock.mockReset();
  });

  it("returns the PDF with the response contract headers", async () => {
    renderCvPdfMock.mockResolvedValue(Buffer.from("%PDF-fake"));

    const { GET } = await importRoute();
    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/pdf");
    expect(response.headers.get("Content-Disposition")).toBe(
      'attachment; filename="tommy-lunde-barvag-cv.pdf"'
    );
    expect(response.headers.get("Cache-Control")).toContain("s-maxage=86400");

    const body = Buffer.from(await response.arrayBuffer());

    expect(body.subarray(0, 5).toString()).toBe("%PDF-");
  });

  it("memoizes the render across requests", async () => {
    renderCvPdfMock.mockResolvedValue(Buffer.from("%PDF-fake"));

    const { GET } = await importRoute();

    await GET();
    await GET();

    expect(renderCvPdfMock).toHaveBeenCalledTimes(1);
  });

  it("returns 500 on render failure and recovers on the next request", async () => {
    renderCvPdfMock
      .mockRejectedValueOnce(new Error("boom"))
      .mockResolvedValueOnce(Buffer.from("%PDF-fake"));

    const { GET } = await importRoute();
    const failed = await GET();

    expect(failed.status).toBe(500);
    expect(await failed.text()).toBe("Failed to generate CV PDF");

    const recovered = await GET();

    expect(recovered.status).toBe(200);
  });
});
