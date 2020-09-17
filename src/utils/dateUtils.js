import { compareAsc, compareDesc, format, getYear, isDate, parseISO } from "date-fns";

export const getFormattedDate = (date, dateFormat, options = {}) =>
  format(date, dateFormat, options);

export const parseDateISO = date => parseISO(date);

export const getDateISO = date => (isDate(date) ? date : parseDateISO(date));

export const getDateYear = date => getYear(getDateISO(date));

export const getFormattedLongDate = date => getFormattedDate(getDateISO(date), "MMMM d, yyyy");

export const getFormattedMonth = date => getFormattedDate(getDateISO(date), "MMMM");

export const compareDatesAscending = (date1, date2) =>
  compareAsc(getDateISO(date1), getDateISO(date2));

export const compareDatesDescending = (date1, date2) =>
  compareDesc(getDateISO(date1), getDateISO(date2));
