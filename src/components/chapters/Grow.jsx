import { useMemo, useState } from 'react';
import RangeField from '../RangeField.jsx';
import { compactRupees, rupees } from '../../lib/format.js';
import { addMonths, monthsToTarget } from '../../lib/finance.js';

const GOALS = [
  { id: 'safety', name: 'Emergency fund', target: 300000, saved: 80000, monthly: 8000, max: 40000 },
  { id: 'home', name: 'Home down payment', target: 2000000, saved: 450000, monthly: 25000, max: 100000 },
  { id: 'retire', name: 'Retirement', target: 50000000, saved: 2200000, monthly: 25000, max: 150000 },
];

const RATE = 8;

export default function Grow() {
  const [goalId, setGoalId] = useState('home');
  const [monthlyByGoal, setMonthly] = useState(() => Object.fromEntries(GOALS.map((g) => [g.id, g.monthly])));
  const goal = GOALS.find((g) => g.id === goalId);
  const monthly = monthlyByGoal[goalId];

  const months = useMemo(
    () => monthsToTarget({ target: goal.target, saved: goal.saved, monthly, rate: RATE }),
    [goal, monthly]
  );
  const base = useMemo(
    () => monthsToTarget({ target: goal.target, saved: goal.saved, monthly: goal.monthly, rate: RATE }),
    [goal]
  );

  const progress = Math.min(100, (goal.saved / goal.target) * 100);
  const date = months === null ? null : addMonths(new Date(), months);
  const when = date ? date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : null;
  const span = months === null ? null : months >= 12 ? `${Math.floor(months / 12)} yr ${months % 12} mo` : `${months} mo`;

  let compare = '';
  if (months !== null && base !== null && months !== base) {
    const diff = Math.abs(base - months);
    const txt = diff >= 12 ? `${Math.floor(diff / 12)} yr ${diff % 12} mo` : `${diff} mo`;
    compare = `${txt} ${months < base ? 'sooner' : 'later'} than ${rupees(goal.monthly)} a month.`;
  }

  return (
    <div className="demo">
      <div className="demo__bar">
        <div className="segmented" role="group" aria-label="Goal">
          {GOALS.map((g) => (
            <button key={g.id} aria-pressed={g.id === goalId} onClick={() => setGoalId(g.id)}>
              {g.name}
            </button>
          ))}
        </div>
        <span className="demo__tag">Sample goal</span>
      </div>

      <div className="goal">
        <div className="goal__nums num">
          <span>
            <span className="spend__label">Saved so far</span>
            <strong>{compactRupees(goal.saved)}</strong>
          </span>
          <span>
            <span className="spend__label">Target</span>
            <strong>{compactRupees(goal.target)}</strong>
          </span>
        </div>
        <div
          className="meter"
          role="progressbar"
          aria-label={`${goal.name} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="goal__pct num">{progress.toFixed(0)}% there</p>
      </div>

      <RangeField
        className="grow__range"
        label="Add every month"
        value={monthly}
        min={1000}
        max={goal.max}
        step={500}
        display={rupees(monthly)}
        onChange={(v) => setMonthly((s) => ({ ...s, [goalId]: v }))}
        style={{ '--fill': 'var(--moss)' }}
      />

      <div className="goal__result">
        {months === null ? (
          <p className="spend__total display">Not within 50 years</p>
        ) : (
          <>
            <p className="spend__label">You could get there by</p>
            <p className="spend__total display num">{when}</p>
            <p className="goal__span">
              In {span} at an assumed {RATE}% a year. {compare}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
