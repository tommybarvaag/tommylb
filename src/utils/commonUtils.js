export const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
export const isString = value => Object.prototype.toString.call(value) === "[object String]";
export const sum = arr => arr.reduce((a, b) => a + b, 0);
export const flat = arr =>
  arr.reduce((a, b) => (Array.isArray(b) ? [...a, ...flat(b)] : [...a, b]), []);
export const min = arr => Math.min(...arr);
export const max = arr => Math.max(...arr);
