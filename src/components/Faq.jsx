import { useState } from 'react';
import './Faq.css';

const QUESTIONS = [
  {
    q: 'What does Fermor actually do?',
    a: 'Fermor runs the maths behind everyday money decisions. There are calculators for loans, savings and tax, and plain analysis of what the numbers mean, so you can compare options before you commit to one. The app brings investing, tracking and planning into one place.',
  },
  {
    q: 'How should I use the calculators?',
    a: 'Start with the numbers you already know, then move one input at a time and watch what it does to the result. Seeing how sensitive an outcome is to a single change is usually more useful than any one figure.',
  },
  {
    q: 'Do the tools give financial advice?',
    a: 'No. Fermor is educational and is not a SEBI-registered adviser. The tools show you the arithmetic and the trade-offs. The decision, and any advice you want on it, stays with you and your adviser.',
  },
  {
    q: 'What happens to the numbers I enter?',
    a: 'Calculations run in your browser. Your inputs stay on your device unless you choose to save a result to an account, and you can clear a saved calculation whenever you want.',
  },
  {
    q: 'How do I get started?',
    a: 'Pick the calculator closest to the decision in front of you and run it once with real numbers. Everything on Fermor is free to use, and you only need an account if you want your results kept between visits. To get the app first, join the waitlist.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq section" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq__grid">
        <h2 id="faq-title" className="h2">
          Questions, answered
        </h2>
        <div className="faq__list">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="faq__item">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                      <path d="M4 11h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path className="plus" d="M11 4v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={`faq__a ${isOpen ? 'is-open' : ''}`}>
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
