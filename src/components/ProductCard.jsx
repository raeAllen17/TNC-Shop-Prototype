import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Heart, Plus, ShoppingBag } from 'lucide-react';
import ProductVisual from './ProductVisual';
import { Badge, Price, StarRating } from './ui/primitives';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product, compact = false, index = 0 }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [added, setAdded] = useState(false);
  const timer = useRef(null);
  const wished = wishlist.includes(product.id);
  const inStock = product.stock === 'in';

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleAdd = () => {
    addToCart(product.id);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className={`group card card-hover relative flex h-full flex-col overflow-hidden ${compact ? 'p-2.5' : 'p-3'}`}>
      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        aria-pressed={wished}
        className={`absolute right-5 top-5 z-20 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-md transition ${
          wished
            ? 'border-primary bg-primary text-white'
            : 'border-white/15 bg-black/35 text-white/70 hover:border-primary hover:text-primary'
        }`}
      >
        <Heart size={14} className={wished ? 'fill-current' : ''} />
      </button>

      <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-xl" aria-label={`View ${product.name}`}>
        <ProductVisual product={product} variant={index} className="aspect-[4/3] w-full" />
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">{product.brand}</span>
          {product.deal ? (
            <Badge variant="primary" className="!px-2 !py-0.5 !text-[9px]">Deal</Badge>
          ) : (
            <Badge variant={inStock ? 'success' : 'warning'} dot className="!px-2 !py-0.5 !text-[9px]">
              {inStock ? 'In Stock' : 'Order Basis'}
            </Badge>
          )}
        </div>
        <Link to={`/product/${product.id}`} className="mb-2 block">
          <h3 className="line-clamp-2 min-h-[38px] text-[13px] font-semibold leading-[19px] text-ink transition group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <StarRating rating={product.rating} reviews={product.reviews} className="mb-2.5" />
        <div className="mt-auto">
          <Price value={product.price} oldValue={product.oldPrice} size="sm" className="mb-2.5" />
          <button
            type="button"
            onClick={handleAdd}
            className={`flex min-h-[38px] w-full items-center justify-center gap-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
              added ? 'bg-success text-[#07130c]' : 'bg-surface-2 text-ink hover:bg-primary hover:text-white'
            }`}
            aria-live="polite"
          >
            {added ? (
              <>
                <Check size={14} strokeWidth={2.6} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={13} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductCardList({ product, index = 0 }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const inStock = product.stock === 'in';
  return (
    <article className="card card-hover group grid gap-4 p-3 sm:grid-cols-[180px_1fr]">
      <Link to={`/product/${product.id}`} className="overflow-hidden rounded-xl" aria-label={`View ${product.name}`}>
        <ProductVisual product={product} variant={index} className="aspect-[4/3] h-full w-full" />
      </Link>
      <div className="flex flex-col p-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted">{product.brand}</p>
            <Link to={`/product/${product.id}`}>
              <h3 className="font-display text-base font-bold leading-snug text-ink transition group-hover:text-primary">{product.name}</h3>
            </Link>
          </div>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
              wished ? 'border-primary bg-primary text-white' : 'border-line text-muted hover:border-primary hover:text-primary'
            }`}
          >
            <Heart size={15} className={wished ? 'fill-current' : ''} />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <StarRating rating={product.rating} reviews={product.reviews} />
          <Badge variant={inStock ? 'success' : 'warning'} dot>{inStock ? 'In Stock' : 'Order Basis'}</Badge>
        </div>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted">
          {product.specs.slice(0, 3).map(([key, value]) => `${key}: ${value}`).join(' · ')}
        </p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <Price value={product.price} oldValue={product.oldPrice} size="md" />
          <div className="flex items-center gap-2">
            <Link to={`/product/${product.id}`} className="btn btn-secondary !min-h-[38px] !px-3 !text-xs">View details</Link>
            <button type="button" onClick={() => addToCart(product.id)} className="btn btn-primary !min-h-[38px] !px-3 !text-xs">
              <Plus size={14} /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
