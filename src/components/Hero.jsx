import { useMemo, useState } from 'react';
import GrowthChart from './GrowthChart.jsx';
import RangeField from './RangeField.jsx';
import { compactRupees, rupees } from '../lib/format.js';
import { sipSeries } from '../lib/finance.js';
import './Hero.css';

const INFLATION = 6;

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#75fb90" />
      <path d="M5 9.4l2.6 2.6L13 6.6" fill="none" stroke="#10231c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Forecast() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(12);
  const [real, setReal] = useState(false);
  const [cursor, setCursor] = useState(null);

  const points = useMemo(
    () => sipSeries({ monthly, years, rate, inflation: real ? INFLATION : 0 }),
    [monthly, years, rate, real]
  );
  const end = points[points.length - 1];
  const index = Math.min(cursor ?? points.length - 1, points.length - 1);
  const shown = points[index];
  const growth = end.value - end.invested;

  return (
    <section className="forecast on-dark" aria-labelledby="forecast-title">
      <div className="forecast__top">
        <h2 id="forecast-title" className="forecast__title">
          What a monthly SIP could grow into
        </h2>
        <button
          type="button"
          role="switch"
          aria-checked={real}
          className="switch"
          onClick={() => setReal((v) => !v)}
        >
          <span className="switch__track" aria-hidden="true">
            <span className="switch__thumb" />
          </span>
          In today’s money
        </button>
      </div>

      <p className="forecast__sentence" aria-live="polite">
        In {years} years you’d have
      </p>
      <p className="forecast__result display num" aria-live="polite">
        {compactRupees(end.value)}
      </p>
      <p className="forecast__split num">
        <span>
          <i className="swatch swatch--in" aria-hidden="true" />
          You put in {compactRupees(end.invested)}
        </span>
        <span>
          <i className="swatch swatch--out" aria-hidden="true" />
          {real ? `Adjusted for ${INFLATION}% inflation` : `Growth adds ${compactRupees(growth)}`}
        </span>
      </p>

      <div className="forecast__chart" onPointerLeave={() => setCursor(null)}>
        <p className="forecast__readout num" aria-hidden="true">
          {index === points.length - 1 && cursor === null
            ? `Year ${shown.year}`
            : `Year ${shown.year} · ${compactRupees(shown.value)} from ${compactRupees(shown.invested)}`}
        </p>
        <GrowthChart points={points} index={index} onIndex={setCursor} />
      </div>

      <div className="forecast__controls">
        <RangeField
          label="Invest every month"
          value={monthly}
          min={1000}
          max={100000}
          step={500}
          onChange={setMonthly}
          display={rupees(monthly)}
        />
        <RangeField label="For" value={years} min={1} max={40} onChange={(v) => { setYears(v); setCursor(null); }} display={`${years} ${years === 1 ? 'year' : 'years'}`} />
        <RangeField label="At an assumed return of" value={rate} min={4} max={18} step={0.5} onChange={setRate} display={`${rate}% a year`} />
      </div>

      <p className="forecast__note">Illustration only. The return is an assumption, not a promise.</p>
    </section>
  );
}

export default function Hero() {
  return (
    <div className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="hero__status">
            <span className="hero__pulse" aria-hidden="true" />
            Waitlist open
          </p>
          <h1 className="display hero__title">Your money, clear enough to act on.</h1>
          <p className="lede">
            Fermor brings your investments, spending and goals into one place, then shows the maths behind every number,
            so the next decision is an easy one.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href="#waitlist">
              Join the waitlist
            </a>
            <a className="btn btn--ghost" href="#calculators">
              Try a free calculator
            </a>
          </div>
          <ul className="hero__facts">
            <li>
              <Check /> Free calculators, no sign-up
            </li>
            <li>
              <Check /> Made for India: ₹, lakh, crore, both tax regimes
            </li>
            <li>
              <Check /> Educational, never advice
            </li>
          </ul>
        </div>
        <Forecast />
      </div>
    </div>
  );
}
