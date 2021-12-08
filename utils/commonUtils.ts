export const round = (n: number, decimals: number = 0): number =>
  +(Math.round((n + Number.EPSILON) * 100) / 100).toFixed(decimals);

export const isString = (value: any): boolean =>
  Object.prototype.toString.call(value) === "[object String]";

export const sum = (arr: number[]): number => arr.reduce<number>((a, b) => a + b, 0);

export const flat = (arr: any[]): any[] =>
  arr.reduce((a, b) => (Array.isArray(b) ? [...a, ...flat(b)] : [...a, b]), []);

export const min = (arr: number[]): number => Math.min(...arr);

export const minBy = <T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): T =>
  arr.reduce((a, b) => (a[key] < b[key] ? a : b), {} as T);

export const max = (arr: number[]): number => Math.max(...arr);
export const maxBy = <T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): T =>
  arr.reduce((a, b) => (a[key] >= b[key] ? a : b), {} as T);

export const groupBy = <T extends Record<string, any>, K extends keyof T>(
  arr: T[],
  key: K
): Record<string, T[]> =>
  arr.reduce(
    (acc, item) => ((acc[item[key]] = [...(acc[item[key]] || []), item]), acc),
    {} as Record<string, T[]>
  );
