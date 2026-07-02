import { getActiveWorkYears } from "@/utils/date-utils";

export const getDefaultSeoDescription = (withIntro: boolean = false): string =>
  `${
    withIntro ? "Hi, I'm Tommy Lunde Barvåg. " : ""
  }I've spent the last ${getActiveWorkYears()} creating web solutions for great companies. Experimenting with new technologies and learning new things is what I love the most. I'm currently working as a senior system developer at Elmera Group.`;
