import { useState } from 'react';
import './Principles.css';

const grouped = new Intl.NumberFormat('en-IN');

function lakhCrore(n) {
  if (n >= 1e7) return `${+(n / 1e7).toFixed(2)} crore`;
  if (n >= 1e5) return `${+(n / 1e5).toFixed(2)} lakh`;
  return grouped.format(n);
}

function Lakh() {
  const [raw, setRaw] = useState('12345678');
  const n = Number(raw) || 0;
  return (
    <div className="lakh">
      <label htmlFor="lakh-input">Type any amount</label>
      <div className="lakh__input">
        <span aria-hidden="true">₹</span>
        <input
          id="lakh-input"
          inputMode="numeric"
          autoComplete="off"
          value={n ? grouped.format(n) : ''}
          placeholder="0"
          maxLength={16}
          onChange={(e) => setRaw(e.target.value.replace(/\D/g, '').slice(0, 11))}
        />
      </div>
      <p className="lakh__out num" aria-live="polite">
        ₹{grouped.format(n)} <span>is</span> {lakhCrore(n)}
      </p>
    </div>
  );
}

const ITEMS = [
  {
    title: 'Your numbers stay with you',
    text: 'Calculations run in your browser. Inputs stay on your device unless you choose to save a result, and you can clear it any time.',
  },
  {
    title: 'No account to start',
    text: 'Pick the calculator closest to your decision and run it with real numbers. Everything is free to use.',
  },
  {
    title: 'Education, not advice',
    text: 'Fermor shows you the arithmetic and the trade-offs. It is not a SEBI-registered adviser, and the decision stays with you.',
  },
];

export default function Principles() {
  return (
    <section className="principles section on-dark" aria-labelledby="principles-title">
      <div className="wrap principles__grid">
        <div className="principles__lead">
          <h2 id="principles-title" className="h2">
            Built for India. Built to show its working.
          </h2>
          <p className="lede">
            Amounts in lakh and crore, the old and new tax regimes, and the schemes people here actually use. Not a
            global tool with a rupee sign added.
          </p>
          <Lakh />
        </div>
        <dl className="principles__list">
          {ITEMS.map((it) => (
            <div key={it.title}>
              <dt>{it.title}</dt>
              <dd>{it.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
