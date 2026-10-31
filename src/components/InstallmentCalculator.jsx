import { useMemo, useState } from 'react';
import { Calculator, ChevronDown, Info } from 'lucide-react';
import { calculateInstallment, formatPeso } from '../lib/format';

export default function InstallmentCalculator({ price, compact = false, editable = false, title = 'Home Credit estimate' }) {
  const [downPercent, setDownPercent] = useState(10);
  const [months, setMonths] = useState(12);
  const [customPrice, setCustomPrice] = useState(price);
  const activePrice = editable ? customPrice : price;
  const result = useMemo(() => calculateInstallment(activePrice, downPercent, months), [activePrice, downPercent, months]);

  return (
    <div className={`rounded-2xl border bg-surface ${compact ? 'p-4' : 'p-5 sm:p-6'}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
              <Calculator size={16} />
            </span>
            <h3 className="font-display text-sm font-bold text-ink">{title}</h3>
          </div>
          <p className="mt-1.5 text-[11px] text-muted">Estimate only · approval required</p>
        </div>
        <span className="rounded-md bg-primary-soft px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-primary">6–24 mo</span>
      </div>

      <div className="space-y-4">
        {editable && (
          <div>
            <label htmlFor="credit-price" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Purchase amount</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-primary">₱</span>
              <input
                id="credit-price"
                type="number"
                min="1000"
                step="500"
                value={customPrice}
                onChange={(event) => setCustomPrice(Math.max(1000, Number(event.target.value) || 1000))}
                className="input pl-8"
                aria-label="Purchase amount for installment estimate"
              />
            </div>
          </div>
        )}
        <div>
          <div className="mb-2 flex items-center justify-between text-xs">
            <label htmlFor={`down-${price}`} className="font-semibold text-ink">Down payment</label>
            <span className="font-bold text-primary">{downPercent}% · {formatPeso(result.downPayment)}</span>
          </div>
          <input
            id={`down-${price}`}
            type="range"
            min="10"
            max="50"
            step="5"
            value={downPercent}
            onChange={(event) => setDownPercent(Number(event.target.value))}
            className="w-full"
            aria-valuetext={`${downPercent} percent`}
          />
          <div className="mt-1 flex justify-between text-[9px] font-semibold uppercase tracking-wide text-muted">
            <span>10% min</span><span>30%</span><span>50%</span>
          </div>
        </div>

        <div>
          <span className="mb-2 block text-xs font-semibold text-ink">Plan duration</span>
          <div className="grid grid-cols-5 gap-1.5">
            {[6, 9, 12, 18, 24].map((plan) => (
              <button
                key={plan}
                type="button"
                onClick={() => setMonths(plan)}
                className={`rounded-lg border py-2 text-[11px] font-bold transition ${
                  months === plan
                    ? 'border-primary bg-primary-soft text-primary'
                    : 'border-line bg-surface-2 text-muted hover:text-ink'
                }`}
                aria-pressed={months === plan}
              >
                {plan}mo
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3 rounded-xl border border-primary/20 bg-primary-soft p-3.5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Estimated monthly</p>
          <p className="mt-0.5 font-display text-xl font-bold text-primary">{formatPeso(result.monthly)}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted">Cash price</p>
          <p className="text-xs font-bold text-ink">{formatPeso(price)}</p>
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 text-[10px] leading-4 text-muted">
        <Info size={13} className="mt-0.5 shrink-0" />
        <p>
          Subject to Home Credit eligibility, document verification, and in-store approval. Interest and fees may apply.
          Visit <strong className="font-semibold text-ink">TNC Tech Hub Balanga</strong> for an official quote.
          {!compact && <a href="/faq" className="ml-1 inline-flex items-center gap-0.5 font-semibold text-primary">Learn more <ChevronDown size={10} className="-rotate-90" /></a>}
        </p>
      </div>
    </div>
  );
}
