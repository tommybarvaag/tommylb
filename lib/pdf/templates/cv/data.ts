import { cvEducation, cvKeySkills, cvWorkExperience } from "@/data/cv-key-points";
import { getFormattedShortMonthAndYearDate, isToday, parseCvDate } from "@/utils/date-utils";

type CvPdfExperience = {
  role: string;
  company: string;
  period: string;
  summary: string;
};

type CvPdfEducation = {
  title: string;
  meta: string;
};

type CvPdfLanguage = {
  name: string;
  note?: string;
};

type CvPdfData = {
  name: string;
  title: string;
  contact: string[];
  summary: string;
  experience: CvPdfExperience[];
  skills: string[];
  languages: CvPdfLanguage[];
  education: CvPdfEducation[];
  workMode: string;
};

function formatPdfPeriod(fromDate: string, toDate: string): string {
  const from = parseCvDate(fromDate);
  const to = parseCvDate(toDate);
  const end = isToday(to) ? "present" : getFormattedShortMonthAndYearDate(to);

  return `${getFormattedShortMonthAndYearDate(from)} – ${end}`;
}

function buildPdfEducation(): CvPdfEducation[] {
  if (cvEducation.length !== 1) {
    throw new Error("CV PDF education short title must be updated for multiple entries.");
  }

  const [education] = cvEducation;
  const from = parseCvDate(education.fromDate);
  const to = parseCvDate(education.toDate);

  return [
    {
      title: "B.S. Computer Engineering",
      meta: `${education.area} · ${from.getFullYear()} – ${to.getFullYear()}`
    }
  ];
}

export function buildCvPdfData(): CvPdfData {
  return {
    name: "Tommy Lunde Barvåg",
    title: "Senior front-end specialist",
    contact: ["tommy@barvaag.com", "https://tommylb.com", "Bergen, Norway"],
    summary:
      "Experienced and solution-oriented senior consultant with expertise in TypeScript and React. Systematic and analytical approach to developing custom solutions from concept to product. Broad experience as a tech lead, known for asking the right questions and digging deep to ensure the end product delivers the best possible results.",
    experience: [...cvWorkExperience].reverse().map(experience => ({
      role: experience.workPlaceTitle,
      company: experience.workPlace,
      period: formatPdfPeriod(experience.fromDate, experience.toDate),
      summary: experience.summary
    })),
    skills: cvKeySkills.skills.map(skill => skill.title),
    languages: [{ name: "Norwegian", note: "native" }, { name: "English" }],
    education: buildPdfEducation(),
    workMode: "Hybrid preferred"
  };
}

export type { CvPdfData, CvPdfExperience };
