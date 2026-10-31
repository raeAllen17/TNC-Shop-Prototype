import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Clock3, MapPin, Package, Phone, Search, ShoppingBag, Store, Truck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import { formatPeso } from '../lib/format';
import Button from '../components/ui/Button';
import { Badge } from '../components/ui/primitives';

const sampleOrder = {
  id: 'TNC-DEMO2026',
  createdAt: new Date().toISOString(),
  branch: 'Balanga Main',
  fulfillment: 'pickup',
  payment: 'Cash on pickup',
  total: 24270,
  customer: { firstName: 'Demo', email: 'demo@email.com', phone: '0917 555 0123' },
  items: [
    { id: products[0]?.id, name: products[0]?.name, price: products[0]?.price, qty: 1 },
    { id: products[20]?.id, name: products[20]?.name, price: products[20]?.price, qty: 1 },
  ],
  status: 'preparing',
};

const timeline = [
  { key: 'confirmed', label: 'Order confirmed', copy: 'We received your reservation.', icon: Check },
  { key: 'preparing', label: 'Preparing at branch', copy: 'Stock check and item preparation.', icon: Package },
  { key: 'ready', label: 'Ready for pickup', copy: 'We will call or text you.', icon: Store },
  { key: 'completed', label: 'Completed', copy: 'Enjoy your new gear.', icon: ShoppingBag },
];

const stageIndex = { confirmed: 0, preparing: 1, ready: 2, completed: 3 };

export default function TrackOrderPage() {
  const { lastOrder } = useStore();
  const [orderNumber, setOrderNumber] = useState(lastOrder?.id || '');
  const [email, setEmail] = useState(lastOrder?.customer?.email || '');
  const [result, setResult] = useState(lastOrder || null);
  const [error, setError] = useState('');

  const lookup = (event) => {
    event.preventDefault();
    setError('');
    const value = orderNumber.trim().toUpperCase();
    if (lastOrder && value === lastOrder.id.toUpperCase()) {
      setResult(lastOrder);
      return;
    }
    if (value === sampleOrder.id) {
      setResult(sampleOrder);
      return;
    }
    setResult(null);
    setError('We could not find that order number. Check your confirmation email or try the demo order.');
  };

  const activeIndex = result ? stageIndex[result.status] ?? 0 : 0;
  const readyDate = new Date();
  readyDate.setDate(readyDate.getDate() + (result?.status === 'preparing' ? 0 : 1));

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="eyebrow mb-2">Stay in the loop</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink">Track your order</h1>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            Enter the order number from your confirmation. No account needed.
          </p>
        </div>

        <form onSubmit={lookup} className="card mx-auto mt-6 max-w-xl p-5">
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <div>
              <label htmlFor="order-number" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Order number</label>
              <input id="order-number" value={orderNumber} onChange={(event) => setOrderNumber(event.target.value)} className="input" placeholder="TNC-123456" required />
            </div>
            <div>
              <label htmlFor="track-email" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Email (optional)</label>
              <input id="track-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="input" placeholder="you@email.com" />
            </div>
            <Button type="submit" className="self-end"><Search size={15} /> Track</Button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-muted">Just exploring?</span>
            <button
              type="button"
              onClick={() => { setOrderNumber(sampleOrder.id); setEmail(''); setError(''); setResult(sampleOrder); }}
              className="chip border-primary/30 bg-primary-soft text-primary"
            >
              Try demo order {sampleOrder.id}
            </button>
          </div>
          {error && <p className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-[11px] text-red-400" role="alert">{error}</p>}
        </form>

        {result && (
          <div className="mt-5 space-y-4">
            <div className="card overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted">Order</p>
                  <p className="font-display text-lg font-bold text-primary">{result.id}</p>
                </div>
                <Badge variant={result.status === 'ready' ? 'success' : 'primary'} dot>
                  {result.status === 'ready' ? 'Ready for pickup' : 'Preparing'}
                </Badge>
              </div>

              <div className="p-5">
                <div className="mb-5 grid gap-3 rounded-xl bg-surface-2 p-3.5 text-[11px] sm:grid-cols-3">
                  <p className="flex items-start gap-2 text-muted"><MapPin size={14} className="mt-0.5 shrink-0 text-primary" /><span><strong className="block text-ink">{result.branch}</strong>Calero St., Ibayo, Balanga City</span></p>
                  <p className="flex items-start gap-2 text-muted"><Clock3 size={14} className="mt-0.5 shrink-0 text-primary" /><span><strong className="block text-ink">Estimated ready</strong>{readyDate.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })} · within store hours</span></p>
                  <p className="flex items-start gap-2 text-muted"><Truck size={14} className="mt-0.5 shrink-0 text-primary" /><span><strong className="block text-ink">{result.fulfillment === 'pickup' ? 'Store pickup' : 'Local delivery'}</strong>{result.payment}</span></p>
                </div>

                <ol className="relative space-y-5 before:absolute before:bottom-4 before:left-[15px] before:top-4 before:w-px before:bg-line">
                  {timeline.map((step, index) => {
                    const done = index <= activeIndex;
                    const current = index === activeIndex;
                    const StepIcon = step.icon;
                    return (
                      <li key={step.key} className="relative flex gap-3.5">
                        <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${done ? 'border-success bg-success text-[#07130c]' : 'border-line bg-surface text-muted'}`}>
                          {done && !current ? <Check size={14} strokeWidth={3} /> : <StepIcon size={14} />}
                        </span>
                        <div className={current ? 'rounded-lg bg-primary-soft px-2.5 py-1.5' : ''}>
                          <p className={`text-xs font-bold ${current ? 'text-primary' : done ? 'text-ink' : 'text-muted'}`}>
                            {step.label} {current && <span className="ml-1 text-[9px] font-bold uppercase tracking-wide">· current</span>}
                          </p>
                          <p className="mt-0.5 text-[10px] leading-4 text-muted">{step.copy}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="border-t p-5">
                <h2 className="font-display text-sm font-bold text-ink">Order summary</h2>
                <ul className="mt-3 space-y-2">
                  {result.items.map((item) => (
                    <li key={item.id} className="flex justify-between gap-3 text-[11px]">
                      <span className="text-muted">{item.name} <span className="text-[9px]">× {item.qty}</span></span>
                      <span className="font-semibold text-ink">{formatPeso(item.price * item.qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex justify-between border-t pt-3 text-xs font-bold text-ink">
                  <span>Total</span><span>{formatPeso(result.total)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-surface p-4 text-[11px] text-muted">
              <p className="flex items-center gap-2"><Phone size={14} className="text-primary" /> Questions about this order?</p>
              <Link to="/contact" className="font-bold text-primary hover:underline">Contact the store →</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
