import { getActiveWorkYears } from "@/utils/date-utils";

const defaultSeoTitle: string = "Senior consultant";

export const getDefaultSeoTitle = (title: string = defaultSeoTitle): string =>
  title === "Tommy Lunde Barvåg" ? title : `${title} | Tommy Lunde Barvåg`;

export const getDefaultSeoDescription = (withIntro: boolean = false): string =>
  `${
    withIntro ? "Hi, I'm Tommy Lunde Barvåg. " : ""
  }I've spent the last ${getActiveWorkYears()} creating web solutions for great companies. Experimenting with new technologies and learning new things is what I love the most. I'm currently working as a senior consultant at Knowit Experience Bergen AS.`;
