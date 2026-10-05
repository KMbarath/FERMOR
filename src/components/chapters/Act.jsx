import { useMemo, useState } from 'react';
import { rupees, compactRupees } from '../../lib/format.js';
import { sipSeries } from '../../lib/finance.js';

const KINDS = {
  Stocks: {
    blurb: 'Own a slice of a single company. Prices move daily, so spread across several.',
    examples: ['HDFC Bank', 'SBI', 'Maruti Suzuki'],
  },
  'Mutual funds': {
    blurb: 'A professionally managed basket. Small monthly amounts add up steadily.',
    examples: ['Nifty 50 index fund', 'Flexi cap fund', 'Debt fund'],
  },
  ETFs: {
    blurb: 'Track a whole index, sector or theme in a single purchase.',
    examples: ['Nifty 50 ETF', 'Bank Nifty ETF', 'Gold ETF'],
  },
};

const PRESETS = [500, 1000, 2500, 5000];

export default function Act() {
  const [kind, setKind] = useState('Mutual funds');
  const [amount, setAmount] = useState(5000);
  const [day, setDay] = useState(17);

  const tenYears = useMemo(() => sipSeries({ monthly: amount, years: 10, rate: 12 }).at(-1).value, [amount]);
  const step = (d) => setAmount((a) => Math.min(100000, Math.max(500, a + d)));

  return (
    <div className="demo">
      <div className="demo__bar">
        <div className="segmented" role="group" aria-label="What to invest in">
          {Object.keys(KINDS).map((k) => (
            <button key={k} aria-pressed={k === kind} onClick={() => setKind(k)}>
              {k}
            </button>
          ))}
        </div>
        <span className="demo__tag">Example</span>
      </div>

      <p className="act__blurb">{KINDS[kind].blurb}</p>
      <ul className="act__examples" aria-label="Examples">
        {KINDS[kind].examples.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>

      <div className="act__amount">
        <p className="spend__label" id="sip-label">
          Monthly SIP
        </p>
        <div className="stepper" role="group" aria-labelledby="sip-label">
          <button type="button" aria-label="Decrease by 500 rupees" onClick={() => step(-500)} disabled={amount <= 500}>
            −
          </button>
          <p className="stepper__value display num" aria-live="polite">
            {rupees(amount)}
          </p>
          <button type="button" aria-label="Increase by 500 rupees" onClick={() => step(500)} disabled={amount >= 100000}>
            +
          </button>
        </div>
        <div className="presets">
          {PRESETS.map((p) => (
            <button key={p} type="button" aria-pressed={amount === p} onClick={() => setAmount(p)}>
              {rupees(p)}
            </button>
          ))}
        </div>
      </div>

      <div className="act__row">
        <label htmlFor="sip-day">Debited on the</label>
        <select id="sip-day" value={day} onChange={(e) => setDay(Number(e.target.value))}>
          {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d}>
              {d}
              {d % 10 === 1 && d !== 11 ? 'st' : d % 10 === 2 && d !== 12 ? 'nd' : d % 10 === 3 && d !== 13 ? 'rd' : 'th'}
            </option>
          ))}
        </select>
        <span>of every month</span>
      </div>

      <p className="insight">
        {rupees(amount * 12)} a year. Kept up for 10 years at an assumed 12%, that could become{' '}
        <strong className="num">{compactRupees(tenYears)}</strong>.
      </p>
      <a className="btn btn--primary" href="#waitlist">
        Join the waitlist to start
      </a>
    </div>
  );
}
