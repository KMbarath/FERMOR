import { useRef } from 'react';
import { compactRupees } from '../lib/format.js';

const W = 600;
const H = 220;
const TOP = 14;

/**
 * Two-layer area chart: money put in (flat, pale) and what it's worth (green).
 * Scrub with a pointer, or focus it and use the arrow keys.
 */
export default function GrowthChart({ points, index, onIndex }) {
  const ref = useRef(null);
  const last = points.length - 1;
  const max = Math.max(...points.map((p) => Math.max(p.value, p.invested)), 1);

  const x = (i) => (last === 0 ? 0 : (i / last) * W);
  const y = (v) => H - (v / max) * (H - TOP);

  const line = (key) => points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(p[key]).toFixed(1)}`).join(' ');
  const area = (key) => `${line(key)} L${W} ${H} L0 ${H} Z`;

  const fromPointer = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    onIndex(Math.round(ratio * last));
  };

  const onKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') onIndex(Math.min(last, index + 1));
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') onIndex(Math.max(0, index - 1));
    else if (e.key === 'Home') onIndex(0);
    else if (e.key === 'End') onIndex(last);
    else return;
    e.preventDefault();
  };

  const point = points[index];
  const ticks = [...new Set([0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(t * last)))];

  return (
    <div className="chart">
      <div
        ref={ref}
        className="chart__plot"
        role="slider"
        tabIndex={0}
        aria-label="Growth by year"
        aria-valuemin={0}
        aria-valuemax={last}
        aria-valuenow={index}
        aria-valuetext={`Year ${point.year}: worth ${compactRupees(point.value)}, you put in ${compactRupees(point.invested)}`}
        onPointerDown={fromPointer}
        onPointerMove={(e) => (e.pointerType === 'mouse' || e.buttons) && fromPointer(e)}
        onKeyDown={onKey}
      >
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <path d={area('value')} fill="#75fb90" fillOpacity="0.2" />
          <path d={area('invested')} fill="#fcfdfb" fillOpacity="0.14" />
          <path d={line('invested')} fill="none" stroke="#fcfdfb" strokeOpacity="0.55" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <path d={line('value')} fill="none" stroke="#75fb90" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </svg>
        <div className="chart__cursor" style={{ left: `${(index / last) * 100}%` }}>
          <span className="chart__dot" style={{ top: `${(y(point.value) / H) * 100}%` }} />
        </div>
      </div>
      <div className="chart__ticks" aria-hidden="true">
        {ticks.map((t) => (
          <span
            key={t}
            style={{
              left: `${(t / last) * 100}%`,
              transform: t === 0 ? 'none' : t === last ? 'translateX(-100%)' : 'translateX(-50%)',
            }}
          >
            {t === 0 ? 'Today' : `${t}y`}
          </span>
        ))}
      </div>
    </div>
  );
}
