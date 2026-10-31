import { Minus, Plus } from 'lucide-react';

export default function QuantityStepper({ value, onChange, min = 1, max = 99, label = 'Quantity' }) {
  return (
    <div className="inline-flex h-11 items-center rounded-xl border bg-surface-2" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-full w-10 items-center justify-center rounded-l-xl text-muted transition hover:text-primary disabled:opacity-35"
        aria-label="Decrease quantity"
      >
        <Minus size={15} />
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (!Number.isNaN(next)) onChange(Math.min(max, Math.max(min, next)));
        }}
        className="h-full w-11 border-x bg-transparent text-center text-sm font-bold text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        aria-label={label}
      />
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-full w-10 items-center justify-center rounded-r-xl text-muted transition hover:text-primary disabled:opacity-35"
        aria-label="Increase quantity"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
