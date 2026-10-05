import { useEffect, useRef, useState } from 'react';
import { compactRupees, rupees } from '../lib/format.js';
import { monthsToTarget, sipSeries } from '../lib/finance.js';
import { MONTHS } from './chapters/Understand.jsx';
import './Ask.css';

const sep = MONTHS[0].data;
const aug = MONTHS[1].data;
const sum = (d) => Object.values(d).reduce((a, b) => a + b, 0);

function answers() {
  const total = sum(sep);
  const down = Math.round((1 - total / sum(aug)) * 100);
  const fs = sep.Food + sep.Shopping;
  const sip = sipSeries({ monthly: 5000, years: 10, rate: 12 }).at(-1).value;
  const m = monthsToTarget({ target: 50000000, saved: 2200000, monthly: 25000, rate: 10 });
  const years = m === null ? null : (m / 12).toFixed(1);
  return [
    {
      q: 'Where is my money going?',
      a: `You spent ${rupees(total)} in September, ${down}% less than August. Food and shopping together came to ${rupees(fs)} (${Math.round((fs / total) * 100)}%). Shopping fell by ${rupees(aug.Shopping - sep.Shopping)}, the biggest drop.`,
    },
    {
      q: 'How can I save more?',
      a: `Your bills have stayed at ${rupees(sep.Bills)} for three months, so they’re worth a look for a cheaper plan. And if ₹5,000 of food and shopping spend went into a SIP instead, it could grow to about ${compactRupees(sip)} in 10 years at an assumed 12%.`,
    },
    {
      q: 'Am I on track for ₹5 crore?',
      a: `With ₹22 L saved and ₹25,000 added each month, an assumed 10% a year gets you to ₹5 Cr in about ${years} years. Adding ₹5,000 more a month would bring that closer.`,
    },
  ];
}

export default function Ask() {
  const list = answers();
  const [picked, setPicked] = useState(0);
  const [typing, setTyping] = useState(false);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const pick = (i) => {
    if (i === picked && !typing) return;
    clearTimeout(timer.current);
    setPicked(i);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return setTyping(false);
    setTyping(true);
    timer.current = setTimeout(() => setTyping(false), 650);
  };

  return (
    <section className="ask section" aria-labelledby="ask-title">
      <div className="wrap ask__grid">
        <div className="ask__copy">
          <h2 id="ask-title" className="h2">
            Ask anything. Get an answer from your own numbers.
          </h2>
          <p className="lede">
            No jargon to decode and no tabs to cross-check. Ask in plain words and Fermor answers from your data,
            showing the figures it used.
          </p>
          <a className="btn btn--ghost" href="#waitlist">
            Ask your own on the waitlist
          </a>
        </div>

        <div className="chat" aria-live="polite">
          <p className="chat__tag">Sample conversation</p>
          <div className="chat__log">
            <p className="bubble bubble--me">{list[picked].q}</p>
            {typing ? (
              <p className="bubble bubble--fermor bubble--typing" aria-label="Fermor is typing">
                <span />
                <span />
                <span />
              </p>
            ) : (
              <p className="bubble bubble--fermor">{list[picked].a}</p>
            )}
          </div>
          <div className="chat__chips" role="group" aria-label="Try a question">
            {list.map((item, i) => (
              <button key={item.q} type="button" aria-pressed={i === picked} onClick={() => pick(i)}>
                {item.q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
