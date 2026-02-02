/**
 * Convert a JavaScript Date to Julian Date Number.
 * Algorithm from Meeus, "Astronomical Algorithms"
 */
export function dateToJulianDate(date: Date): number {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d =
    date.getUTCDate() +
    date.getUTCHours() / 24 +
    date.getUTCMinutes() / 1440 +
    date.getUTCSeconds() / 86400;

  let Y = y;
  let M = m;
  if (M <= 2) {
    Y -= 1;
    M += 12;
  }

  const A = Math.floor(Y / 100);
  const B = 2 - A + Math.floor(A / 4);

  return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1)) + d + B - 1524.5;
}

/** J2000.0 epoch as Julian Date */
export const J2000 = 2451545.0;

/**
 * Compute centuries past J2000.0 for a given date.
 */
export function centuriesSinceJ2000(date: Date): number {
  const jd = dateToJulianDate(date);
  return (jd - J2000) / 36525;
}
