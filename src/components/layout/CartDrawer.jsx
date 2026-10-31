import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ShieldCheck, ShoppingBag, Trash2, Truck } from 'lucide-react';
import { Drawer } from '../ui/Overlays';
import { useStore } from '../../context/StoreContext';
import { formatPeso } from '../../lib/format';
import ProductVisual from '../ProductVisual';
import QuantityStepper from '../ui/QuantityStepper';

const FREE_SHIPPING = 15000;

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, subtotal, cartCount, updateQty, removeFromCart, branch } = useStore();
  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  return (
    <Drawer
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      title={`Your cart${cartCount ? ` (${cartCount})` : ''}`}
      footer={
        cartItems.length > 0 ? (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted">Subtotal</span>
              <span className="font-display text-xl font-bold text-ink">{formatPeso(subtotal)}</span>
            </div>
            <p className="mb-3 text-[10px] leading-4 text-muted">Shipping and installment terms are confirmed at checkout or in-store.</p>
            <Link to="/checkout" onClick={() => setCartOpen(false)} className="btn-primary w-full">
              Checkout <ArrowRight size={16} />
            </Link>
            <Link
              to="/cart"
              onClick={() => setCartOpen(false)}
              className="mt-2 flex w-full items-center justify-center py-2 text-xs font-semibold text-muted transition hover:text-ink"
            >
              View full cart
            </Link>
          </div>
        ) : null
      }
    >
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <ShoppingBag size={28} strokeWidth={1.6} />
          </span>
          <h3 className="font-display text-lg font-bold text-ink">Your cart is empty</h3>
          <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
            Your next upgrade starts here. Browse components, laptops and gaming PCs.
          </p>
          <Link to="/shop" onClick={() => setCartOpen(false)} className="btn-primary mt-5">
            Start shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="border-b bg-surface-2/50 px-5 py-3">
            <div className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold text-muted">
              <Truck size={13} className="text-primary" />
              {remaining > 0 ? (
                <span>Add <strong className="text-ink">{formatPeso(remaining)}</strong> for free local delivery</span>
              ) : (
                <span className="text-success">You unlocked free local delivery</span>
              )}
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <ul className="divide-y">
            {cartItems.map(({ product, qty, lineTotal }) => (
              <li key={product.id} className="flex gap-3 p-4">
                <Link to={`/product/${product.id}`} onClick={() => setCartOpen(false)} className="w-[76px] shrink-0 overflow-hidden rounded-lg">
                  <ProductVisual product={product} className="aspect-square w-full" showMeta={false} />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-muted">{product.brand}</p>
                      <Link
                        to={`/product/${product.id}`}
                        onClick={() => setCartOpen(false)}
                        className="mt-0.5 line-clamp-2 text-xs font-semibold leading-5 text-ink hover:text-primary"
                      >
                        {product.name}
                      </Link>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="shrink-0 rounded-md p-1 text-muted transition hover:bg-red-500/10 hover:text-red-400"
                      aria-label={`Remove ${product.name}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <QuantityStepper value={qty} onChange={(next) => updateQty(product.id, next)} />
                    <span className="text-sm font-bold text-ink">{formatPeso(lineTotal)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-2 px-5 py-4 text-[10px] text-muted">
            {branch && (
              <p className="flex items-center gap-1.5">
                <MapPin size={12} className="text-primary" /> Pickup at {branch.name}
              </p>
            )}
            <p className="flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-success" /> Genuine products · Local warranty support
            </p>
          </div>
        </div>
      )}
    </Drawer>
  );
}
