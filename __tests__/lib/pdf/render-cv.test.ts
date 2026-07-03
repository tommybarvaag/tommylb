import { describe, expect, it } from "vitest";

import { renderCvPdf } from "@/lib/pdf/server/render";

function utf16be(text: string) {
  return Buffer.from(text, "utf16le").swap16();
}

describe("renderCvPdf", () => {
  it("renders a single-page PDF buffer", async () => {
    const buffer = await renderCvPdf();

    expect(buffer.subarray(0, 5).toString("latin1")).toBe("%PDF-");

    const pageCount = (buffer.toString("latin1").match(/\/Type\s*\/Page(?![a-zA-Z])/g) ?? [])
      .length;

    expect(pageCount).toBe(1);
    expect(buffer.length).toBeGreaterThan(10_000);
    expect(buffer.includes(utf16be("Tommy Lunde Barvåg"))).toBe(true);
  });
});
