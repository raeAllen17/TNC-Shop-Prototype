import { Link } from 'react-router-dom';
import { ArrowRight, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { EmptyState } from '../components/ui/primitives';
import Button from '../components/ui/Button';
import { products } from '../data/products';

const popularIds = [
  'amd-ryzen-5-5600',
  'gigabyte-rtx-5060-eagle-oc-8gb',
  'nvision-24-144hz-gaming-monitor',
  'redragon-k611-rgb-mechanical-keyboard',
];
const popularProducts = popularIds.map((id) => products.find((product) => product.id === id)).filter(Boolean);

export default function WishlistPage() {
  const { wishlistProducts, addManyToCart, showToast } = useStore();

  const addAll = () => {
    addManyToCart(wishlistProducts.map((product) => product.id));
  };

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow mb-1.5">Saved for later</p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Your wishlist <span className="text-muted">({wishlistProducts.length})</span>
          </h1>
          <p className="mt-1 text-xs text-muted">Saved on this device — no account required.</p>
        </div>
        {wishlistProducts.length > 0 && (
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => showToast('Wishlist sharing is coming soon.', 'info')}>
              <Trash2 size={13} /> Share list
            </Button>
            <Button size="sm" onClick={addAll}><ShoppingBag size={13} /> Add all to cart</Button>
          </div>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <>
          <EmptyState
            icon={Heart}
            title="No favourites yet"
            description="Tap the heart on any product to save it here. Your wishlist stays on this device."
            action={<Button to="/shop">Discover products</Button>}
          />
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink">Popular right now</h2>
              <Link to="/deals" className="text-xs font-bold text-primary hover:underline">See deals →</Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {popularProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} compact />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {wishlistProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} compact />
          ))}
        </div>
      )}

      {wishlistProducts.length > 0 && (
        <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-xl border bg-surface p-4 sm:flex-row">
          <p className="flex items-center gap-2 text-xs text-muted">
            <Heart size={14} className="text-primary" /> Prices and stock can change. Add to cart to reserve current stock.
          </p>
          <Link to="/shop" className="flex items-center gap-1 text-xs font-bold text-primary hover:underline">
            Keep browsing <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  );
}
