import { useMemo, useState } from 'react';
import { rupees, percent } from '../../lib/format.js';

export const MONTHS = [
  { id: 'sep', label: 'Sep 2026', data: { Food: 12480, Shopping: 8320, Transport: 6900, Bills: 9840, Other: 10780 } },
  { id: 'aug', label: 'Aug 2026', data: { Food: 13200, Shopping: 11150, Transport: 7020, Bills: 9840, Other: 13700 } },
  { id: 'jul', label: 'Jul 2026', data: { Food: 12900, Shopping: 9400, Transport: 6600, Bills: 9840, Other: 12690 } },
];

const COLORS = {
  Food: '#10231c',
  Shopping: '#1d6847',
  Transport: '#75fb90',
  Bills: '#f2b33d',
  Other: '#b9c6bb',
};

const total = (data) => Object.values(data).reduce((a, b) => a + b, 0);

export default function Understand() {
  const [monthId, setMonthId] = useState('sep');
  const [focus, setFocus] = useState(null);

  const idx = MONTHS.findIndex((m) => m.id === monthId);
  const month = MONTHS[idx];
  const prev = MONTHS[idx + 1];
  const sum = total(month.data);

  const { delta, insight } = useMemo(() => {
    if (!prev) return { delta: null, insight: null };
    const prevSum = total(prev.data);
    const d = ((sum - prevSum) / prevSum) * 100;
    let biggest = null;
    for (const [k, v] of Object.entries(month.data)) {
      if (k === 'Other') continue; // a catch-all bucket isn't an insight
      const change = v - prev.data[k];
      if (!biggest || Math.abs(change) > Math.abs(biggest.change)) biggest = { k, change };
    }
    return {
      delta: d,
      insight: `${biggest.k} ${biggest.change < 0 ? 'fell' : 'rose'} by ${rupees(Math.abs(biggest.change))} compared with ${prev.label.split(' ')[0]}. That is the biggest move.`,
    };
  }, [month, prev, sum]);

  const entries = Object.entries(month.data);

  return (
    <div className="demo">
      <div className="demo__bar">
        <div className="segmented" role="group" aria-label="Month">
          {MONTHS.map((m) => (
            <button key={m.id} aria-pressed={m.id === monthId} onClick={() => setMonthId(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
        <span className="demo__tag">Sample data</span>
      </div>

      <div className="spend">
        <div>
          <p className="spend__label">Total spending</p>
          <p className="spend__total display num">{rupees(sum)}</p>
        </div>
        {delta !== null && (
          <p className={`chip ${delta <= 0 ? 'chip--good' : 'chip--warn'}`}>
            {delta <= 0 ? '↓' : '↑'} {percent(delta)} vs {prev.label.split(' ')[0]}
          </p>
        )}
      </div>

      <div className="stack" role="img" aria-label={`Spending split: ${entries.map(([k, v]) => `${k} ${percent((v / sum) * 100)}`).join(', ')}`}>
        {entries.map(([k, v]) => (
          <span
            key={k}
            className={focus && focus !== k ? 'is-dim' : ''}
            style={{ flexGrow: v, background: COLORS[k] }}
          />
        ))}
      </div>

      <ul className="cats">
        {entries.map(([k, v]) => (
          <li key={k}>
            <button
              type="button"
              className={`cat ${focus === k ? 'is-on' : ''}`}
              onMouseEnter={() => setFocus(k)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(k)}
              onBlur={() => setFocus(null)}
            >
              <span className="cat__dot" style={{ background: COLORS[k] }} aria-hidden="true" />
              <span className="cat__name">{k}</span>
              <span className="cat__pct num">{percent((v / sum) * 100)}</span>
              <span className="cat__amt num">{rupees(v)}</span>
            </button>
          </li>
        ))}
      </ul>

      <p className="insight">{insight ?? 'Pick a later month to see what changed.'}</p>
    </div>
  );
}
