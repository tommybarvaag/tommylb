const a: string[] = [
  "",
  "one ",
  "two ",
  "three ",
  "four ",
  "five ",
  "six ",
  "seven ",
  "eight ",
  "nine ",
  "ten ",
  "eleven ",
  "twelve ",
  "thirteen ",
  "fourteen ",
  "fifteen ",
  "sixteen ",
  "seventeen ",
  "eighteen ",
  "nineteen "
];

const b: string[] = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety"
];

const regex = /^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/;

const getLT20 = (n: string) => a[Number(n)];
const getGT20 = (n: string) => b[parseInt(n[0])] + " " + a[parseInt(n[1])];

export const numberToWords = (input: string | number): string => {
  const number = typeof input === "string" ? Number(input) : input;
  if (isNaN(number)) return "";
  if (number === 0) return "zero";

  const numberString = number.toString();
  if (numberString.length > 9) {
    throw new Error("overflow"); // Does not support converting more than 9 digits yet
  }

  const [, n1, n2, n3, n4, n5] = ("000000000" + numberString).slice(-9).match(regex); // left pad zeros

  let value = "";
  value += +n1 !== 0 ? (getLT20(n1) || getGT20(n1)) + "crore " : "";
  value += +n2 !== 0 ? (getLT20(n2) || getGT20(n2)) + "lakh " : "";
  value += +n3 !== 0 ? (getLT20(n3) || getGT20(n3)) + "thousand " : "";
  value += +n4 !== 0 ? getLT20(n4) + "hundred " : "";
  value += +n5 !== 0 && value !== "" ? "and " : "";
  value += +n5 !== 0 ? getLT20(n5) || getGT20(n5) : "";

  return value.trim();
};

export const simplePluralize = (noun: string, count: number, suffix: string = "s") =>
  `${noun}${count !== 1 ? suffix : ""}`;
