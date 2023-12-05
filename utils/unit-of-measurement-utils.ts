import { round } from "@/utils/common-utils";

const padZero = (value: number): string => ((value + "").length < 2 ? `0${value}` : `${value}`);

export const convertSecondsToHoursAndMinutes = (value: number): string => {
  const hours = Math.floor(value / 3600);
  const minutes = padZero(Math.floor((value / 60) % 60));
  const seconds = padZero(value % 60);

  if (hours <= 0) {
    return `${minutes}:${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};

export const convertMetersToKilometers = (value: number, decimals: number = 2): number =>
  round(value / 1000, decimals);

export const convertMetersPerSecondToKilometersPerSecond = (
  value: number,
  decimals: number = 2
): number => round(value * 3.6, decimals);

export const convertKilometersPerSecondToMinutesPerKilometer = (
  value: number,
  decimals: number = 2
): number => (value > 0 ? round(60 / value, decimals) : 0);
