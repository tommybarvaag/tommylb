import { numberToWords, simplePluralize } from "@/utils/humanize-utils";

const RETIREMENT_YEAR = 67;

export const intervalToDuration = (startDate: Date, endDate: Date) => {
  // Ensure startDate is earlier than endDate, swap if not
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }

  // Extracting year, month, and day components from start and end dates
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  // Calculate total years difference
  const years = endYear - startYear;

  // Calculate months difference; adjust for negative difference
  const monthsDiff = endMonth - startMonth;
  let months = monthsDiff >= 0 ? monthsDiff : monthsDiff + 12;
  let yearsAdjusted = monthsDiff >= 0 ? years : years - 1;

  // Calculate days difference; adjust for negative difference
  // Using the last day of the previous month for accurate calculation
  const daysDiff = endDay - startDay;
  const lastDayOfPrevMonth = new Date(endYear, endMonth, 0).getDate();
  let days = daysDiff >= 0 ? daysDiff : daysDiff + lastDayOfPrevMonth;
  if (daysDiff < 0) months--;

  // Calculate the total difference in seconds
  const totalDiffInSeconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);

  // Convert total seconds to weeks and remaining days
  const daysFromSeconds = Math.floor(totalDiffInSeconds / (3600 * 24));
  const weeks = Math.floor(daysFromSeconds / 7);
  days -= weeks * 7; // Adjust days to remove the full weeks

  // Convert remaining seconds to hours, minutes, and seconds
  const hours = Math.floor(totalDiffInSeconds / 3600) % 24;
  const minutes = Math.floor(totalDiffInSeconds / 60) % 60;
  const seconds = totalDiffInSeconds % 60;

  return {
    years: yearsAdjusted,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds
  };
};

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const getDateYear = (date: Date) => date.getFullYear();

export const getFormattedLongDate = (date: Date) =>
  `${new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric"
  }).format(new Date(date))} · ${new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date))}`;

export const getFormattedMonth = (date: Date) => date.toLocaleString("en-US", { month: "long" });

export const getFormattedMonthAndYearDate = (date: Date) =>
  date.toLocaleString("en-US", { month: "long", year: "numeric" });

export const getFormattedShortMonthAndYearDate = (date: Date) =>
  date.toLocaleString("en-US", { month: "short", year: "numeric" });

export const getFormattedPostDate = (date: Date) =>
  date.toLocaleString("en-US", { dateStyle: "long" });

export const getActiveWorkYearsAsNumber = () => {
  const { years } = intervalToDuration(new Date(2014, 0, 1), new Date());
  return Math.min(years, RETIREMENT_YEAR);
};

export const getActiveWorkYears = (
  options = {
    capitalize: false
  }
): string => {
  const activeWorkYears = getActiveWorkYearsAsNumber();
  const years = `${numberToWords(activeWorkYears)} ${simplePluralize("year", activeWorkYears)}`;

  return options.capitalize ? years.charAt(0).toUpperCase() + years.slice(1) : years;
};

export const getDurationAsYearsAndMonths = (startDate: Date, endDate: Date): string => {
  const { years, months } = intervalToDuration(startDate, endDate);

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
  const end = isToday(endDate) ? "now" : getFormattedShortMonthAndYearDate(endDate);
  return `${getFormattedShortMonthAndYearDate(startDate)} - ${end} • ${getDurationAsYearsAndMonths(
    startDate,
    endDate
  )}`;
};

export const getHumanizedDateFromNow = (date: Date) => {
  const now = new Date();

  const { days, hours, minutes, months, seconds, weeks, years } = intervalToDuration(date, now);

  if (years && years > 0) {
    return `${years} ${simplePluralize("year", years)}`;
  }

  if (months && months > 0) {
    return `${months} ${simplePluralize("month", months)}`;
  }

  if (weeks && weeks > 0) {
    return `${weeks} ${simplePluralize("week", weeks)}`;
  }

  if (days && days > 0) {
    return `${days} ${simplePluralize("day", days)}`;
  }

  if (hours && hours > 0) {
    return `${hours} ${simplePluralize("hour", hours)}`;
  }

  if (minutes && minutes > 0) {
    return `${minutes} ${simplePluralize("minute", minutes)}`;
  }

  if (seconds && seconds > 0) {
    return `${seconds} ${simplePluralize("second", seconds)}`;
  }

  return "now";
};
