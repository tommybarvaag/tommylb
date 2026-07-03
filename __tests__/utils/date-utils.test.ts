import { afterEach, describe, expect, it, vi } from "vitest";

import {
  getDurationAsYearsAndMonths,
  getFormattedShortMonthAndYearDate,
  getFormattedToAndFromCvDate,
  intervalToDuration,
  parseCvDate
} from "@/utils/date-utils";

type DurationCase = {
  start: Date;
  end: Date;
  years: number;
  months: number;
  weeks: number;
  days: number;
};

// Characterization: behavior that is already correct and must not change.
const stableCases: DurationCase[] = [
  {
    start: new Date(2026, 5, 20),
    end: new Date(2026, 6, 2),
    years: 0,
    months: 0,
    weeks: 1,
    days: 5
  },
  {
    start: new Date(2026, 5, 29),
    end: new Date(2026, 6, 2),
    years: 0,
    months: 0,
    weeks: 0,
    days: 3
  },
  { start: new Date(2026, 6, 2), end: new Date(2026, 6, 2), years: 0, months: 0, weeks: 0, days: 0 }
];

// The fix: correct values the current implementation gets wrong.
const fixedCases: DurationCase[] = [
  {
    start: new Date(2024, 0, 15),
    end: new Date(2026, 6, 2),
    years: 2,
    months: 5,
    weeks: 2,
    days: 3
  },
  {
    start: new Date(2025, 6, 15),
    end: new Date(2026, 6, 2),
    years: 0,
    months: 11,
    weeks: 2,
    days: 3
  },
  {
    start: new Date(2022, 2, 31),
    end: new Date(2026, 2, 1),
    years: 3,
    months: 11,
    weeks: 0,
    days: 1
  },
  {
    start: new Date(2023, 3, 25),
    end: new Date(2026, 6, 2),
    years: 3,
    months: 2,
    weeks: 1,
    days: 0
  },
  {
    start: new Date(2014, 0, 1),
    end: new Date(2026, 6, 2),
    years: 12,
    months: 6,
    weeks: 0,
    days: 1
  },
  {
    start: new Date(2025, 0, 31),
    end: new Date(2025, 2, 1),
    years: 0,
    months: 1,
    weeks: 0,
    days: 1
  },
  { start: new Date(2025, 6, 1), end: new Date(2026, 6, 1), years: 1, months: 0, weeks: 0, days: 0 }
];

describe("intervalToDuration", () => {
  for (const c of [...stableCases, ...fixedCases]) {
    it(`${c.start.toDateString()} -> ${c.end.toDateString()} = ${c.years}y ${c.months}m ${c.weeks}w ${c.days}d`, () => {
      const result = intervalToDuration(c.start, c.end);

      expect({
        years: result.years,
        months: result.months,
        weeks: result.weeks,
        days: result.days
      }).toEqual({ years: c.years, months: c.months, weeks: c.weeks, days: c.days });
    });
  }

  it("swaps reversed arguments", () => {
    const result = intervalToDuration(new Date(2026, 6, 2), new Date(2026, 5, 29));

    expect(result.days).toBe(3);
  });

  it("never returns negative components", () => {
    for (const c of [...stableCases, ...fixedCases]) {
      const result = intervalToDuration(c.start, c.end);

      for (const value of Object.values(result)) {
        expect(value).toBeGreaterThanOrEqual(0);
      }
    }
  });
});

describe("getDurationAsYearsAndMonths", () => {
  it("formats years and months", () => {
    expect(getDurationAsYearsAndMonths(new Date(2024, 0, 15), new Date(2026, 6, 2))).toBe(
      "2 years and 5 months"
    );
  });

  it("formats months only, years only, and the sub-month case", () => {
    expect(getDurationAsYearsAndMonths(new Date(2026, 1, 1), new Date(2026, 6, 1))).toBe(
      "5 months"
    );
    expect(getDurationAsYearsAndMonths(new Date(2025, 6, 1), new Date(2026, 6, 1))).toBe("1 year");
    expect(getDurationAsYearsAndMonths(new Date(2026, 5, 20), new Date(2026, 6, 2))).toBe(
      "less than a month"
    );
  });

  it("borrow-bug regression: just under a year is 11 months, never -1 months", () => {
    expect(getDurationAsYearsAndMonths(new Date(2025, 6, 15), new Date(2026, 6, 2))).toBe(
      "11 months"
    );
  });
});

describe("with a frozen module-load clock", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.resetModules();
  });

  async function importWithNow(now: Date) {
    vi.useFakeTimers();
    vi.setSystemTime(now);
    vi.resetModules();

    return import("@/utils/date-utils");
  }

  it("getHumanizedDateFromNow reports 11 months just under a year (borrow-bug regression)", async () => {
    const { getHumanizedDateFromNow } = await importWithNow(new Date(2026, 6, 2, 12, 0, 0));

    expect(getHumanizedDateFromNow(new Date(2025, 6, 15))).toBe("11 months");
  });

  it("getHumanizedDateFromNow handles years, days, and now", async () => {
    const { getHumanizedDateFromNow } = await importWithNow(new Date(2026, 6, 2, 12, 0, 0));

    expect(getHumanizedDateFromNow(new Date(2023, 3, 25))).toBe("3 years");
    expect(getHumanizedDateFromNow(new Date(2026, 5, 29))).toBe("3 days");
  });

  it("getActiveWorkYears counts from 2014", async () => {
    const { getActiveWorkYears } = await importWithNow(new Date(2026, 6, 2, 12, 0, 0));

    expect(getActiveWorkYears()).toBe("twelve years");
    expect(getActiveWorkYears({ capitalize: true })).toBe("Twelve years");
  });

  it("getFormattedToAndFromCvDate renders 'now' for a today end date", async () => {
    const { getFormattedToAndFromCvDate: formatCvDateNow } = await importWithNow(
      new Date(2026, 6, 2, 12, 0, 0)
    );

    expect(formatCvDateNow(new Date(2024, 0, 1), new Date(2026, 6, 2))).toContain("- now");
  });
});

describe("getFormattedToAndFromCvDate with explicit past dates", () => {
  it("formats the CV range and duration", () => {
    expect(getFormattedToAndFromCvDate(new Date(2018, 8, 1), new Date(2019, 5, 1))).toBe(
      "Sep 2018 - Jun 2019 • 9 months"
    );
  });
});

describe("parseCvDate", () => {
  it("parses a date-only string into local calendar components", () => {
    const date = parseCvDate("2024-01-01");

    expect(date.getFullYear()).toBe(2024);
    expect(date.getMonth()).toBe(0);
    expect(date.getDate()).toBe(1);
  });

  it("round-trips through the short-month formatter in any timezone", () => {
    expect(getFormattedShortMonthAndYearDate(parseCvDate("2024-01-01"))).toBe("Jan 2024");
  });

  it("string-parsed twin of the local-constructed CV range case", () => {
    expect(getFormattedToAndFromCvDate(parseCvDate("2018-09-01"), parseCvDate("2019-06-01"))).toBe(
      "Sep 2018 - Jun 2019 • 9 months"
    );
  });
});
