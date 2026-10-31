import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRight, BadgeCheck, Check, ChevronRight, Heart, MapPin, Maximize2,
  Rotate3D, ShieldCheck, ShoppingBag, Sparkles, Truck, Wrench,
} from 'lucide-react';
import ProductVisual from '../components/ProductVisual';
import ProductCard from '../components/ProductCard';
import InstallmentCalculator from '../components/InstallmentCalculator';
import QuantityStepper from '../components/ui/QuantityStepper';
import { Badge, EmptyState, Price, SectionHeading, StarRating } from '../components/ui/primitives';
import { Modal } from '../components/ui/Overlays';
import Button from '../components/ui/Button';
import { getCategory, getProduct, getSubcategory, products } from '../data/products';
import { formatPeso, getProductStock, slugify } from '../lib/format';
import { useStore } from '../context/StoreContext';

const warrantyCopy = {
  components: '3-year manufacturer warranty · Local RMA support',
  computers: '2-year parts & labor warranty · Free first-year checkup',
  peripherals: '1-year replacement warranty · In-store testing',
  networking: '3-year manufacturer warranty',
  accessories: '1-year warranty · In-store support',
  gadgets: '1–2 year manufacturer warranty',
};

function getCompatible(product) {
  if (product.sub === 'cpu') {
    const boards = products.filter((p) => p.sub === 'motherboard' && p.socket === product.socket).slice(0, 4);
    if (boards.length) return { label: `Motherboards for ${product.socket}`, items: boards };
  }
  if (product.sub === 'motherboard') {
    const cpus = products.filter((p) => p.sub === 'cpu' && p.socket === product.socket).slice(0, 4);
    if (cpus.length) return { label: `CPUs for ${product.socket}`, items: cpus };
  }
  if (product.sub === 'memory') {
    const boards = products.filter((p) => p.sub === 'motherboard' && p.specs.flat().join(' ').includes(product.memoryType || 'DDR')).slice(0, 4);
    if (boards.length) return { label: `Boards that support ${product.memoryType}`, items: boards };
  }
  if (product.sub === 'gpu') {
    const psus = products.filter((p) => p.sub === 'psu' && p.wattage >= (product.wattage || 150) + 150).sort((a, b) => a.price - b.price).slice(0, 4);
    if (psus.length) return { label: 'Power supplies with headroom', items: psus };
  }
  if (product.sub === 'case') {
    const coolers = products.filter((p) => p.sub === 'cooler').slice(0, 4);
    return { label: 'Coolers that fit your build', items: coolers };
  }
  if (product.sub === 'gaming-pc' || product.sub === 'office-pc' || product.sub === 'workstation') {
    const monitors = products.filter((p) => p.sub === 'monitor').slice(0, 4);
    return { label: 'Monitors to complete the setup', items: monitors };
  }
  return { label: 'Builds well with', items: products.filter((p) => p.sub !== product.sub && p.sub !== product.sub).slice(0, 4) };
}

