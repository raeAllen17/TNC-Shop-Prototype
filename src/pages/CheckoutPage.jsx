import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Banknote, Check, CreditCard, MapPin, ShieldCheck, ShoppingBag, Store, Truck, WalletCards,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { EmptyState } from '../components/ui/primitives';
import InstallmentCalculator from '../components/InstallmentCalculator';
import ProductVisual from '../components/ProductVisual';
import Button from '../components/ui/Button';
import { formatPeso } from '../lib/format';

const FREE_SHIPPING = 15000;
const DELIVERY_FEE = 150;

const paymentOptions = [
  { id: 'cash', label: 'Cash on pickup', description: 'Reserve online and pay when you collect or have it delivered.', icon: Banknote },
  { id: 'card', label: 'Credit / debit card', description: 'Pay securely at the store terminal when you pick up.', icon: CreditCard },
  { id: 'credit', label: 'Home Credit installment', description: 'Apply in-store. Final approval and terms depend on the lender.', icon: WalletCards },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, subtotal, cartCount, branch, setBranchModalOpen, placeOrder, showToast } = useStore();
  const [fulfillment, setFulfillment] = useState('pickup');
  const [payment, setPayment] = useState('cash');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', city: 'Balanga City', notes: '' });
  const [agree, setAgree] = useState(false);

  const shipping = fulfillment === 'pickup' || subtotal >= FREE_SHIPPING ? 0 : DELIVERY_FEE;
  const total = subtotal + shipping;

  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    if (!agree) {
      showToast('Please accept the terms to place your order.', 'error');
      return;
    }
    if (!branch) {
      setBranchModalOpen(true);
      return;
    }
    const paymentLabel = paymentOptions.find((option) => option.id === payment)?.label || 'Cash on pickup';
    const order = placeOrder({
      customer: { ...form },
      fulfillment,
      payment: paymentLabel,
      branch: branch.name,
      shipping,
      total,
    });
    showToast('Order placed — salamat!', 'success');
    navigate('/order-success', { state: { orderId: order.id } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container-page py-12 sm:py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Nothing to check out yet"
          titleAs="h1"
          description="Add a few parts or a pre-built PC to your cart first. We'll save your branch and wishlist along the way."
          action={<Button to="/shop">Browse products</Button>}
        />
      </div>
    );
  }

  return (
    <div className="container-page py-6 sm:py-10">
      <div className="mb-5">
        <p className="eyebrow mb-1.5">Guest checkout</p>
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Checkout</h1>
        <p className="mt-1 text-xs text-muted">No account required. We&apos;ll confirm your order by phone or email.</p>
      </div>

      <div className="mb-5 flex items-center gap-2 overflow-x-auto text-[10px] font-semibold no-scrollbar">
        <span className="flex items-center gap-1.5 whitespace-nowrap text-primary"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[9px] text-white">1</span> Your details</span>
        <span className="h-px w-8 bg-line" />
        <span className="flex items-center gap-1.5 whitespace-nowrap text-muted"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-2 text-[9px]">2</span> Fulfillment</span>
        <span className="h-px w-8 bg-line" />
        <span className="flex items-center gap-1.5 whitespace-nowrap text-muted"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-2 text-[9px]">3</span> Review & place order</span>
      </div>

      <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[1fr_370px]">
        <div className="space-y-4">
          <section className="card p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-display text-base font-bold text-ink">Contact details</h2>
              <span className="text-[10px] text-muted">Guest — no password needed</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">First name</label>
                <input id="first-name" required value={form.firstName} onChange={(event) => setField('firstName', event.target.value)} className="input" placeholder="Juan" autoComplete="given-name" />
              </div>
              <div>
                <label htmlFor="last-name" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Last name</label>
                <input id="last-name" required value={form.lastName} onChange={(event) => setField('lastName', event.target.value)} className="input" placeholder="Dela Cruz" autoComplete="family-name" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Email address</label>
                <input id="email" type="email" required value={form.email} onChange={(event) => setField('email', event.target.value)} className="input" placeholder="juan@email.com" autoComplete="email" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Mobile number</label>
                <input id="phone" type="tel" required value={form.phone} onChange={(event) => setField('phone', event.target.value)} className="input" placeholder="0917 123 4567" autoComplete="tel" />
              </div>
            </div>
          </section>

          <section className="card p-5">
            <h2 className="font-display text-base font-bold text-ink">How would you like to receive it?</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setFulfillment('pickup')}
                className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition ${fulfillment === 'pickup' ? 'border-primary bg-primary-soft' : 'bg-surface-2 hover:border-primary/50'}`}
                aria-pressed={fulfillment === 'pickup'}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${fulfillment === 'pickup' ? 'bg-primary text-white' : 'bg-surface text-primary'}`}><Store size={15} /></span>
                <span>
                  <span className="block text-xs font-bold text-ink">Store pickup</span>
                  <span className="mt-0.5 block text-[10px] leading-4 text-muted">Free · Usually ready same day</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => setFulfillment('delivery')}
                className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition ${fulfillment === 'delivery' ? 'border-primary bg-primary-soft' : 'bg-surface-2 hover:border-primary/50'}`}
                aria-pressed={fulfillment === 'delivery'}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${fulfillment === 'delivery' ? 'bg-primary text-white' : 'bg-surface text-primary'}`}><Truck size={15} /></span>
                <span>
                  <span className="block text-xs font-bold text-ink">Local delivery</span>
                  <span className="mt-0.5 block text-[10px] leading-4 text-muted">Balanga & nearby · {subtotal >= FREE_SHIPPING ? 'Free over ₱15,000' : '₱150'}</span>
                </span>
              </button>
            </div>

            {fulfillment === 'pickup' ? (
              <div className="mt-3 flex items-center gap-3 rounded-xl border bg-surface-2 p-3.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary"><MapPin size={17} /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-ink">{branch?.name || 'Select a pickup branch'}</p>
                  <p className="mt-0.5 text-[10px] text-muted">{branch?.address || 'Choose the branch nearest you'}</p>
                </div>
                <button type="button" onClick={() => setBranchModalOpen(true)} className="shrink-0 text-[10px] font-bold text-primary hover:underline">Change</button>
              </div>
            ) : (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Delivery address</label>
                  <input id="address" required value={form.address} onChange={(event) => setField('address', event.target.value)} className="input" placeholder="House / street / barangay" autoComplete="street-address" />
                </div>
                <div>
                  <label htmlFor="city" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">City / municipality</label>
                  <input id="city" required value={form.city} onChange={(event) => setField('city', event.target.value)} className="input" autoComplete="address-level2" />
                </div>
                <div>
                  <label htmlFor="province" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Province</label>
                  <input id="province" value="Bataan" readOnly className="input text-muted" />
                </div>
              </div>
            )}

            <div className="mt-3">
              <label htmlFor="notes" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Order notes (optional)</label>
              <textarea id="notes" value={form.notes} onChange={(event) => setField('notes', event.target.value)} className="input min-h-[70px] py-2.5" placeholder="Landmark, preferred pickup time, or build instructions…" rows={3} />
            </div>
          </section>

          <section className="card p-5">
            <h2 className="font-display text-base font-bold text-ink">Payment method</h2>
            <div className="mt-3 space-y-2">
              {paymentOptions.map((option) => {
                const OptionIcon = option.icon;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPayment(option.id)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition ${payment === option.id ? 'border-primary bg-primary-soft' : 'bg-surface-2 hover:border-primary/50'}`}
                    aria-pressed={payment === option.id}
                  >
                    <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${payment === option.id ? 'bg-primary text-white' : 'bg-surface text-primary'}`}><OptionIcon size={16} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2 text-xs font-bold text-ink">
                        {option.label}
                        {payment === option.id && <Check size={14} className="shrink-0 text-primary" />}
                      </span>
                      <span className="mt-0.5 block text-[10px] leading-4 text-muted">{option.description}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {payment === 'credit' && <div className="mt-3"><InstallmentCalculator price={total} compact title="Estimate your Home Credit plan" /></div>}
            {payment === 'card' && (
              <p className="mt-3 flex items-start gap-2 rounded-lg bg-surface-2 p-3 text-[10px] leading-4 text-muted">
                <CreditCard size={13} className="mt-0.5 shrink-0 text-primary" />
                This prototype does not collect card details. Payment is completed securely at the TNC branch terminal.
              </p>
            )}
          </section>

          <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border bg-surface p-4">
            <input type="checkbox" checked={agree} onChange={(event) => setAgree(event.target.checked)} className="mt-0.5 h-4 w-4 accent-[var(--primary)]" required />
            <span className="text-[11px] leading-5 text-muted">
              I agree to the <Link to="/terms" className="font-semibold text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="font-semibold text-primary hover:underline">Privacy Policy</Link>. I understand this is a reservation and final stock/installment terms are confirmed by TNC Tech Hub.
            </span>
          </label>

          <Button type="submit" size="lg" className="w-full lg:hidden">
            Place order · {formatPeso(total)}
          </Button>
        </div>

        <aside className="lg:sticky lg:top-[128px] lg:self-start">
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-ink">Order summary</h2>
              <span className="text-[10px] text-muted">{cartCount} item{cartCount === 1 ? '' : 's'}</span>
            </div>
            <ul className="mt-3 max-h-[260px] space-y-2.5 overflow-y-auto pr-1">
              {cartItems.map(({ product, qty, lineTotal }) => (
                <li key={product.id} className="flex items-center gap-2.5">
                  <div className="w-11 shrink-0 overflow-hidden rounded-lg">
                    <ProductVisual product={product} className="aspect-square" showMeta={false} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-[10px] font-semibold text-ink">{product.name}</p>
                    <p className="text-[9px] text-muted">Qty {qty}</p>
                  </div>
                  <span className="text-[10px] font-bold text-ink">{formatPeso(lineTotal)}</span>
                </li>
              ))}
            </ul>
            <div className="my-4 h-px bg-line" />
            <div className="space-y-2 text-xs">
              <div className="flex justify-between gap-3 text-muted"><span>Subtotal</span><span className="font-semibold text-ink">{formatPeso(subtotal)}</span></div>
              <div className="flex justify-between gap-3 text-muted">
                <span>{fulfillment === 'pickup' ? 'Pickup' : 'Delivery'}</span>
                <span className={shipping === 0 ? 'font-semibold text-success' : 'font-semibold text-ink'}>{shipping === 0 ? 'Free' : formatPeso(shipping)}</span>
              </div>
            </div>
            <div className="my-4 h-px bg-line" />
            <div className="flex items-end justify-between">
              <span className="text-xs text-muted">Total</span>
              <span className="font-display text-2xl font-bold text-ink">{formatPeso(total)}</span>
            </div>
            <Button type="submit" size="lg" className="mt-4 hidden w-full lg:flex">
              Place order <ArrowRight size={16} />
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[9px] text-muted">
              <ShieldCheck size={12} className="text-success" /> No payment collected online in this prototype
            </p>
          </div>
          <div className="mt-3 rounded-xl border bg-surface p-3 text-[10px] leading-5 text-muted">
            <strong className="text-ink">Need help?</strong> Call (047) 220-0000 or message us. Our Balanga team can hold stock for 24 hours.
          </div>
        </aside>
      </form>
    </div>
  );
}
