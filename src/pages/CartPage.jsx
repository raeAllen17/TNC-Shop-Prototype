import { Link } from 'react-router-dom';
import { ArrowRight, Heart, MapPin, ShieldCheck, ShoppingBag, Tag, Trash2, Truck } from 'lucide-react';
import ProductVisual from '../components/ProductVisual';
import QuantityStepper from '../components/ui/QuantityStepper';
import { EmptyState } from '../components/ui/primitives';
import Button from '../components/ui/Button';
import { useStore } from '../context/StoreContext';
import { formatPeso } from '../lib/format';

const FREE_SHIPPING = 15000;
const DELIVERY_FEE = 150;

export default function CartPage() {
  const {
    cartItems, subtotal, updateQty, removeFromCart, toggleWishlist, wishlist,
    branch, showToast, cartCount,
  } = useStore();

  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : DELIVERY_FEE;
  const total = subtotal + shipping;

  const applyCoupon = (event) => {
    event.preventDefault();
    showToast('Promo codes are coming soon. In-store offers are available today.', 'info');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container-page py-12 sm:py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          titleAs="h1"
          description="Browse the latest components, laptops and gaming PCs. Your picks will be saved on this device."
          action={<Button to="/shop">Start shopping</Button>}
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ['Shop components', '/shop?category=components'],
            ['Pre-built gaming PCs', '/shop?category=computers&sub=gaming-pc'],
            ['This week&apos;s deals', '/deals'],
          ].map(([label, to]) => (
            <Link key={label} to={to} className="card card-hover flex items-center justify-between p-4 text-xs font-semibold text-ink">
              {label.replace('&apos;', "'")} <ArrowRight size={14} className="text-primary" />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-6 sm:py-10">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow mb-1.5">Almost yours</p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Your cart <span className="text-muted">({cartCount})</span>
          </h1>
        </div>
        <Link to="/shop" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
          Continue shopping <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="card overflow-hidden">
            <div className="flex items-start gap-2 border-b bg-primary-soft/50 px-4 py-3 text-[11px] text-muted">
              <Truck size={14} className="mt-0.5 shrink-0 text-primary" />
              {remaining > 0 ? (
                <span>Add <strong className="text-ink">{formatPeso(remaining)}</strong> more for free local delivery within Balanga.</span>
              ) : (
                <span className="text-success">Free local delivery unlocked for this order.</span>
              )}
            </div>
            <ul className="divide-y">
              {cartItems.map(({ product, qty, lineTotal }) => {
                const wished = wishlist.includes(product.id);
                return (
                  <li key={product.id} className="grid gap-3 p-4 sm:grid-cols-[100px_1fr]">
                    <Link to={`/product/${product.id}`} className="w-24 overflow-hidden rounded-xl sm:w-full">
                      <ProductVisual product={product} className="aspect-square w-full" showMeta={false} />
                    </Link>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-muted">{product.brand}</p>
                          <Link to={`/product/${product.id}`} className="mt-0.5 line-clamp-2 text-sm font-bold text-ink transition hover:text-primary">
                            {product.name}
                          </Link>
                          <p className="mt-1 text-[10px] text-muted">
                            {product.stock === 'in' ? 'In stock' : 'Order basis · 2–5 business days'}
                          </p>
                        </div>
                        <p className="font-display text-base font-bold text-ink">{formatPeso(lineTotal)}</p>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <QuantityStepper value={qty} onChange={(next) => updateQty(product.id, next)} />
                          <span className="text-[10px] text-muted">× {formatPeso(product.price)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product.id)}
                            className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-semibold transition ${wished ? 'text-primary' : 'text-muted hover:text-ink'}`}
                          >
                            <Heart size={12} className={wished ? 'fill-current' : ''} /> {wished ? 'Saved' : 'Save'}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeFromCart(product.id)}
                            className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-semibold text-muted transition hover:bg-red-500/10 hover:text-red-400"
                          >
                            <Trash2 size={12} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-surface p-4">
            <div className="flex items-center gap-2 text-[11px] text-muted">
              <MapPin size={14} className="text-primary" />
              Pickup branch: <strong className="text-ink">{branch?.name || 'Choose at checkout'}</strong>
            </div>
            <Link to="/faq" className="text-[10px] font-semibold text-primary hover:underline">Pickup & shipping FAQ</Link>
          </div>

          <div className="mt-4 rounded-xl border border-dashed bg-surface p-4">
            <p className="flex items-center gap-2 text-xs font-bold text-ink"><Tag size={14} className="text-primary" /> Have a promo code?</p>
            <form onSubmit={applyCoupon} className="mt-2 flex gap-2">
              <label htmlFor="promo" className="sr-only">Promo code</label>
              <input id="promo" placeholder="Enter code" className="input !min-h-[38px] max-w-[220px] flex-1 !text-xs" />
              <Button type="submit" variant="secondary" size="sm">Apply</Button>
            </form>
          </div>
        </div>

        <aside className="lg:sticky lg:top-[128px] lg:self-start">
          <div className="card p-5">
            <h2 className="font-display text-lg font-bold text-ink">Order summary</h2>
            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex justify-between gap-3 text-muted"><span>Subtotal</span><span className="font-semibold text-ink">{formatPeso(subtotal)}</span></div>
              <div className="flex justify-between gap-3 text-muted">
                <span>Delivery estimate</span>
                <span className={shipping === 0 ? 'font-semibold text-success' : 'font-semibold text-ink'}>{shipping === 0 ? 'Free' : formatPeso(shipping)}</span>
              </div>
              <div className="flex justify-between gap-3 text-muted"><span>Pickup</span><span className="font-semibold text-ink">Free</span></div>
            </div>
            <div className="my-4 h-px bg-line" />
            <div className="flex items-end justify-between">
              <span className="text-xs text-muted">Total</span>
              <span className="font-display text-2xl font-bold text-ink">{formatPeso(total)}</span>
            </div>
            <p className="mt-1 text-right text-[9px] text-muted">Inclusive of local taxes</p>
            <Button to="/checkout" size="lg" className="mt-4 w-full">
              Proceed to checkout <ArrowRight size={16} />
            </Button>
            <div className="mt-4 space-y-2 text-[9px] text-muted">
              <p className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-success" /> Secure checkout · No card details stored</p>
              <p className="flex items-center gap-1.5"><Truck size={12} className="text-primary" /> Free local delivery over {formatPeso(FREE_SHIPPING)}</p>
              <p className="flex items-center gap-1.5"><MapPin size={12} className="text-primary" /> Reserve now, pay in-store options available</p>
            </div>
          </div>
          <p className="mt-3 rounded-xl border bg-surface-2/60 p-3 text-[10px] leading-5 text-muted">
            <strong className="text-ink">Guest checkout is available.</strong> No account needed. For Home Credit, your final approval happens in-store.
          </p>
        </aside>
      </div>
    </div>
  );
}
