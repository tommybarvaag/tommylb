import { round } from "./commonUtils";

const padZero = value => ((value + "").length < 2 ? `0${value}` : value);

export const convertSecondsToHoursAndMinutes = value => {
  const hours = Math.floor(value / 3600);
  const minutes = padZero(Math.floor((value / 60) % 60));
  const seconds = padZero(value % 60);

  if (hours <= 0) {
    return `${minutes}:${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};

export const convertMetersToKilometers = (value, decimals = 2) => round(value / 1000, decimals);

export const convertMetersPerSecondToKilometersPerSecond = (value, decimals = 2) =>
  round(value * 3.6, decimals);

export const convertKilometersPerSecondToMinutesPerKilometer = (value, decimals = 2) =>
  round(60 / value, decimals);
