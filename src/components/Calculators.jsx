import { useState } from 'react';
import './Calculators.css';

const BASE = 'https://fermor.in/calculators/';

const TOOLS = [
  { slug: 'sip-calculator', name: 'SIP calculator', text: 'What a monthly investment could become.', group: 'Investing' },
  { slug: 'lumpsum-calculator', name: 'Lumpsum calculator', text: 'Growth on a one-time investment.', group: 'Investing' },
  { slug: 'compound-interest-calculator', name: 'Compound interest', text: 'See interest earning interest, year by year.', group: 'Investing' },
  { slug: 'fd-calculator', name: 'FD calculator', text: 'Maturity value of a fixed deposit.', group: 'Investing' },
  { slug: 'ppf-calculator', name: 'PPF calculator', text: 'Where 15 years of PPF deposits land.', group: 'Investing' },
  { slug: 'swp-calculator', name: 'SWP calculator', text: 'How long a regular withdrawal plan lasts.', group: 'Investing' },
  { slug: 'emi-calculator', name: 'EMI calculator', text: 'Monthly payment for any loan.', group: 'Loans' },
  { slug: 'home-loan-calculator', name: 'Home loan calculator', text: 'EMI, interest paid and tenure trade-offs.', group: 'Loans' },
  { slug: 'income-tax-calculator', name: 'Income tax calculator', text: 'Old and new regime, side by side.', group: 'Tax & salary' },
  { slug: 'gratuity-calculator', name: 'Gratuity calculator', text: 'What you’re owed after years of service.', group: 'Tax & salary' },
];

const FILTERS = ['All', 'Investing', 'Loans', 'Tax & salary'];

export default function Calculators() {
  const [filter, setFilter] = useState('All');
  const shown = TOOLS.filter((t) => filter === 'All' || t.group === filter);

  return (
    <section className="calcs section" id="calculators" aria-labelledby="calcs-title">
      <div className="wrap calcs__grid">
        <div className="calcs__intro">
          <h2 id="calcs-title" className="h2">
            Free calculators for everyday money decisions
          </h2>
          <p className="lede">
            Start with numbers you already know, then move one input at a time. No sign-up, and your inputs stay in your
            browser.
          </p>
          <div className="segmented" role="group" aria-label="Filter calculators">
            {FILTERS.map((f) => (
              <button key={f} aria-pressed={f === filter} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <ul className="calcs__list" aria-label={`${shown.length} calculators`}>
          {shown.map((t) => (
            <li key={t.slug}>
              <a href={BASE + t.slug} target="_blank" rel="noopener noreferrer" className="calc">
                <span className="calc__name">{t.name}</span>
                <span className="calc__text">{t.text}</span>
                <span className="calc__go" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="M5 15L15 5M7 5h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
