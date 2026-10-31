import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ChevronRight, Filter, Grid2X2, LayoutList, RotateCcw, SearchX, SlidersHorizontal, X,
} from 'lucide-react';
import ProductCard, { ProductCardList } from '../components/ProductCard';
import { ProductCardSkeleton, Badge, EmptyState } from '../components/ui/primitives';
import { Drawer } from '../components/ui/Overlays';
import Pagination from '../components/ui/Pagination';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import { categories, getCategory, getSubcategory, products } from '../data/products';
import { formatPesoShort } from '../lib/format';

const PAGE_SIZE = 24;
const PRICE_MAX = 150000;

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'rating', label: 'Top rated' },
  { id: 'name', label: 'Name: A–Z' },
];

function FilterContent({
  allBrands, selectedBrands, toggleBrand, minPrice, maxPrice,
  updatePrice, availability, setAvailability, clearAll, clearBrands, activeCount,
}) {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const brandsToShow = showAllBrands ? allBrands : allBrands.slice(0, 8);

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Brand</h3>
          {selectedBrands.length > 0 && (
            <button type="button" onClick={clearBrands} className="text-[10px] font-semibold text-primary">
              Clear
            </button>
          )}
        </div>
        <div className="max-h-[230px] space-y-1 overflow-y-auto pr-1">
          {brandsToShow.map((brand) => {
            const checked = selectedBrands.includes(brand.name);
            return (
              <label key={brand.name} className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1.5 transition hover:bg-surface-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleBrand(brand.name)}
                  className="h-3.5 w-3.5 accent-[var(--primary)]"
                />
                <span className={`flex-1 text-[11px] ${checked ? 'font-semibold text-primary' : 'text-muted'}`}>{brand.name}</span>
                <span className="text-[9px] tabular-nums text-muted">{brand.count}</span>
              </label>
            );
          })}
        </div>
        {allBrands.length > 8 && (
          <button type="button" onClick={() => setShowAllBrands((value) => !value)} className="mt-2 text-[10px] font-semibold text-primary hover:underline">
            {showAllBrands ? 'Show fewer' : `Show all ${allBrands.length} brands`}
          </button>
        )}
      </div>

      <div className="h-px bg-line" />

      <div>
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Price range</h3>
        <div className="mb-3 flex items-center justify-between text-[10px] font-semibold text-muted">
          <span>{formatPesoShort(minPrice)}</span>
          <span>{formatPesoShort(maxPrice)}</span>
        </div>
        <div className="space-y-3">
          <div>
            <label htmlFor="price-min" className="mb-1 block text-[9px] font-semibold uppercase tracking-wide text-muted">Minimum</label>
            <input
              id="price-min"
              type="range"
              min="0"
              max={PRICE_MAX}
              step="500"
              value={minPrice}
              onChange={(event) => updatePrice(Math.min(Number(event.target.value), maxPrice - 500), maxPrice)}
              className="w-full"
              aria-valuetext={formatPesoShort(minPrice)}
            />
          </div>
          <div>
            <label htmlFor="price-max" className="mb-1 block text-[9px] font-semibold uppercase tracking-wide text-muted">Maximum</label>
            <input
              id="price-max"
              type="range"
              min="0"
              max={PRICE_MAX}
              step="500"
              value={maxPrice}
              onChange={(event) => updatePrice(minPrice, Math.max(Number(event.target.value), minPrice + 500))}
              className="w-full"
              aria-valuetext={formatPesoShort(maxPrice)}
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-line" />

      <fieldset>
        <legend className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">Availability</legend>
        <div className="space-y-1">
          {[
            ['all', 'All items'],
            ['in', 'In stock'],
            ['order', 'Order basis'],
          ].map(([value, label]) => (
            <label key={value} className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1.5 transition hover:bg-surface-2">
              <input
                type="radio"
                name="availability"
                value={value}
                checked={availability === value}
                onChange={() => setAvailability(value)}
                className="h-3.5 w-3.5 accent-[var(--primary)]"
              />
              <span className={`text-[11px] ${availability === value ? 'font-semibold text-primary' : 'text-muted'}`}>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {activeCount > 0 && (
        <button type="button" onClick={clearAll} className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed py-2 text-[10px] font-semibold text-muted transition hover:border-primary hover:text-primary">
          <RotateCcw size={11} /> Reset {activeCount} filter{activeCount === 1 ? '' : 's'}
        </button>
      )}
    </div>
  );
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const categoryId = searchParams.get('category') || '';
  const subId = searchParams.get('sub') || '';
  const query = searchParams.get('q') || '';
  const selectedBrands = (searchParams.get('brand') || '').split(',').filter(Boolean);
  const minPrice = Number(searchParams.get('min') || 0);
  const maxPrice = Number(searchParams.get('max') || PRICE_MAX);
  const availability = searchParams.get('avail') || 'all';
  const sort = searchParams.get('sort') || 'featured';
  const view = searchParams.get('view') || 'grid';
  const page = Math.max(1, Number(searchParams.get('page') || 1));

  const category = getCategory(categoryId);
  const subcategory = subId && category ? getSubcategory(categoryId, subId) : null;

  const baseProducts = useMemo(() => {
    let list = [...products];
    if (categoryId === 'deals') list = list.filter((product) => product.deal);
    else if (categoryId) list = list.filter((product) => product.category === categoryId);
    if (subId && categoryId !== 'deals') list = list.filter((product) => product.sub === subId);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((product) =>
        `${product.name} ${product.brand} ${product.category} ${product.specs.flat().join(' ')}`
          .toLowerCase()
          .includes(q),
      );
    }
    return list;
  }, [categoryId, subId, query]);

  const allBrands = useMemo(() => {
    const map = new Map();
    baseProducts.forEach((product) => map.set(product.brand, (map.get(product.brand) || 0) + 1));
    return [...map.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name));
  }, [baseProducts]);

  const filtered = useMemo(() => {
    let list = baseProducts.filter(
      (product) =>
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
        (availability === 'all' || (availability === 'in' ? product.stock === 'in' : product.stock === 'order')),
    );
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list = [...list].sort((a, b) => Number(b.deal) - Number(a.deal) || b.rating - a.rating);
    }
    return list;
  }, [baseProducts, minPrice, maxPrice, selectedBrands, availability, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visible = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 260);
    return () => window.clearTimeout(timer);
  }, [searchParams]);

  const updateParams = (updates, resetPage = true) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '' || (key === 'brand' && value.length === 0)) next.delete(key);
      else next.set(key, value);
    });
    if (resetPage) next.delete('page');
    setSearchParams(next);
  };

  const toggleBrand = (brand) => {
    const next = selectedBrands.includes(brand)
      ? selectedBrands.filter((item) => item !== brand)
      : [...selectedBrands, brand];
    updateParams({ brand: next.join(',') });
  };

  const clearBrands = () => updateParams({ brand: null });

  const updatePrice = (min, max) => {
    updateParams({ min: min > 0 ? String(min) : null, max: max < PRICE_MAX ? String(max) : null });
  };

  const setAvailability = (value) => updateParams({ avail: value === 'all' ? null : value });

  const clearAll = () => {
    const next = new URLSearchParams(searchParams);
    ['brand', 'min', 'max', 'avail', 'sort', 'view', 'page'].forEach((key) => next.delete(key));
    setSearchParams(next);
  };

  const activeCount = selectedBrands.length + (minPrice > 0 || maxPrice < PRICE_MAX ? 1 : 0) + (availability !== 'all' ? 1 : 0);
  const chips = [
    ...selectedBrands.map((brand) => ({ key: `brand-${brand}`, label: brand, clear: () => toggleBrand(brand) })),
    ...(minPrice > 0 || maxPrice < PRICE_MAX
      ? [{ key: 'price', label: `${formatPesoShort(minPrice)} – ${formatPesoShort(maxPrice)}`, clear: () => updateParams({ min: null, max: null }) }]
      : []),
    ...(availability !== 'all'
      ? [{ key: 'avail', label: availability === 'in' ? 'In stock' : 'Order basis', clear: () => setAvailability('all') }]
      : []),
  ];

  const heading = query
    ? `Search results for “${query}”`
    : subcategory?.name || category?.name || 'All Products';
  const description = query
    ? 'Searching the live TNC Tech Hub catalogue. Refine by brand, price or availability.'
    : categoryId === 'deals'
      ? 'Limited-time local offers on components, peripherals and complete builds.'
      : category?.blurb || 'Computer hardware, peripherals and accessories — ready for pickup in Bataan.';

  const breadcrumbs = [
    ['Home', '/'],
    ['Shop', '/shop'],
    ...(category && categoryId !== 'deals' ? [[category.name, `/shop?category=${category.id}`]] : []),
    ...(subcategory ? [[subcategory.name, `/shop?category=${category.id}&sub=${subcategory.id}`]] : []),
  ];

  return (
    <>
      <div className="border-b bg-surface/30">
        <div className="container-page py-5 sm:py-7">
          <nav className="mb-3 flex flex-wrap items-center gap-1 text-[10px] text-muted" aria-label="Breadcrumb">
            {breadcrumbs.map(([label, to], index) => (
              <span key={`${label}-${index}`} className="flex items-center gap-1">
                {index > 0 && <ChevronRight size={10} />}
                {index === breadcrumbs.length - 1 ? (
                  <span className="font-semibold text-ink">{label}</span>
                ) : (
                  <Link to={to} className="transition hover:text-primary">{label}</Link>
                )}
              </span>
            ))}
            {query && <><ChevronRight size={10} /><span className="font-semibold text-ink">Search</span></>}
          </nav>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-surface text-primary">
              <Icon name={category?.icon || (query ? 'Search' : 'LayoutGrid')} size={20} />
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{heading}</h1>
              <p className="mt-1 max-w-2xl text-xs leading-5 text-muted sm:text-sm">{description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page py-6 sm:py-8">
        <div className="grid gap-6 lg:grid-cols-[235px_1fr] xl:grid-cols-[255px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-[128px] max-h-[calc(100vh-145px)] overflow-y-auto rounded-2xl border bg-surface p-4">
              <div className="mb-4 flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={15} className="text-primary" />
                  <span className="text-xs font-bold text-ink">Filters</span>
                  {activeCount > 0 && <Badge variant="primary" className="!px-1.5 !py-0 !text-[9px]">{activeCount}</Badge>}
                </div>
              </div>
              <FilterContent
                allBrands={allBrands}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                minPrice={minPrice}
                maxPrice={maxPrice}
                updatePrice={updatePrice}
                availability={availability}
                setAvailability={setAvailability}
                clearAll={clearAll}
                clearBrands={clearBrands}
                activeCount={activeCount}
              />
            </div>
          </aside>

          <div id="shop-results" className="min-w-0 scroll-mt-32">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="flex min-h-[38px] items-center gap-1.5 rounded-lg border bg-surface px-3 text-xs font-semibold text-ink lg:hidden"
                >
                  <Filter size={14} className="text-primary" /> Filters
                  {activeCount > 0 && <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] text-white">{activeCount}</span>}
                </button>
                <p className="text-[11px] text-muted">
                  <span className="font-bold text-ink">{filtered.length}</span> result{filtered.length === 1 ? '' : 's'}
                  {filtered.length > 0 && <span className="hidden sm:inline"> · showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)}</span>}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <label htmlFor="sort-select" className="sr-only">Sort products</label>
                <select
                  id="sort-select"
                  value={sort}
                  onChange={(event) => updateParams({ sort: event.target.value === 'featured' ? null : event.target.value })}
                  className="input !min-h-[38px] !w-auto !px-2.5 !text-[11px]"
                >
                  {sortOptions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}
                </select>
                <div className="hidden items-center rounded-lg border bg-surface p-0.5 sm:flex">
                  <button
                    type="button"
                    onClick={() => updateParams({ view: null }, false)}
                    className={`flex h-7 w-7 items-center justify-center rounded-md transition ${view === 'grid' ? 'bg-surface-2 text-primary' : 'text-muted'}`}
                    aria-label="Grid view"
                    aria-pressed={view === 'grid'}
                  >
                    <Grid2X2 size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => updateParams({ view: 'list' }, false)}
                    className={`flex h-7 w-7 items-center justify-center rounded-md transition ${view === 'list' ? 'bg-surface-2 text-primary' : 'text-muted'}`}
                    aria-label="List view"
                    aria-pressed={view === 'list'}
                  >
                    <LayoutList size={14} />
                  </button>
                </div>
              </div>
            </div>

            {chips.length > 0 && (
              <div className="mb-4 flex flex-wrap items-center gap-1.5">
                {chips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={chip.clear}
                    className="chip border-primary/30 bg-primary-soft text-primary transition hover:border-primary"
                  >
                    {chip.label} <X size={11} />
                  </button>
                ))}
                <button type="button" onClick={clearAll} className="ml-1 text-[10px] font-semibold text-muted underline-offset-4 hover:text-ink hover:underline">
                  Clear all
                </button>
              </div>
            )}

            {loading ? (
              <div className={`grid gap-3 ${view === 'grid' ? 'grid-cols-2 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`} aria-busy="true" aria-label="Loading products">
                {Array.from({ length: view === 'grid' ? 8 : 4 }).map((_, index) => <ProductCardSkeleton key={index} />)}
              </div>
            ) : visible.length > 0 ? (
              <>
                <div className={`grid gap-3 ${view === 'grid' ? 'grid-cols-2 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                  {visible.map((product, index) =>
                    view === 'grid' ? (
                      <ProductCard key={product.id} product={product} index={index} />
                    ) : (
                      <ProductCardList key={product.id} product={product} index={index} />
                    ),
                  )}
                </div>
                <div className="mt-8 border-t pt-6">
                  <p className="mb-4 text-center text-[10px] text-muted">
                    Page {safePage} of {totalPages} · 24 products per page
                  </p>
                  <Pagination
                    current={safePage}
                    totalPages={totalPages}
                    onChange={(next) => {
                      updateParams({ page: next === 1 ? null : String(next) }, false);
                      window.setTimeout(() => document.getElementById('shop-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
                    }}
                  />
                </div>
              </>
            ) : (
              <EmptyState
                icon={SearchX}
                title="No products match those filters"
                description="Try widening your price range or removing a brand filter. Our full catalogue has plenty more to explore."
                action={<Button onClick={clearAll}><RotateCcw size={14} /> Clear all filters</Button>}
              />
            )}

            {!loading && filtered.length === 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {categories.slice(0, 4).map((cat) => (
                  <Link key={cat.id} to={`/shop?category=${cat.id}`} className="chip border-line bg-surface text-muted hover:border-primary hover:text-primary">
                    <Icon name={cat.icon} size={12} /> {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Drawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Filters"
        side="left"
        footer={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={clearAll} className="flex-1">Reset</Button>
            <Button onClick={() => setFiltersOpen(false)} className="flex-1">Show {filtered.length} results</Button>
          </div>
        }
      >
        <div className="p-5">
          <FilterContent
            allBrands={allBrands}
            selectedBrands={selectedBrands}
            toggleBrand={toggleBrand}
            minPrice={minPrice}
            maxPrice={maxPrice}
            updatePrice={updatePrice}
            availability={availability}
            setAvailability={setAvailability}
            clearAll={clearAll}
            clearBrands={clearBrands}
            activeCount={activeCount}
          />
        </div>
      </Drawer>
    </>
  );
}
