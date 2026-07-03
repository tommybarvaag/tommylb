import { cvEducation, cvKeySkills, cvWorkExperience } from "@/data/cv-key-points";
import {
  getActiveWorkYearsAsNumber,
  getFormattedToAndFromCvDate,
  parseCvDate
} from "@/utils/date-utils";

type CvPdfExperience = {
  role: string;
  company: string;
  period: string;
  summary: string;
};

type CvPdfEducation = {
  title: string;
  area: string;
  period: string;
};

type CvPdfDetail = {
  label: string;
  value: string;
};

type CvPdfData = {
  name: string;
  title: string;
  contact: string[];
  summary: string;
  experience: CvPdfExperience[];
  education: CvPdfEducation[];
  skills: string[];
  details: CvPdfDetail[];
};

export function buildCvPdfData(): CvPdfData {
  return {
    name: "Tommy Lunde Barvåg",
    title: "Senior front-end specialist",
    contact: ["tommy@barvaag.com", "tommylb.com", "linkedin.com/in/tommybarvaag", "Bergen, Norway"],
    summary:
      "Experienced and solution-oriented senior consultant with expertise in TypeScript and React. Systematic and analytical approach to developing custom solutions from concept to product. Broad experience as a tech lead, known for asking the right questions and digging deep to ensure the end product delivers the best possible results.",
    experience: [...cvWorkExperience].reverse().map(experience => ({
      role: experience.workPlaceTitle,
      company: experience.workPlace,
      period: getFormattedToAndFromCvDate(
        parseCvDate(experience.fromDate),
        parseCvDate(experience.toDate)
      ),
      summary: experience.summary
    })),
    education: cvEducation.map(education => ({
      title: education.title,
      area: education.area,
      period: `${parseCvDate(education.fromDate).getFullYear()} - ${parseCvDate(education.toDate).getFullYear()}`
    })),
    skills: cvKeySkills.skills.map(skill => skill.title),
    details: [
      { label: "Location", value: "Bergen, Norway" },
      { label: "Experience", value: `${getActiveWorkYearsAsNumber()}+ years` },
      { label: "Languages", value: "Norwegian (native), English" },
      { label: "Relocation", value: "No" },
      { label: "Work mode", value: "Hybrid preferred" }
    ]
  };
}

export type { CvPdfData, CvPdfExperience };
