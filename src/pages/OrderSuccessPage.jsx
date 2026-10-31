import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock3, MapPin, PackageCheck, Phone, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { getProduct } from '../data/products';
import { formatPeso } from '../lib/format';
import ProductVisual from '../components/ProductVisual';
import Button from '../components/ui/Button';
import { EmptyState } from '../components/ui/primitives';

export default function OrderSuccessPage() {
  const { lastOrder } = useStore();

  if (!lastOrder) {
    return (
      <div className="container-page py-12 sm:py-16">
        <EmptyState
          icon={ShoppingBag}
          title="No recent order found"
          description="Place an order in this prototype and the confirmation will appear here."
          action={<Button to="/shop">Browse products</Button>}
        />
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-2xl border border-success/30 bg-surface p-6 text-center sm:p-9">
          <div className="hero-mesh absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="relative">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
              <CheckCircle2 size={34} strokeWidth={1.7} />
            </span>
            <p className="eyebrow mt-5 text-success">Order confirmed</p>
            <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Salamat, {lastOrder.customer?.firstName || 'ka-TNC'}!
            </h1>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              Your reservation is in. Our Balanga team will confirm stock and pickup details by phone or email within business hours.
            </p>
            <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-xl border bg-surface-2 px-4 py-2.5">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">Order number</span>
              <span className="text-sm font-bold text-primary">{lastOrder.id}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="card p-4">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-muted"><MapPin size={12} className="text-primary" /> Pickup branch</p>
            <p className="mt-1.5 text-xs font-semibold text-ink">{lastOrder.branch}</p>
            <p className="mt-0.5 text-[10px] text-muted">{lastOrder.fulfillment === 'pickup' ? 'Ready after confirmation' : 'Local delivery arranged'}</p>
          </div>
          <div className="card p-4">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-muted"><Clock3 size={12} className="text-primary" /> Typical timeline</p>
            <p className="mt-1.5 text-xs font-semibold text-ink">Ready in 1 business day</p>
            <p className="mt-0.5 text-[10px] text-muted">Order-basis items take 2–5 days</p>
          </div>
          <div className="card p-4">
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-muted"><Phone size={12} className="text-primary" /> Payment</p>
            <p className="mt-1.5 text-xs font-semibold text-ink">{lastOrder.payment}</p>
            <p className="mt-0.5 text-[10px] text-muted">No online payment collected</p>
          </div>
        </div>

        <div className="card mt-4 overflow-hidden">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="font-display text-base font-bold text-ink">Your items</h2>
            <span className="text-[10px] text-muted">{lastOrder.items.length} line{lastOrder.items.length === 1 ? '' : 's'}</span>
          </div>
          <ul className="divide-y">
            {lastOrder.items.map((item) => {
              const product = getProduct(item.id);
              return (
                <li key={item.id} className="flex items-center gap-3 p-4">
                  <div className="w-12 shrink-0 overflow-hidden rounded-lg">
                    {product ? <ProductVisual product={product} className="aspect-square" showMeta={false} /> : <div className="aspect-square rounded-lg bg-surface-2" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-xs font-semibold text-ink">{item.name}</p>
                    <p className="text-[10px] text-muted">Qty {item.qty}</p>
                  </div>
                  <span className="text-xs font-bold text-ink">{formatPeso(item.price * item.qty)}</span>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between border-t bg-surface-2/50 px-4 py-3">
            <span className="text-xs font-semibold text-muted">Total</span>
            <span className="font-display text-lg font-bold text-ink">{formatPeso(lastOrder.total)}</span>
          </div>
        </div>

        <div className="mt-4 rounded-xl border bg-surface p-4">
          <p className="flex items-start gap-2 text-[11px] leading-5 text-muted">
            <PackageCheck size={15} className="mt-0.5 shrink-0 text-primary" />
            <span>
              <strong className="text-ink">What happens next:</strong> We verify stock at {lastOrder.branch}, prepare your items, then contact you at {lastOrder.customer?.phone || 'your mobile number'} to arrange pickup or delivery. Bring a valid ID when collecting.
            </span>
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button to="/track-order" size="lg">Track this order <ArrowRight size={16} /></Button>
          <Button to="/shop" variant="secondary" size="lg">Continue shopping</Button>
        </div>
        <p className="mt-4 text-center text-[10px] text-muted">
          Need to change something? <Link to="/contact" className="font-semibold text-primary hover:underline">Contact the store</Link> with your order number.
        </p>
      </div>
    </div>
  );
}
