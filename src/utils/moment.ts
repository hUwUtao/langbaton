const nstr = (arr: number[]): string[] => arr.map(String),
  f2n = (n: number) => ("0" + n).slice(-2),
  toGregorian = (now: Date) =>
    [
      nstr([now.getUTCDate(), now.getUTCMonth() + 1, now.getFullYear()]) //
        .join("/"),
      [...nstr([now.getHours(), now.getMinutes()]), f2n(now.getUTCSeconds())] //
        .join(":"),
    ].join(" "),
  epoch2Gregorian = (epoch: number) => toGregorian(new Date(epoch));
export default epoch2Gregorian;
