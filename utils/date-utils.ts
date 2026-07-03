import { numberToWords, simplePluralize } from "@/utils/humanize-utils";

const RETIREMENT_YEAR = 67;

export const intervalToDuration = (startDate: Date, endDate: Date) => {
  // Ensure startDate is earlier than endDate, swap if not
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }

  // Whole calendar months; a not-yet-reached end day-of-month means the last
  // month is incomplete.
  const wholeMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) -
    (endDate.getDate() < startDate.getDate() ? 1 : 0);

  const years = Math.floor(wholeMonths / 12);
  const months = wholeMonths % 12;

  // Anchor = start advanced by wholeMonths, day clamped to the target
  // month's length (Jan 31 + 1 month anchors at Feb 28/29, not Mar 2/3).
  const anchorMonth = new Date(startDate.getFullYear(), startDate.getMonth() + wholeMonths, 1);
  const lastDayOfAnchorMonth = new Date(
    anchorMonth.getFullYear(),
    anchorMonth.getMonth() + 1,
    0
  ).getDate();
  const anchor = new Date(
    anchorMonth.getFullYear(),
    anchorMonth.getMonth(),
    Math.min(startDate.getDate(), lastDayOfAnchorMonth)
  );

  // Day remainder on midnight-normalized dates; Math.round absorbs the ±1h
  // a DST boundary introduces.
  const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  let days = Math.round((endDay.getTime() - anchor.getTime()) / 86400000);
  const weeks = Math.floor(days / 7);
  days -= weeks * 7;

  const totalDiffInSeconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
  const hours = Math.floor(totalDiffInSeconds / 3600) % 24;
  const minutes = Math.floor(totalDiffInSeconds / 60) % 60;
  const seconds = totalDiffInSeconds % 60;

  return {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds
  };
};

// Captured ONCE at module load (build/prerender time), NOT per render — a render-time
// `new Date()` is uncached dynamic IO under Cache Components. Refreshes on each deploy.
const NOW = new Date();

export const isToday = (date: Date) => {
  return (
    date.getDate() === NOW.getDate() &&
    date.getMonth() === NOW.getMonth() &&
    date.getFullYear() === NOW.getFullYear()
  );
};

export const getFormattedLongDate = (date: Date) =>
  `${new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric"
  }).format(new Date(date))} · ${new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date))}`;

export const getFormattedShortMonthAndYearDate = (date: Date) =>
  date.toLocaleString("en-US", { month: "short", year: "numeric" });

// Computed ONCE at module load (build/prerender time), NOT per render — so it is not
// render-time dynamic IO and does not trip Cache Components. Refreshes on each deploy.
const ACTIVE_WORK_YEARS = Math.min(
  intervalToDuration(new Date(2014, 0, 1), new Date()).years,
  RETIREMENT_YEAR
);

export const getActiveWorkYearsAsNumber = () => ACTIVE_WORK_YEARS;

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
  const { days, hours, minutes, months, seconds, weeks, years } = intervalToDuration(date, NOW);

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
