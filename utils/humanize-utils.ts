const a = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen"
];

const b = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

const convertHundreds = (num: number) => {
  let result = "";

  if (num > 99) {
    result += a[Math.floor(num / 100)] + " hundred";
    num %= 100;
    if (num > 0) result += " ";
  }
  if (num > 19) {
    result += b[Math.floor(num / 10)];
    num %= 10;
    if (num > 0) result += " ";
  }
  if (num > 0) {
    result += a[num];
  }

  return result;
};

export const numberToWords = (input: string | number | undefined | null): string => {
  if (input === undefined || input === null || isNaN(Number(input))) {
    return "";
  }

  const number = typeof input === "string" ? Number(input) : input;
  if (number === 0) return "zero";

  if (number < 0 || number >= 1e12) {
    return number.toLocaleString();
  }

  let result = "";
  const billion = Math.floor(number / 1e9);
  const million = Math.floor((number % 1e9) / 1e6);
  const thousand = Math.floor((number % 1e6) / 1e3);
  const remainder = number % 1e3;

  if (billion > 0) result += convertHundreds(billion) + " billion ";
  if (million > 0) result += convertHundreds(million) + " million ";
  if (thousand > 0) result += convertHundreds(thousand) + " thousand ";
  if (remainder > 0) result += convertHundreds(remainder);

  return result.trim();
};

export const simplePluralize = (noun: string, count: number, suffix: string = "s") =>
  `${noun}${count !== 1 ? suffix : ""}`;
