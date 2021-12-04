import {
  compareAsc,
  compareDesc,
  differenceInYears,
  format,
  getYear,
  isDate,
  parse,
  parseISO
} from "date-fns";
import { numberToWords, simplePluralize } from "./humanizeUtils";

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

export const getFormattedPostDate = (date: Date) => getFormattedDate(date, "MMMM d, yyyy");

export const compareDatesAscending = (date1: Date, date2: Date) =>
  compareAsc(getDateISO(date1), getDateISO(date2));

export const compareDatesDescending = (date1: Date, date2: Date) =>
  compareDesc(getDateISO(date1), getDateISO(date2));

export const getActiveWorkYears = (): string => {
  const activeWorkYears = Math.min(
    differenceInYears(new Date(), new Date(2014, 0, 1)),
    RETIREMENT_YEAR
  );

  return `${numberToWords(activeWorkYears)} ${simplePluralize("year", activeWorkYears)}`;
};
