import {
  compareAsc,
  compareDesc,
  differenceInMonths,
  differenceInYears,
  format,
  getYear,
  isDate,
  parse,
  parseISO
} from "date-fns";
import { numberToWords, simplePluralize } from "./humanize-utils";

const RETIREMENT_YEAR = 67;

export const getFormattedDate = (date: Date, dateFormat: string, options = {}): string =>
  format(date, dateFormat, options);

export const parseDate = (date: string, format: string, referenceDate?: Date) =>
  parse(date, format, referenceDate ?? new Date());

export const parseDateISO = (date: string) => parseISO(date);

export const getDateISO = (date: any): Date => (isDate(date) ? date : parseDateISO(date));

export const getDateYear = (date: Date) => getYear(getDateISO(date));

export const getFormattedLongDate = (date: Date) =>
  getFormattedDate(getDateISO(date), "MMMM d, yyyy");

export const getFormattedMonth = (date: Date) => getFormattedDate(getDateISO(date), "MMMM");

export const getFormattedMonthAndYearDate = (date: Date) =>
  getFormattedDate(getDateISO(date), "MMMM, yyyy");

export const getFormattedPostDate = (date: Date) => getFormattedDate(date, "MMMM d, yyyy");

// pretty date with time
export const getFormattedTwitterDate = (date: Date) =>
  getFormattedDate(getDateISO(date), "h:mm a '·' MMMM d, yyyy ");

export const compareDatesAscending = (date1: Date, date2: Date) =>
  compareAsc(getDateISO(date1), getDateISO(date2));

export const compareDatesDescending = (date1: Date, date2: Date) =>
  compareDesc(getDateISO(date1), getDateISO(date2));

export const getActiveWorkYearsAsNumber = () => {
  return Math.min(differenceInYears(new Date(), new Date(2014, 0, 1)), RETIREMENT_YEAR);
};

export const getActiveWorkYears = (): string => {
  const activeWorkYears = getActiveWorkYearsAsNumber();

  return `${numberToWords(activeWorkYears)} ${simplePluralize("year", activeWorkYears)}`;
};

export const getDurationAsYearsAndMonths = (startDate: Date, endDate: Date): string => {
  const years = differenceInYears(endDate, startDate);
  const months = differenceInMonths(endDate, startDate) - years * 12;

  if (years === 0 && months === 0) {
    return "less than a month";
  }

  if (years === 0) {
    return `${months} ${simplePluralize("month", months)}`;
  }

  if (months === 0) {
    return `${years} ${simplePluralize("year", years)}`;
  }

  return `${years} ${simplePluralize("year", years)} and ${months} ${simplePluralize(
    "month",
    months
  )}`;
};

export const getFormattedToAndFromCvDate = (startDate: Date, endDate: Date): string => {
  return `${getFormattedMonthAndYearDate(startDate)} - ${getFormattedMonthAndYearDate(
    endDate
  )} • ${getDurationAsYearsAndMonths(startDate, endDate)}`;
};