export default function ProductPage() {
  const { id } = useParams();
  const product = getProduct(id);
  const { addToCart, wishlist, toggleWishlist, branch, setBranchModalOpen, setCartOpen } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    setQuantity(1);
    setVariant(0);
    setZoomOpen(false);
    setAdded(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  useEffect(() => {
    if (product) document.title = `${product.name} — TNC Tech Hub Balanga`;
    return () => { document.title = 'TNC Tech Hub Balanga — Build. Upgrade. Perform.'; };
  }, [product]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const compatible = useMemo(() => (product ? getCompatible(product) : { label: '', items: [] }), [product]);
  const related = useMemo(() => {
    if (!product) return [];
    const sameSub = products.filter((p) => p.id !== product.id && p.sub === product.sub);
    const sameCat = products.filter((p) => p.id !== product.id && p.category === product.category && p.sub !== product.sub);
    return [...sameSub, ...sameCat].slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Product not found"
          description="This product may have moved or sold out. Browse our latest catalogue to find something similar."
          action={<Button to="/shop">Back to shop</Button>}
        />
      </div>
    );
  }

  const category = getCategory(product.category);
  const subcategory = getSubcategory(product.category, product.sub);
  const wished = wishlist.includes(product.id);
  const stock = getProductStock(product, branch?.id);
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  const handleAdd = () => {
    addToCart(product.id, quantity);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1600);
  };

  const handleWishlist = () => toggleWishlist(product.id);

  return (
    <>
      <div className="container-page py-5 sm:py-7">
        <nav className="mb-4 flex flex-wrap items-center gap-1 text-[10px] text-muted" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <ChevronRight size={10} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-primary">{category?.name}</Link>
          <ChevronRight size={10} />
          <Link to={`/shop?category=${product.category}&sub=${product.sub}`} className="hover:text-primary">{subcategory?.name}</Link>
          <ChevronRight size={10} />
          <span className="max-w-[180px] truncate font-semibold text-ink">{product.name}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[1.02fr_.98fr] lg:gap-10">
          <div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="zoom-wrap group block w-full overflow-hidden rounded-2xl border bg-surface"
                aria-label="Enlarge product image"
              >
                <div className="zoom-img">
                  <ProductVisual product={product} variant={variant} className="aspect-square w-full sm:aspect-[4/3] lg:aspect-square" />
                </div>
                <span className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/45 px-2.5 py-1.5 text-[10px] font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <Maximize2 size={12} /> Click to zoom
                </span>
              </button>
              {product.deal && discount > 0 && (
                <span className="absolute left-3 top-3 z-20 rounded-lg bg-primary px-2.5 py-1.5 text-[10px] font-bold text-white shadow-lg">
                  Save {discount}%
                </span>
              )}
            </div>
            <div className="mt-2.5 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setVariant(item)}
                  className={`overflow-hidden rounded-xl border-2 transition ${variant === item ? 'border-primary shadow-glow' : 'border-transparent opacity-65 hover:opacity-100'}`}
                  aria-label={`View product image ${item + 1}`}
                  aria-pressed={variant === item}
                >
                  <ProductVisual product={product} variant={item} className="aspect-[4/3] w-full" showMeta={false} />
                </button>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border bg-surface px-3.5 py-2.5 text-[10px] text-muted">
              <span className="flex items-center gap-1.5"><Rotate3D size={13} className="text-primary" /> Generated product placeholder — real store photography drops in here.</span>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Link to={`/brand/${slugify(product.brand)}`} className="chip border-primary/25 bg-primary-soft text-primary">{product.brand}</Link>
              <Badge variant={stock.available ? 'success' : 'warning'} dot>
                {product.stock === 'order' ? 'Order Basis' : stock.label}
              </Badge>
              {product.deal && <Badge variant="primary"><Sparkles size={10} /> On deal</Badge>}
            </div>
            <h1 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">{product.name}</h1>
            <div className="mt-2.5 flex flex-wrap items-center gap-3">
              <StarRating rating={product.rating} reviews={product.reviews} />
              <span className="text-[10px] text-muted">{product.sold}+ sold</span>
              <span className="text-[10px] text-muted">SKU: TNC-{product.id.slice(0, 8).toUpperCase()}</span>
            </div>

            <div className="mt-5 rounded-2xl border bg-surface p-4">
              <Price value={product.price} oldValue={product.oldPrice} size="lg" />
              <p className="mt-1 text-[10px] text-muted">
                Or from <strong className="font-bold text-primary">{formatPeso(Math.round((product.price * 0.9) / 12))}</strong>/month with Home Credit · 12 months, 10% down
              </p>

              <div className="mt-4 flex items-start gap-2 rounded-lg bg-surface-2 px-3 py-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold text-ink">
                    {branch ? (
                      stock.branchAvailable ? `In stock at ${branch.name}` : `Order basis at ${branch.name}`
                    ) : (
                      'Select a branch to see exact stock'
                    )}
                  </p>
                  <p className="mt-0.5 text-[9px] text-muted">Reserve online · Pick up in-store · Free local delivery over ₱15,000</p>
                </div>
                <button type="button" onClick={() => setBranchModalOpen(true)} className="shrink-0 text-[10px] font-bold text-primary hover:underline">
                  Change
                </button>
              </div>

              <div className="mt-4">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Quantity</span>
                <div className="flex flex-wrap items-center gap-2.5">
                  <QuantityStepper value={quantity} onChange={setQuantity} max={10} />
                  <Button
                    onClick={handleAdd}
                    size="lg"
                    className={`min-w-[170px] flex-1 ${added ? '!bg-success !text-[#07130c]' : ''}`}
                  >
                    {added ? <><Check size={18} /> Added to cart</> : <><ShoppingBag size={17} /> Add to Cart</>}
                  </Button>
                  <button
                    type="button"
                    onClick={handleWishlist}
                    className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl border transition ${
                      wished ? 'border-primary bg-primary-soft text-primary' : 'bg-surface-2 text-muted hover:border-primary hover:text-primary'
                    }`}
                    aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                    aria-pressed={wished}
                  >
                    <Heart size={19} className={wished ? 'fill-current' : ''} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => { addToCart(product.id, quantity); setCartOpen(true); }}
                  className="mt-2 w-full rounded-lg py-2 text-center text-[10px] font-semibold text-muted transition hover:text-primary"
                >
                  Buy now — go straight to cart
                </button>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-3 text-center text-[9px] text-muted">
                <span className="flex flex-col items-center gap-1"><ShieldCheck size={14} className="text-success" /> Genuine item</span>
                <span className="flex flex-col items-center gap-1"><Wrench size={14} className="text-primary" /> Local warranty</span>
                <span className="flex flex-col items-center gap-1"><Truck size={14} className="text-primary" /> Fast pickup</span>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border bg-surface p-3.5">
                <p className="flex items-center gap-1.5 text-[10px] font-bold text-ink"><BadgeCheck size={13} className="text-success" /> {warrantyCopy[product.category] || 'Local warranty support'}</p>
                <p className="mt-1 text-[9px] leading-4 text-muted">Keep your receipt. Our Balanga team handles warranty coordination for you.</p>
              </div>
              <div className="rounded-xl border bg-surface p-3.5">
                <p className="flex items-center gap-1.5 text-[10px] font-bold text-ink"><Wrench size={13} className="text-primary" /> Need it installed?</p>
                <p className="mt-1 text-[9px] leading-4 text-muted">Add assembly or installation from ₱500 at checkout or in-store.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page pb-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="card p-5 sm:p-6">
              <h2 className="font-display text-lg font-bold text-ink">Overview</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-muted">
                <p>
                  The {product.name} is available at TNC Tech Hub Balanga with local warranty support and expert setup advice.
                  {' '}It is a strong fit for {product.category === 'computers' ? 'gaming, school and productivity workloads' : product.sub === 'gpu' ? 'high-refresh gaming builds' : product.sub === 'cpu' ? 'gaming and multitasking builds' : 'everyday setups and upgrades'}.
                </p>
                <p>
                  Buy online for pickup at {branch?.name || 'any TNC branch'}, or message our team for a compatibility check before ordering. Order-basis items are sourced within 2–5 business days.
                </p>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {product.specs.slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between gap-3 rounded-lg bg-surface-2 px-3 py-2 text-[11px]">
                    <span className="text-muted">{key}</span>
                    <span className="text-right font-semibold text-ink">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card mt-4 overflow-hidden">
              <div className="border-b px-5 py-4">
                <h2 className="font-display text-lg font-bold text-ink">Specifications</h2>
              </div>
              <table className="w-full text-left text-xs">
                <caption className="sr-only">Full product specifications</caption>
                <tbody className="divide-y">
                  {product.specs.map(([key, value]) => (
                    <tr key={key}>
                      <th scope="row" className="w-[42%] bg-surface-2/50 px-5 py-3 font-semibold text-muted">{key}</th>
                      <td className="px-5 py-3 font-medium text-ink">{value}</td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="row" className="bg-surface-2/50 px-5 py-3 font-semibold text-muted">Brand</th>
                    <td className="px-5 py-3 font-medium text-ink">{product.brand}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-surface-2/50 px-5 py-3 font-semibold text-muted">Category</th>
                    <td className="px-5 py-3 font-medium text-ink">{category?.name} / {subcategory?.name}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="bg-surface-2/50 px-5 py-3 font-semibold text-muted">Warranty</th>
                    <td className="px-5 py-3 font-medium text-ink">{warrantyCopy[product.category] || 'Local warranty support'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4 lg:sticky lg:top-[132px] lg:self-start">
            <InstallmentCalculator price={product.price} />
            <div className="card p-4">
              <p className="flex items-center gap-2 text-xs font-bold text-ink"><MapPin size={14} className="text-primary" /> Store availability</p>
              <p className="mt-2 text-[10px] leading-5 text-muted">
                {branch ? `${branch.address}. ${branch.hours}.` : 'Choose a branch from the header to see local availability.'}
              </p>
              <button type="button" onClick={() => setBranchModalOpen(true)} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border py-2 text-[10px] font-bold text-primary transition hover:bg-primary-soft">
                {branch ? 'Switch branch' : 'Choose a branch'} <ArrowRight size={11} />
              </button>
            </div>
          </div>
        </div>

        {compatible.items.length > 0 && (
          <section className="mt-10">
            <SectionHeading
              eyebrow="Compatibility"
              title={compatible.label}
              description="Checked against the specs of this product. Confirm with our build team for unusual configurations."
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {compatible.items.map((item, index) => <ProductCard key={item.id} product={item} index={index} compact />)}
            </div>
          </section>
        )}

        <section className="mt-10">
          <SectionHeading
            eyebrow="Keep exploring"
            title="Related products"
            action={<Link to={`/shop?category=${product.category}`} className="text-xs font-bold text-primary hover:underline">View category →</Link>}
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {related.map((item, index) => <ProductCard key={item.id} product={item} index={index} compact />)}
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-[calc(62px+env(safe-area-inset-bottom))] z-[61] border-t bg-surface/95 p-3 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 pl-1">
            <p className="text-[9px] font-bold uppercase tracking-wide text-muted">{product.stock === 'in' ? 'In stock' : 'Order basis'}</p>
            <p className="truncate font-display text-base font-bold text-ink">{formatPeso(product.price * quantity)}</p>
          </div>
          <button
            type="button"
            onClick={handleWishlist}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${wished ? 'border-primary bg-primary-soft text-primary' : 'text-muted'}`}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={17} className={wished ? 'fill-current' : ''} />
          </button>
          <button type="button" onClick={handleAdd} className={`btn-primary flex-1 !min-h-[42px] !text-xs ${added ? '!bg-success !text-[#07130c]' : ''}`}>
            {added ? <><Check size={15} /> Added</> : <><ShoppingBag size={15} /> Add to cart</>}
          </button>
        </div>
      </div>

      <Modal open={zoomOpen} onClose={() => setZoomOpen(false)} title={product.name} size="xl">
        <div className="overflow-hidden rounded-xl border">
          <ProductVisual product={product} variant={variant} className="aspect-[4/3] w-full" />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setVariant(item)}
              className={`overflow-hidden rounded-lg border-2 ${variant === item ? 'border-primary' : 'border-transparent opacity-60'}`}
              aria-label={`View enlarged image ${item + 1}`}
            >
              <ProductVisual product={product} variant={item} className="aspect-[4/3]" showMeta={false} />
            </button>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-muted">Placeholder visual. Final site swaps in real product photography with pinch-to-zoom.</p>
      </Modal>
    </>
  );
}
