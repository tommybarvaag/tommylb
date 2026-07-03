import { describe, expect, it } from "vitest";

import { buildCvPdfData } from "@/lib/pdf/templates/cv/data";

import { cvKeySkills, cvWorkExperience } from "@/data/cv-key-points";

describe("buildCvPdfData", () => {
  it("orders experience newest first", () => {
    const data = buildCvPdfData();

    expect(data.experience).toHaveLength(4);
    expect(data.experience[0].company).toBe("Elmera Group ASA");
    expect(data.experience[data.experience.length - 1].company).toBe("Digitroll AS");
  });

  it("every experience entry has non-empty fields", () => {
    const data = buildCvPdfData();

    for (const experience of data.experience) {
      expect(experience.role).toBeTruthy();
      expect(experience.company).toBeTruthy();
      expect(experience.period).toBeTruthy();
      expect(experience.summary).toBeTruthy();
    }
  });

  it("formats the most recent period starting from Jan 2024", () => {
    const data = buildCvPdfData();

    expect(data.experience[0].period.startsWith("Jan 2024 - ")).toBe(true);
  });

  it("passes through key skills in order", () => {
    const data = buildCvPdfData();

    expect(data.skills).toEqual(cvKeySkills.skills.map(skill => skill.title));
  });

  it("includes an Experience detail formatted as a year count", () => {
    const data = buildCvPdfData();
    const experienceDetail = data.details.find(detail => detail.label === "Experience");

    expect(experienceDetail?.value).toMatch(/^\d+\+ years$/);
  });

  it("does not mutate the source cvWorkExperience array", () => {
    buildCvPdfData();
    buildCvPdfData();

    expect(cvWorkExperience[0].workPlace).toBe("Digitroll AS");
  });
});
