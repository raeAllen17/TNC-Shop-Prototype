import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock3, Flame, Percent, ShieldCheck, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Button from '../components/ui/Button';
import { Badge, EmptyState } from '../components/ui/primitives';
import { categories, dealProducts } from '../data/products';
import { formatPeso } from '../lib/format';

function getRemaining(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function DealsPage() {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('discount');
  const [target] = useState(() => Date.now() + 2 * 86400000 + 8 * 3600000);
  const [remaining, setRemaining] = useState(() => getRemaining(target));

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const dealCategories = [...new Set(dealProducts.map((product) => product.category))];
  const totalSavings = dealProducts.reduce((sum, product) => sum + Math.max(0, (product.oldPrice || product.price) - product.price), 0);

  const visible = useMemo(() => {
    let list = category === 'all' ? [...dealProducts] : dealProducts.filter((product) => product.category === category);
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else {
      list.sort((a, b) => {
        const discountA = ((a.oldPrice || a.price) - a.price) / (a.oldPrice || a.price);
        const discountB = ((b.oldPrice || b.price) - b.price) / (b.oldPrice || b.price);
        return discountB - discountA;
      });
    }
    return list;
  }, [category, sort]);

  const countdown = [
    ['Days', remaining.days],
    ['Hours', remaining.hours],
    ['Mins', remaining.minutes],
    ['Secs', remaining.seconds],
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="hero-mesh absolute inset-0" aria-hidden="true" />
        <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-page relative py-8 sm:py-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="chip border-primary/30 bg-primary-soft text-primary"><Flame size={13} /> Limited-time local offers</span>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">This week&apos;s <span className="text-primary">hot deals.</span></h1>
              <p className="mt-3 max-w-lg text-sm leading-6 text-muted">Real price drops on parts and gear, available at TNC Tech Hub Balanga while stocks last. No fake countdowns — just a weekly refresh.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="primary"><Percent size={10} /> {dealProducts.length} live offers</Badge>
                <Badge variant="success"><Truck size={10} /> Free delivery over {formatPeso(15000)}</Badge>
              </div>
            </div>
            <div className="rounded-2xl border bg-surface/80 p-4 backdrop-blur">
              <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted"><Clock3 size={12} className="text-primary" /> Offers refresh in</p>
              <div className="flex gap-1.5">
                {countdown.map(([label, value]) => (
                  <div key={label} className="min-w-[52px] rounded-lg bg-surface-2 px-2 py-2 text-center">
                    <p className="font-display text-lg font-bold tabular-nums text-ink">{String(value).padStart(2, '0')}</p>
                    <p className="text-[8px] uppercase tracking-wide text-muted">{label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[9px] text-muted">Total savings this week: <strong className="text-success">{formatPeso(totalSavings)}</strong></p>
            </div>
          </div>
        </div>
      </section>

      <div className="container-page py-6 sm:py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap gap-1.5">
            <button type="button" onClick={() => setCategory('all')} className={`chip ${category === 'all' ? 'border-primary bg-primary text-white' : 'bg-surface text-muted hover:border-primary/40'}`}>All deals <span className="opacity-70">{dealProducts.length}</span></button>
            {dealCategories.map((categoryId) => {
              const item = categories.find((entry) => entry.id === categoryId);
              const count = dealProducts.filter((product) => product.category === categoryId).length;
              return (
                <button key={categoryId} type="button" onClick={() => setCategory(categoryId)} className={`chip ${category === categoryId ? 'border-primary bg-primary text-white' : 'bg-surface text-muted hover:border-primary/40'}`}>
                  {item?.name || categoryId} <span className="opacity-70">{count}</span>
                </button>
              );
            })}
          </div>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="input !min-h-[34px] !w-auto !px-2 !text-[10px]" aria-label="Sort deals">
            <option value="discount">Biggest discount</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>

        {visible.length === 0 ? (
          <EmptyState icon={Flame} title="No deals in this category" description="Try another category — offers rotate weekly." action={<Button onClick={() => setCategory('all')}>See all deals</Button>} />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {visible.map((product, index) => <ProductCard key={product.id} product={product} index={index} compact />)}
          </div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: 'Genuine with warranty', copy: 'Every deal includes the standard manufacturer warranty and local support.' },
            { icon: Truck, title: 'Pickup or delivery', copy: 'Reserve online, collect in Balanga, or ask about local delivery.' },
            { icon: Percent, title: 'Home Credit available', copy: 'Estimate a monthly plan on eligible items at checkout or in-store.' },
          ].map(({ icon: BenefitIcon, title, copy }) => (
            <div key={title} className="flex items-start gap-3 rounded-xl border bg-surface p-3.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary"><BenefitIcon size={15} /></span>
              <div>
                <p className="text-[11px] font-bold text-ink">{title}</p>
                <p className="mt-0.5 text-[10px] leading-4 text-muted">{copy}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border bg-surface p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-lg font-bold text-ink">Missed a deal?</h2>
            <p className="mt-1 text-[11px] text-muted">Join the newsletter or check the shop for current pricing. Stocks change daily.</p>
          </div>
          <div className="flex gap-2">
            <Button to="/shop" size="sm">Browse all products <ArrowRight size={13} /></Button>
            <Link to="/blog" className="btn btn-secondary !min-h-[34px] !text-[10px]">Build guides</Link>
          </div>
        </div>
      </div>
    </>
  );
}
