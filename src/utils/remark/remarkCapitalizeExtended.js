const remarkCapitalize = require("remark-capitalize");

const excludedWords = [
  "1Password",
  "API",
  "APIs",
  "CircleCI",
  "CMS",
  "CSS",
  "GraphQL",
  "HDD",
  "IDE",
  "iPhone",
  "MDX",
  "NoSQL",
  "PostgreSQL",
  "MySQL",
  "QC35",
  "REST",
  "SQL",
  "SWR",
  "UI",
  "USB",
  "UX",
  "VSCode"
];

module.exports = remarkCapitalize({
  special: excludedWords
});
