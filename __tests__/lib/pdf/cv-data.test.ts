import { describe, expect, it } from "vitest";

import { buildCvPdfData } from "@/lib/pdf/templates/cv/data";

import { cvEducation, cvKeySkills, cvWorkExperience } from "@/data/cv-key-points";

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

  it("formats periods with en dashes and present", () => {
    const data = buildCvPdfData();

    expect(data.experience[0].period).toBe("Jan 2024 – present");
    expect(data.experience[1].period).toBe("Feb 2020 – Jan 2024");
  });

  it("passes through key skills in order", () => {
    const data = buildCvPdfData();

    expect(data.skills).toEqual(cvKeySkills.skills.map(skill => skill.title));
  });

  it("uses the redesigned sidebar contract", () => {
    const data = buildCvPdfData();

    expect(data.languages).toEqual([{ name: "Norwegian", note: "native" }, { name: "English" }]);
    expect(data.workMode).toBe("Hybrid preferred");
    expect(cvEducation).toHaveLength(1);
    expect(data.education).toHaveLength(1);
    expect(data.education[0].meta).toBe("Bergen, Norway · 2010 – 2013");
    expect(data.education[0].title).toBe("B.S. Computer Engineering");
    expect(data).not.toHaveProperty("details");
  });

  it("does not mutate the source cvWorkExperience array", () => {
    buildCvPdfData();
    buildCvPdfData();

    expect(cvWorkExperience[0].workPlace).toBe("Digitroll AS");
  });
});
