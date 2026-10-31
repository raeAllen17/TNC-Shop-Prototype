import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ChevronRight, PackageSearch, ShieldCheck, SlidersHorizontal, Tag } from 'lucide-react';
import ProductCard, { ProductCardList } from '../components/ProductCard';
import Button from '../components/ui/Button';
import { Badge, EmptyState } from '../components/ui/primitives';
import { brandsWithCounts, categories, products } from '../data/products';
import { slugify } from '../lib/format';

const sortOptions = [
  ['featured', 'Featured'],
  ['price-asc', 'Price: low to high'],
  ['price-desc', 'Price: high to low'],
  ['rating', 'Top rated'],
];

export default function BrandPage() {
  const { slug } = useParams();
  const brand = brandsWithCounts.find((item) => slugify(item.name) === slug);
  const [sort, setSort] = useState('featured');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [view, setView] = useState('grid');

  const brandProducts = useMemo(() => {
    if (!brand) return [];
    let list = products.filter((product) => product.brand === brand.name);
    if (categoryFilter !== 'all') list = list.filter((product) => product.category === categoryFilter);
    switch (sort) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating);
      default: return [...list].sort((a, b) => Number(b.deal) - Number(a.deal) || b.rating - a.rating);
    }
  }, [brand, categoryFilter, sort]);

  if (!brand) {
    return (
      <div className="container-page py-16 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary"><PackageSearch size={26} /></span>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">Brand not found</h1>
        <p className="mt-2 text-sm text-muted">That brand may not be in the current catalogue.</p>
        <Button to="/brands" className="mt-5">Browse all brands</Button>
      </div>
    );
  }

  const brandCategories = [...new Set(products.filter((product) => product.brand === brand.name).map((product) => product.category))];
  const otherBrands = brandsWithCounts.filter((item) => item.name !== brand.name).slice(0, 6);

  return (
    <>
      <div className="border-b bg-surface/30">
        <div className="container-page py-5 sm:py-7">
          <nav className="mb-3 flex flex-wrap items-center gap-1 text-[10px] text-muted" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary">Home</Link><ChevronRight size={10} />
            <Link to="/brands" className="hover:text-primary">Brands</Link><ChevronRight size={10} />
            <span className="font-semibold text-ink">{brand.name}</span>
          </nav>
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary-soft font-display text-2xl font-bold text-primary">{brand.name[0]}</span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{brand.name}</h1>
                <Badge variant="success"><ShieldCheck size={10} /> Authorised retailer</Badge>
              </div>
              <p className="mt-1 text-xs text-muted">{brand.count} products · Local warranty support · Pickup in Bataan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-6 sm:py-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap gap-1.5">
            <button type="button" onClick={() => setCategoryFilter('all')} className={`chip ${categoryFilter === 'all' ? 'border-primary bg-primary text-white' : 'bg-surface text-muted hover:border-primary/40'}`}>All</button>
            {brandCategories.map((categoryId) => {
              const category = categories.find((item) => item.id === categoryId);
              return (
                <button key={categoryId} type="button" onClick={() => setCategoryFilter(categoryId)} className={`chip ${categoryFilter === categoryId ? 'border-primary bg-primary text-white' : 'bg-surface text-muted hover:border-primary/40'}`}>
                  {category?.name || categoryId}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal size={13} className="text-muted" />
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="input !min-h-[34px] !w-auto !px-2 !text-[10px]" aria-label="Sort brand products">
              {sortOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <button type="button" onClick={() => setView((current) => (current === 'grid' ? 'list' : 'grid'))} className="rounded-lg border bg-surface px-2.5 py-2 text-[10px] font-semibold text-muted hover:text-ink">
              {view === 'grid' ? 'List' : 'Grid'}
            </button>
          </div>
        </div>

        {brandProducts.length === 0 ? (
          <EmptyState icon={Tag} title="No products in this view" description="Try another category filter." action={<Button onClick={() => setCategoryFilter('all')}>Show all {brand.name} products</Button>} />
        ) : (
          <div className={`grid gap-3 ${view === 'grid' ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {brandProducts.map((product, index) => (
              view === 'grid'
                ? <ProductCard key={product.id} product={product} index={index} compact />
                : <ProductCardList key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-xl border bg-surface p-4 sm:flex-row sm:items-center">
          <p className="text-[11px] text-muted"><strong className="text-ink">Need a specific {brand.name} model?</strong> We can check distributor stock and special-order it.</p>
          <Button to={`/contact?topic=product`} size="sm" variant="secondary">Ask availability <ArrowRight size={13} /></Button>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-ink">Other brands</h2>
            <Link to="/brands" className="text-[10px] font-bold text-primary hover:underline">All brands →</Link>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {otherBrands.map((item) => (
              <Link key={item.name} to={`/brand/${slugify(item.name)}`} className="chip bg-surface text-muted hover:border-primary hover:text-primary">{item.name} <span className="text-[9px] opacity-60">{item.count}</span></Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
