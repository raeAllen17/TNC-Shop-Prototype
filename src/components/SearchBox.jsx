import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Clock3, Flame, Search, Tag, X } from 'lucide-react';
import { brandsWithCounts, categories, products } from '../data/products';
import { formatPeso, slugify } from '../lib/format';
import Icon from './Icon';

const recentSearches = ['RTX 5060', 'Ryzen 5 5600', '144Hz monitor'];

export default function SearchBox({ large = false, autoFocus = false, onNavigate }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (autoFocus) window.setTimeout(() => inputRef.current?.focus(), 60);
  }, [autoFocus]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const matchedProducts = products
      .filter((product) => `${product.name} ${product.brand} ${product.category}`.toLowerCase().includes(q))
      .slice(0, 6);
    const matchedCategories = categories
      .filter((category) => `${category.name} ${category.blurb}`.toLowerCase().includes(q))
      .slice(0, 3);
    const matchedBrands = brandsWithCounts
      .filter((brand) => brand.name.toLowerCase().includes(q))
      .slice(0, 3);
    return [
      ...matchedProducts.map((product) => ({
        key: `product-${product.id}`,
        type: 'Product',
        label: product.name,
        sub: `${product.brand} · ${formatPeso(product.price)}`,
        to: `/product/${product.id}`,
        icon: 'Package',
      })),
      ...matchedCategories.map((category) => ({
        key: `category-${category.id}`,
        type: 'Category',
        label: category.name,
        sub: category.blurb,
        to: `/shop?category=${category.id}`,
        icon: category.icon,
      })),
      ...matchedBrands.map((brand) => ({
        key: `brand-${brand.name}`,
        type: 'Brand',
        label: brand.name,
        sub: `${brand.count} products`,
        to: `/brand/${slugify(brand.name)}`,
        icon: 'Tag',
      })),
    ];
  }, [query]);

  const go = (to) => {
    setOpen(false);
    setQuery('');
    onNavigate?.();
    navigate(to);
  };

  const submit = (event) => {
    event.preventDefault();
    if (active >= 0 && results[active]) {
      go(results[active].to);
      return;
    }
    if (!query.trim()) return;
    setOpen(false);
    onNavigate?.();
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    setQuery('');
  };

  const handleKey = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setActive((current) => Math.min(current + 1, results.length - 1));
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((current) => Math.max(current - 1, -1));
    }
    if (event.key === 'Escape') {
      setOpen(false);
      setActive(-1);
    }
  };

  const showPanel = open && (query.trim().length > 0 || !large);

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={submit} role="search" className="relative">
        <Search size={large ? 20 : 17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          placeholder={large ? 'Search laptops, graphics cards, brands…' : 'Search products, brands, categories…'}
          className={`input pl-10 pr-24 ${large ? 'min-h-[54px] text-base' : 'min-h-[42px] bg-surface-2/80'}`}
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          aria-label="Search products"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setActive(-1); inputRef.current?.focus(); }}
            className="absolute right-[86px] top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:text-ink"
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
        <button
          type="submit"
          className={`absolute right-1.5 top-1/2 flex -translate-y-1/2 items-center justify-center gap-1.5 rounded-lg bg-primary font-bold text-white transition hover:bg-primary-hover ${large ? 'h-[42px] px-4 text-xs' : 'h-[32px] px-3 text-[11px]'}`}
        >
          <span className="hidden sm:inline">Search</span>
          <ArrowRight size={13} className="sm:hidden" />
        </button>
      </form>

      {showPanel && (
        <div
          id="search-suggestions"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-[75] overflow-hidden rounded-xl border bg-surface shadow-float"
        >
          {!query.trim() ? (
            <div className="p-3">
              <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Popular right now</p>
              <div className="space-y-0.5">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => go(`/shop?q=${encodeURIComponent(term)}`)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-xs font-medium text-muted transition hover:bg-surface-2 hover:text-ink"
                  >
                    <Clock3 size={14} /> {term}
                  </button>
                ))}
              </div>
              <div className="mt-2 border-t pt-2">
                <p className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Trending categories</p>
                <div className="flex flex-wrap gap-1.5 p-1">
                  {categories.slice(0, 4).map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => go(`/shop?category=${category.id}`)}
                      className="chip border-line bg-surface-2 text-muted hover:border-primary hover:text-primary"
                    >
                      <Icon name={category.icon} size={12} /> {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length ? (
            <div className="max-h-[360px] overflow-y-auto p-2">
              {results.map((result, index) => (
                <button
                  key={result.key}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onClick={() => go(result.to)}
                  className={`flex w-full items-center gap-3 rounded-lg p-2.5 text-left transition ${active === index ? 'bg-surface-2' : ''}`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-surface-2 text-primary">
                    {result.type === 'Product' ? (
                      result.label.toLowerCase().includes('rtx') || result.label.toLowerCase().includes('radeon') ? <Flame size={16} /> : <Tag size={16} />
                    ) : (
                      <Icon name={result.icon} size={16} />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-semibold text-ink">{result.label}</span>
                    <span className="block truncate text-[10px] text-muted">{result.sub}</span>
                  </span>
                  <span className="shrink-0 text-[9px] font-bold uppercase tracking-wide text-muted">{result.type}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => go(`/shop?q=${encodeURIComponent(query.trim())}`)}
                className="mt-1 flex w-full items-center justify-between rounded-lg border border-dashed border-line px-3 py-2.5 text-xs font-semibold text-primary transition hover:bg-primary-soft"
              >
                View all results for “{query.trim()}”
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm font-semibold text-ink">No quick matches for “{query.trim()}”</p>
              <button
                type="button"
                onClick={() => go(`/shop?q=${encodeURIComponent(query.trim())}`)}
                className="mt-2 text-xs font-semibold text-primary hover:underline"
              >
                Search the full catalogue
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
