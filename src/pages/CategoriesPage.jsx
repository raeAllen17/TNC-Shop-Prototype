import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Flame, LayoutGrid, Sparkles } from 'lucide-react';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import { Reveal, SectionHeading } from '../components/ui/primitives';
import { categories, dealProducts, products } from '../data/products';

const countFor = (categoryId) => products.filter((product) => product.category === categoryId).length;

export default function CategoriesPage() {
  const visibleCategories = categories.filter((category) => category.id !== 'deals');

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="eyebrow mb-2">Find your next upgrade</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Browse by category</h1>
        <p className="mt-2 text-sm leading-6 text-muted">Everything in the Balanga store, organised the way people actually shop. Tap a category to see products, or jump straight to a subcategory.</p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCategories.map((category, index) => {
          const count = countFor(category.id);
          const isWide = index === 0 || index === 3;
          return (
            <Reveal key={category.id} delay={index * 40} className={isWide ? 'sm:col-span-2 lg:col-span-1' : ''}>
              <div className="card group flex h-full flex-col p-4 transition hover:border-primary/40">
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon name={category.icon} size={20} /></span>
                  <span className="rounded-full bg-surface-2 px-2 py-1 text-[9px] font-bold text-muted">{count} items</span>
                </div>
                <h2 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-primary"><Link to={`/shop?category=${category.id}`}>{category.name}</Link></h2>
                <p className="mt-1 text-[11px] leading-5 text-muted">{category.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {category.subs.slice(0, 4).map((sub) => (
                    <Link key={sub.id} to={`/shop?category=${category.id}&sub=${sub.id}`} className="chip border-line bg-surface-2 text-muted hover:border-primary/40 hover:text-primary">{sub.name}</Link>
                  ))}
                </div>
                <Link to={`/shop?category=${category.id}`} className="mt-auto flex items-center gap-1 pt-4 text-[10px] font-bold text-primary">Shop {category.name.toLowerCase()} <ArrowRight size={12} className="transition group-hover:translate-x-0.5" /></Link>
              </div>
            </Reveal>
          );
        })}

        <Reveal delay={visibleCategories.length * 40}>
          <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-primary/25 bg-primary-soft p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white"><Flame size={20} /></span>
            <h2 className="mt-4 font-display text-lg font-bold text-ink">Hot deals</h2>
            <p className="mt-1 text-[11px] leading-5 text-muted">Limited-time price drops on components, peripherals and complete builds.</p>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-primary">{dealProducts.length} live offers</p>
            <Link to="/deals" className="mt-auto flex items-center gap-1 pt-4 text-[10px] font-bold text-primary">See all deals <ArrowRight size={12} /></Link>
            <Flame size={80} className="pointer-events-none absolute -bottom-3 -right-2 text-primary/10" />
          </div>
        </Reveal>
      </div>

      <section className="mt-10">
        <SectionHeading eyebrow="Popular paths" title="Not sure where to start?" description="A few shortcuts based on what people ask for most." />
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: 'Gamepad2', title: 'Build a gaming PC', copy: 'Pick compatible parts with live totals.', to: '/pc-builder' },
            { icon: 'WalletCards', title: 'Buy on installment', copy: 'Estimate a Home Credit plan first.', to: '/home-credit' },
            { icon: 'Wrench', title: 'Repair or upgrade', copy: 'Free diagnostics at any branch.', to: '/contact?topic=repair' },
          ].map(({ icon, title, copy, to }, index) => (
            <Reveal key={title} delay={index * 50}>
              <Link to={to} className="group card flex items-start gap-3 p-4 transition hover:border-primary/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-primary"><Icon name={icon} size={18} /></span>
                <div>
                  <h3 className="text-sm font-bold text-ink group-hover:text-primary">{title}</h3>
                  <p className="mt-1 text-[10px] leading-5 text-muted">{copy}</p>
                </div>
                <ArrowUpRight size={14} className="ml-auto text-muted transition group-hover:text-primary" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-xl border bg-surface p-4 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2.5">
          <LayoutGrid size={18} className="text-primary" />
          <p className="text-xs text-muted"><strong className="text-ink">Prefer filters?</strong> Use the full shop to combine brand, price and availability.</p>
        </div>
        <Button to="/shop" size="sm" variant="secondary">Open all products <Sparkles size={13} /></Button>
      </div>
    </div>
  );
}
