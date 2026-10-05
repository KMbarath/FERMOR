const grouped = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

/** ₹12,34,567 — Indian digit grouping */
export const rupees = (n) => `${n < 0 ? '-' : ''}₹${grouped.format(Math.abs(Math.round(n)))}`;

const tidy = (x) => {
  const fixed = x >= 100 ? x.toFixed(0) : x >= 10 ? x.toFixed(1) : x.toFixed(2);
  return fixed.includes('.') ? fixed.replace(/0+$/, '').replace(/\.$/, '') : fixed;
};

/** ₹1.65 Cr, ₹53 L, ₹12.5K */
export function compactRupees(n) {
  const v = Math.abs(n);
  const sign = n < 0 ? '-' : '';
  if (v >= 1e7) return `${sign}₹${tidy(v / 1e7)} Cr`;
  if (v >= 1e5) return `${sign}₹${tidy(v / 1e5)} L`;
  if (v >= 1e4) return `${sign}₹${tidy(v / 1e3)}K`;
  return rupees(n);
}

export const percent = (n) => `${Math.abs(n).toFixed(0)}%`;
