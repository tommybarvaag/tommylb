import { getActiveWorkYears } from "./dateUtils";

const defaultSeoTitle = "Senior full stack developer";

export const getDefaultSeoTitle = (title = defaultSeoTitle) =>
  title === "Tommy Lunde Barvåg" ? title : `${title} | Tommy Lunde Barvåg`;

export const getDefaultSeoDescription = (withIntro = false) =>
  `${
    withIntro ? "Hi, I'm Tommy Lunde Barvåg. " : ""
  }I’m a senior full stack developer. I’ve spent the last ${getActiveWorkYears()} creating web solutions for great companies.`;
