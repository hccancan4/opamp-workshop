import { useState, useEffect, useRef } from 'react';
import './Slider.css';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  log?: boolean;
  format?: (v: number) => string;
  onChange: (v: number) => void;
}

function toLog(v: number, min: number, max: number): number {
  return min * Math.pow(max / min, v);
}
function fromLog(v: number, min: number, max: number): number {
  return Math.log(v / min) / Math.log(max / min);
}

/** Format raw value as a concise string for the edit input */
function rawDisplay(value: number, step?: number): string {
  if (step && step >= 1) return String(Math.round(value));
  if (value >= 1000) return String(Math.round(value));
  return String(parseFloat(value.toPrecision(4)));
}

export default function Slider({
  label, value, min, max, step, log = false, format, onChange,
}: SliderProps) {
  const [editing,  setEditing]  = useState(false);
  const [editText, setEditText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const sliderVal  = log ? fromLog(value, min, max) : (value - min) / (max - min);
  const displayVal = format ? format(value) : String(value);

  // Auto-focus + select-all when entering edit mode
  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseFloat(e.target.value);
    const v   = log ? toLog(raw, min, max) : min + raw * (max - min);
    onChange(Math.max(min, Math.min(max, v)));
  };

  const startEdit = () => {
    setEditText(rawDisplay(value, step));
    setEditing(true);
  };

  const commitEdit = () => {
    const parsed = parseFloat(editText);
    if (!isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(max, parsed));
      onChange(step ? Math.round(clamped / step) * step : clamped);
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')  { e.preventDefault(); commitEdit(); }
    if (e.key === 'Escape') { setEditing(false); }
  };

  return (
    <div className="slider-row">
      <div className="slider-head">
        <span className="slider-label">{label}</span>

        {editing ? (
          <input
            ref={inputRef}
            className="slider-edit-input"
            type="text"
            inputMode="decimal"
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleKeyDown}
            aria-label={`${label} — değer gir`}
          />
        ) : (
          <span
            className="slider-val"
            title="Tıkla → sayı gir"
            onClick={startEdit}
            role="button"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startEdit(); } }}
            aria-label={`${label}: ${displayVal}. Düzenlemek için Enter'a bas.`}
          >
            {displayVal}
          </span>
        )}
      </div>
      <input
        type="range"
        className="slider-input"
        min={0} max={1} step={0.001}
        value={sliderVal}
        onChange={handleSlider}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={displayVal}
      />
    </div>
  );
}
