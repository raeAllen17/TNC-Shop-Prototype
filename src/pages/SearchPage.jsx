import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search, SlidersHorizontal, Sparkles, TrendingUp, X } from 'lucide-react';
import SearchBox from '../components/SearchBox';
import ProductCard from '../components/ProductCard';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import { EmptyState } from '../components/ui/primitives';
import { brandsWithCounts, categories, products } from '../data/products';
import { slugify } from '../lib/format';

const suggestions = ['RTX 5060', 'Ryzen 5', 'gaming laptop', 'mechanical keyboard', '24 inch monitor', '1TB NVMe', 'Wi-Fi 6 router'];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get('q') || '').trim();
  const q = query.toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return products.filter((product) =>
      `${product.name} ${product.brand} ${product.category} ${product.sub} ${product.specs.flat().join(' ')}`.toLowerCase().includes(q),
    );
  }, [q]);

  const matchedBrands = q ? brandsWithCounts.filter((brand) => brand.name.toLowerCase().includes(q)).slice(0, 6) : [];
  const matchedCategories = q ? categories.filter((category) => `${category.name} ${category.blurb}`.toLowerCase().includes(q)).slice(0, 4) : [];

  const clear = () => setSearchParams({});

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-2">Search the catalogue</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Find exactly what you need.</h1>
        <div className="mx-auto mt-5 max-w-xl text-left">
          <SearchBox large autoFocus />
        </div>
        {!query && (
          <div className="mx-auto mt-4 flex max-w-xl flex-wrap justify-center gap-1.5">
            {suggestions.map((term) => (
              <button key={term} type="button" onClick={() => setSearchParams({ q: term })} className="chip border-line bg-surface text-muted hover:border-primary hover:text-primary">{term}</button>
            ))}
          </div>
        )}
      </div>

      {!query ? (
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" />
            <h2 className="font-display text-xl font-bold text-ink">Popular categories</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {categories.slice(0, 4).map((category) => (
              <Link key={category.id} to={`/shop?category=${category.id}`} className="group card flex items-center gap-3 p-3 transition hover:border-primary/40">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary"><Icon name={category.icon} size={16} /></span>
                <div>
                  <p className="text-xs font-bold text-ink group-hover:text-primary">{category.name}</p>
                  <p className="text-[9px] text-muted">{category.subs.length} subcategories</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-primary/20 bg-primary-soft p-4">
            <p className="flex items-center gap-2 text-xs font-bold text-ink"><Sparkles size={14} className="text-primary" /> Tip: search by part number or spec.</p>
            <p className="mt-1 text-[11px] leading-5 text-muted">Try “B550”, “144Hz”, “AM5” or “DDR5”. You can also refine any result by brand, price and stock in the shop.</p>
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
            <div>
              <h2 className="font-display text-xl font-bold text-ink">
                {results.length} result{results.length === 1 ? '' : 's'} for <span className="text-primary">“{query}”</span>
              </h2>
              {(matchedBrands.length > 0 || matchedCategories.length > 0) && (
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  {matchedCategories.map((category) => (
                    <Link key={category.id} to={`/shop?category=${category.id}`} className="chip border-primary/25 bg-primary-soft text-primary">{category.name}</Link>
                  ))}
                  {matchedBrands.map((brand) => (
                    <Link key={brand.name} to={`/brand/${slugify(brand.name)}`} className="chip border-line bg-surface text-muted hover:border-primary hover:text-primary">{brand.name}</Link>
                  ))}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={clear} className="chip border-line bg-surface text-muted hover:border-primary hover:text-primary"><X size={11} /> Clear</button>
              <Button to={`/shop?q=${encodeURIComponent(query)}`} size="sm" variant="secondary"><SlidersHorizontal size={13} /> Refine in shop</Button>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
              {results.map((product, index) => <ProductCard key={product.id} product={product} index={index} compact />)}
            </div>
          ) : (
            <div className="mt-6">
              <EmptyState
                icon={Search}
                title="No exact matches"
                description="Try a shorter term, a brand name, or browse the full shop with filters."
                action={<Button to="/shop">Browse all products</Button>}
              />
              <div className="mx-auto mt-5 max-w-2xl">
                <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-wide text-muted">Try one of these</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {suggestions.map((term) => (
                    <button key={term} type="button" onClick={() => setSearchParams({ q: term })} className="chip border-line bg-surface text-muted hover:border-primary hover:text-primary">{term}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col items-start justify-between gap-3 rounded-xl border bg-surface p-4 sm:flex-row sm:items-center">
            <p className="text-[11px] text-muted"><strong className="text-ink">Can&apos;t find it?</strong> We may be able to order it from our distributors.</p>
            <Link to="/contact?topic=product" className="flex items-center gap-1 text-[11px] font-bold text-primary hover:underline">Ask our team <ArrowRight size={13} /></Link>
          </div>
        </div>
      )}
    </div>
  );
}
