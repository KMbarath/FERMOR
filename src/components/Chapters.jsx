import { useRef, useState } from 'react';
import Understand from './chapters/Understand.jsx';
import Act from './chapters/Act.jsx';
import Grow from './chapters/Grow.jsx';
import './Chapters.css';

const TABS = [
  {
    id: 'understand',
    label: 'Understand',
    text: 'See where your money goes and what changed, across investments, spending and savings.',
    Panel: Understand,
  },
  {
    id: 'act',
    label: 'Act',
    text: 'Start small. Set an amount, pick a date and let a monthly SIP do the repeating.',
    Panel: Act,
  },
  {
    id: 'grow',
    label: 'Grow',
    text: 'Set a goal, then move one number to see how much sooner you could get there.',
    Panel: Grow,
  },
];

export default function Chapters() {
  const [active, setActive] = useState('understand');
  const refs = useRef({});

  const onKeyDown = (e) => {
    const i = TABS.findIndex((t) => t.id === active);
    let next = i;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % TABS.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = TABS.length - 1;
    else return;
    e.preventDefault();
    setActive(TABS[next].id);
    refs.current[TABS[next].id]?.focus();
  };

  return (
    <section className="chapters section" id="how-it-works" aria-labelledby="chapters-title">
      <div className="wrap">
        <header className="chapters__head">
          <h2 id="chapters-title" className="h2">
            Three jobs your money needs done
          </h2>
          <p className="lede">
            You can’t compound what you don’t understand. Fermor takes you from looking, to doing, to watching it work.
          </p>
        </header>

        <div className="chapters__body">
          <div className="tabs" role="tablist" aria-label="Understand, Act, Grow" onKeyDown={onKeyDown}>
            {TABS.map((t) => (
              <button
                key={t.id}
                ref={(el) => (refs.current[t.id] = el)}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active === t.id}
                aria-controls={`panel-${t.id}`}
                tabIndex={active === t.id ? 0 : -1}
                className="tab"
                onClick={() => setActive(t.id)}
              >
                <span className="tab__label">{t.label}</span>
                <span className="tab__text">{t.text}</span>
              </button>
            ))}
          </div>

          {TABS.map(({ id, Panel }) => (
            <div
              key={id}
              role="tabpanel"
              id={`panel-${id}`}
              aria-labelledby={`tab-${id}`}
              hidden={active !== id}
              className="panel"
            >
              <Panel />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
