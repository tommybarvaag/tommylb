export const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
export const isString = value => Object.prototype.toString.call(value) === "[object String]";
