import { useId } from 'react';

/** Labelled slider that exposes its fill percentage to CSS. */
export default function RangeField({ label, value, min, max, step = 1, onChange, display, className = '', style }) {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={`field ${className}`}>
      <div className="field__head">
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id} className="num">
          {display}
        </output>
      </div>
      <input
        id={id}
        className="range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--pct': `${pct}%`, ...style }}
      />
    </div>
  );
}
