import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Sparkles, Tag } from 'lucide-react';
import Button from '../components/ui/Button';
import { EmptyState, Reveal, SectionHeading } from '../components/ui/primitives';
import { brandsWithCounts } from '../data/products';
import { slugify } from '../lib/format';

const featuredNames = ['ASUS', 'AMD', 'NVIDIA', 'Logitech', 'Corsair', 'Keychron', 'Samsung', 'TP-Link'];

export default function BrandsPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return brandsWithCounts.filter((brand) => !q || brand.name.toLowerCase().includes(q));
  }, [query]);

  const featured = featuredNames.map((name) => brandsWithCounts.find((brand) => brand.name === name)).filter(Boolean);
  const grouped = filtered.reduce((groups, brand) => {
    const letter = /[a-z]/i.test(brand.name[0]) ? brand.name[0].toUpperCase() : '#';
    groups[letter] = [...(groups[letter] || []), brand];
    return groups;
  }, {});
  const letters = Object.keys(grouped).sort();

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="eyebrow mb-2">Authorised local retailer</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Shop by brand</h1>
        <p className="mt-2 text-sm leading-6 text-muted">From the parts inside your PC to the gear on your desk. Genuine products with local warranty support.</p>
      </div>

      <div className="relative mt-5 max-w-md">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} className="input pl-10" placeholder="Search brands…" aria-label="Search brands" />
      </div>

      {!query && (
        <section className="mt-8">
          <SectionHeading eyebrow="Most requested" title="The names people ask for." />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {featured.map((brand, index) => (
              <Reveal key={brand.name} delay={index * 35}>
                <Link to={`/brand/${slugify(brand.name)}`} className="group card flex items-center gap-3 p-3 transition hover:border-primary/40">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft font-display text-sm font-bold text-primary">{brand.name[0]}</span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-ink group-hover:text-primary">{brand.name}</p>
                    <p className="text-[9px] text-muted">{brand.count} products</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-xl font-bold text-ink">{query ? 'Search results' : 'All brands'}</h2>
          <span className="text-[10px] text-muted">{filtered.length} brand{filtered.length === 1 ? '' : 's'}</span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Tag}
            title="No brand found"
            description="Try a shorter name, or ask us to special-order the brand you need."
            action={<Button to="/contact?topic=product">Request a brand</Button>}
          />
        ) : (
          <div className="space-y-5">
            {letters.map((letter) => (
              <div key={letter} className="grid gap-2 sm:grid-cols-[36px_1fr]">
                <div className="hidden pt-2 sm:block">
                  <span className="font-display text-lg font-bold text-line">{letter}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {grouped[letter].map((brand) => (
                    <Link key={brand.name} to={`/brand/${slugify(brand.name)}`} className="group flex items-center justify-between gap-2 rounded-lg border bg-surface px-3 py-2.5 transition hover:border-primary/40">
                      <span className="truncate text-xs font-semibold text-ink group-hover:text-primary">{brand.name}</span>
                      <span className="text-[9px] text-muted">{brand.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/20 bg-primary-soft p-5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white"><Sparkles size={18} /></span>
          <div>
            <h2 className="font-display text-base font-bold text-ink">Looking for a brand we don&apos;t list?</h2>
            <p className="mt-0.5 text-[11px] text-muted">We may be able to special-order it through our distributors.</p>
          </div>
        </div>
        <Button to="/contact?topic=product" size="sm">Ask our team <ArrowRight size={13} /></Button>
      </div>
    </div>
  );
}
