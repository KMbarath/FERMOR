/**
 * Future value of a monthly SIP, contributions made at the start of each month.
 * Returns one point per year, from year 0 to `years`.
 */
export function sipSeries({ monthly, years, rate, inflation = 0 }) {
  const r = rate / 100 / 12;
  const points = [];
  for (let year = 0; year <= years; year += 1) {
    const n = year * 12;
    const invested = monthly * n;
    const nominal = r === 0 ? invested : monthly * (((1 + r) ** n - 1) / r) * (1 + r);
    const value = nominal / (1 + inflation / 100) ** year;
    points.push({ year, invested, nominal, value });
  }
  return points;
}

/** Months until `saved` grows to `target` with `monthly` added at each month end. */
export function monthsToTarget({ target, saved, monthly, rate }) {
  const r = rate / 100 / 12;
  let balance = saved;
  for (let m = 0; m <= 600; m += 1) {
    if (balance >= target) return m;
    balance = balance * (1 + r) + monthly;
  }
  return null;
}

export function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}
