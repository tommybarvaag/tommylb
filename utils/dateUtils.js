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

export const getFormattedDate = (date, dateFormat, options = {}) =>
  format(date, dateFormat, options);

export const parseDate = (date, format, referenceDate) =>
  parse(date, format, referenceDate ?? new Date());

export const parseDateISO = date => parseISO(date);

export const getDateISO = date => (isDate(date) ? date : parseDateISO(date));

export const getDateYear = date => getYear(getDateISO(date));

export const getFormattedLongDate = date => getFormattedDate(getDateISO(date), "MMMM d, yyyy");

export const getFormattedMonth = date => getFormattedDate(getDateISO(date), "MMMM");

export const getFormattedPostDate = date => getFormattedDate(date, "MMMM d, yyyy");

export const compareDatesAscending = (date1, date2) =>
  compareAsc(getDateISO(date1), getDateISO(date2));

export const compareDatesDescending = (date1, date2) =>
  compareDesc(getDateISO(date1), getDateISO(date2));

export const getActiveWorkYears = () => {
  const activeWorkYears = Math.min(
    differenceInYears(new Date(), new Date(2014, 0, 1)),
    RETIREMENT_YEAR
  );

  return `${numberToWords(activeWorkYears)} ${simplePluralize("year", activeWorkYears)}`;
};
