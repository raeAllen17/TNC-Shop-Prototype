import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BadgeCheck, BadgePercent, ChevronLeft, ChevronRight, Clock3, Cpu,
  Headphones, HeartHandshake, MapPin, ShieldCheck, Sparkles, Truck, WalletCards,
} from 'lucide-react';
import Icon from '../components/Icon';
import ProductCard from '../components/ProductCard';
import ProductVisual from '../components/ProductVisual';
import InstallmentCalculator from '../components/InstallmentCalculator';
import { Badge, Counter, Price, Reveal, SectionHeading } from '../components/ui/primitives';
import Button from '../components/ui/Button';
import { categories, dealProducts, getProduct, pcBuilderParts, products, services } from '../data/products';
import { formatPeso } from '../lib/format';

const heroProducts = [
  getProduct('gigabyte-rtx-5060-eagle-oc-8gb') || products[0],
  getProduct('amd-ryzen-7-7800x3d') || products[1],
  getProduct('nvision-24-144hz-gaming-monitor') || products[2],
];

const marqueeBrands = [
  'Intel', 'AMD', 'NVIDIA', 'ASUS', 'MSI', 'Gigabyte',
  'Corsair', 'Kingston', 'Samsung', 'Logitech', 'Redragon', 'TP-Link',
];

const collections = [
  {
    title: 'Gaming PC Pre-Builts',
    copy: 'Plug in, sign in, dominate. Tested builds with local warranty.',
    to: '/shop?category=computers&sub=gaming-pc',
    icon: 'Gamepad2',
    eyebrow: 'Ready to play',
    product: getProduct('tnc-esports-pc-i5-12400f-rtx-4060'),
    className: 'sm:col-span-2 lg:col-span-2 lg:row-span-2',
    size: 'large',
  },
  {
    title: 'Graphics Cards',
    copy: 'RTX 50 & 40 series, Radeon RX 7000.',
    to: '/shop?category=components&sub=gpu',
    icon: 'Gpu',
    eyebrow: 'Frame by frame',
    product: getProduct('gigabyte-rtx-5060-eagle-oc-8gb'),
    className: '',
    size: 'small',
  },
  {
    title: 'Monitors',
    copy: 'High refresh. Sharp detail.',
    to: '/shop?category=peripherals&sub=monitor',
    icon: 'Monitor',
    eyebrow: 'See the difference',
    product: getProduct('nvision-24-144hz-gaming-monitor'),
    className: '',
    size: 'small',
  },
  {
    title: 'Keyboards & Mice',
    copy: 'Mechanical feel. Competitive control.',
    to: '/shop?category=peripherals&sub=keyboard',
    icon: 'Keyboard',
    eyebrow: 'Your setup, upgraded',
    product: getProduct('redragon-k611-rgb-mechanical-keyboard'),
    className: 'sm:col-span-2',
    size: 'wide',
  },
];

function Countdown() {
  const [remaining, setRemaining] = useState(0);
  useEffect(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const update = () => setRemaining(Math.max(0, end.getTime() - Date.now()));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);
  const total = Math.floor(remaining / 1000);
  const units = [
    ['Hrs', Math.floor(total / 3600)],
    ['Min', Math.floor((total % 3600) / 60)],
    ['Sec', total % 60],
  ];
  return (
    <div className="flex items-center gap-1.5" aria-label="Time remaining in today's deals">
      {units.map(([label, value], index) => (
        <div key={label} className="flex items-center gap-1.5">
          <div className="min-w-[38px] rounded-lg border border-primary/25 bg-primary-soft px-1.5 py-1 text-center">
            <span className="block font-display text-sm font-bold tabular-nums text-primary">{String(value).padStart(2, '0')}</span>
            <span className="block text-[7px] font-bold uppercase tracking-wider text-muted">{label}</span>
          </div>
          {index < units.length - 1 && <span className="text-xs font-bold text-muted">:</span>}
        </div>
      ))}
    </div>
  );
}

function Hero() {
  const main = heroProducts[0];
  const cpu = heroProducts[1];
  const monitor = heroProducts[2];

  return (
    <section className="relative overflow-hidden border-b">
      <div className="hero-mesh absolute inset-0" aria-hidden="true" />
      <div className="grid-lines absolute inset-0" aria-hidden="true" />
      <div className="container-page relative">
        <div className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.02fr_.98fr] lg:gap-6 lg:py-20">
          <div className="relative z-10">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="chip border-primary/30 bg-primary-soft text-primary">
                <MapPin size={12} /> Balanga City, Bataan
              </span>
              <span className="chip border-line bg-surface/70 text-muted">
                <Clock3 size={12} /> Open daily · 10:00 AM–6:30 PM
              </span>
            </div>
            <p className="eyebrow mb-3">Bataan&apos;s tech upgrade hub</p>
            <h1 className="font-display text-[2.65rem] font-bold leading-[0.96] tracking-[-0.055em] text-ink sm:text-6xl lg:text-[5.15rem] xl:text-[5.6rem]">
              Build.<br />
              Upgrade.<br />
              <span className="relative inline-block text-primary">
                Perform.
                <svg className="absolute -bottom-2 left-0 w-full text-primary/35" viewBox="0 0 240 12" fill="none" aria-hidden="true">
                  <path d="M2 9C53 2 165 1 238 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-muted sm:mt-7 sm:text-base sm:leading-8">
              Real components. Honest advice. Custom builds and expert repairs from your local tech team — right here in Balanga.
            </p>
            <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <Button to="/shop?category=components" size="lg" className="group">
                Shop Components <ArrowRight size={17} className="transition group-hover:translate-x-0.5" />
              </Button>
              <Button to="/pc-builder" variant="secondary" size="lg">
                <Cpu size={17} className="text-primary" /> Open PC Builder
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 border-t pt-5">
              <div>
                <p className="font-display text-xl font-bold text-ink"><Counter value={1200} suffix="+" /></p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Builds completed</p>
              </div>
              <div className="h-8 w-px bg-line" />
              <div>
                <p className="font-display text-xl font-bold text-ink"><Counter value={4} suffix=".9" /></p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Customer rating</p>
              </div>
              <div className="h-8 w-px bg-line" />
              <div>
                <p className="font-display text-xl font-bold text-ink"><Counter value={3} /></p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">Bataan branches</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="orange-glow relative h-[320px] sm:h-[420px] lg:h-[480px]">
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 bg-primary/5" />
              <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary/10" />

              <div className="absolute right-0 top-5 z-10 w-[78%] rotate-[2deg] overflow-hidden rounded-2xl border bg-surface shadow-float transition duration-500 hover:rotate-0 sm:top-8">
                <ProductVisual product={main} className="aspect-[4/3]" />
                <div className="flex items-center justify-between gap-2 p-3">
                  <div className="min-w-0">
                    <p className="text-[9px] uppercase tracking-wide text-muted">Customer favourite</p>
                    <p className="truncate text-xs font-bold text-ink">{main.name}</p>
                  </div>
                  <p className="shrink-0 text-xs font-bold text-primary">{formatPeso(main.price)}</p>
                </div>
              </div>

              <div className="absolute bottom-12 left-0 z-20 w-[45%] -rotate-3 animate-floaty overflow-hidden rounded-xl border bg-surface shadow-float">
                <ProductVisual product={cpu} className="aspect-square" showMeta={false} />
                <div className="flex items-center justify-between gap-1 p-2.5">
                  <p className="truncate text-[10px] font-bold text-ink">{cpu.name.replace('AMD ', '')}</p>
                  <Badge variant="success" dot className="!px-1.5 !py-0.5 !text-[8px]">In stock</Badge>
                </div>
              </div>

              <div className="absolute bottom-0 right-2 z-20 w-[38%] rotate-[5deg] animate-floaty overflow-hidden rounded-xl border bg-surface shadow-float [animation-delay:1.4s]">
                <ProductVisual product={monitor} className="aspect-[4/3]" showMeta={false} />
                <p className="truncate px-2.5 py-2 text-[10px] font-bold text-ink">{monitor.name}</p>
              </div>

              <div className="absolute right-0 top-0 z-20 flex items-center gap-2 rounded-xl border bg-surface/95 px-3 py-2 shadow-float backdrop-blur sm:right-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10 text-success">
                  <BadgeCheck size={17} />
                </span>
                <div>
                  <p className="text-[10px] font-bold text-ink">Built & tested in Balanga</p>
                  <p className="text-[9px] text-muted">2-year local warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryGrid() {
  return (
    <section className="container-page py-12 sm:py-16">
      <SectionHeading
        eyebrow="Shop your way"
        title="Find the right gear, faster."
        description="Seven clean categories. Every card leads to a real, filtered catalogue."
        action={<Link to="/categories" className="btn btn-secondary !min-h-[38px] !text-xs">All categories <ArrowRight size={14} /></Link>}
      />
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {categories.map((category, index) => {
          const count = category.id === 'deals' ? dealProducts.length : products.filter((product) => product.category === category.id).length;
          const deals = category.id === 'deals';
          return (
            <Reveal key={category.id} delay={index * 30}>
              <Link
                to={deals ? '/deals' : `/shop?category=${category.id}`}
                className={`group flex h-full min-h-[130px] flex-col justify-between rounded-2xl border p-4 transition duration-200 hover:-translate-y-0.5 ${
                  deals
                    ? 'border-primary/35 bg-primary-soft hover:border-primary hover:shadow-glow'
                    : 'bg-surface hover:border-primary/50 hover:shadow-card'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl transition group-hover:scale-105 ${deals ? 'bg-primary text-white' : 'bg-surface-2 text-primary group-hover:bg-primary group-hover:text-white'}`}>
                    <Icon name={category.icon} size={19} />
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wide text-muted">{count} items</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink transition group-hover:text-primary">{category.name}</h3>
                  <p className="mt-0.5 line-clamp-2 text-[10px] leading-4 text-muted">{category.blurb}</p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function HotDeals() {
  const trackRef = useRef(null);
  const scroll = (direction) => {
    trackRef.current?.scrollBy({ left: direction * 560, behavior: 'smooth' });
  };

  return (
    <section className="border-y bg-surface/35 py-12 sm:py-16">
      <div className="container-page">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-2 flex items-center gap-1.5"><Sparkles size={12} /> Limited-time price drops</p>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="section-title">Hot Deals</h2>
              <Countdown />
            </div>
            <p className="mt-2 text-sm text-muted">Local pricing, real stock. While supplies last.</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => scroll(-1)} className="flex h-9 w-9 items-center justify-center rounded-lg border bg-surface text-muted transition hover:border-primary hover:text-primary" aria-label="Previous deals">
              <ChevronLeft size={17} />
            </button>
            <button type="button" onClick={() => scroll(1)} className="flex h-9 w-9 items-center justify-center rounded-lg border bg-surface text-muted transition hover:border-primary hover:text-primary" aria-label="Next deals">
              <ChevronRight size={17} />
            </button>
            <Link to="/deals" className="ml-1 hidden text-xs font-bold text-primary hover:underline sm:block">View all deals →</Link>
          </div>
        </div>

        <div ref={trackRef} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {dealProducts.slice(0, 10).map((product, index) => (
            <div key={product.id} className="w-[230px] shrink-0 snap-start sm:w-[255px]">
              <ProductCard product={product} index={index} compact />
            </div>
          ))}
        </div>
        <Link to="/deals" className="mt-4 flex items-center justify-center gap-1 text-xs font-bold text-primary sm:hidden">
          View all deals <ArrowRight size={13} />
        </Link>
      </div>
    </section>
  );
}

function FeaturedCollections() {
  return (
    <section className="container-page py-12 sm:py-16">
      <SectionHeading
        eyebrow="Curated collections"
        title="Built for the way you play."
        description="Start with a category, get expert help, and leave with a setup you actually love."
        action={<Link to="/shop" className="hidden text-xs font-bold text-primary hover:underline sm:block">Browse everything →</Link>}
      />
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        {collections.map((collection, index) => {
          const large = collection.size === 'large';
          return (
            <Reveal key={collection.title} delay={index * 50} className={collection.className}>
              <Link
                to={collection.to}
                className={`group relative flex h-full min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border bg-surface p-5 transition duration-300 hover:border-primary/50 hover:shadow-card ${large ? 'sm:min-h-[320px] lg:min-h-[380px]' : ''} ${collection.size === 'wide' ? 'sm:min-h-[180px]' : ''}`}
              >
                {collection.product && (
                  <div className="pointer-events-none absolute -right-8 -top-6 h-[155%] w-[58%] rotate-[-4deg] opacity-45 transition duration-500 group-hover:scale-105 group-hover:opacity-60">
                    <ProductVisual product={collection.product} className="h-full w-full rounded-2xl" showMeta={false} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-transparent" />
                <div className="relative z-10">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary-soft text-primary">
                    <Icon name={collection.icon} size={18} />
                  </span>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-primary">{collection.eyebrow}</p>
                  <h3 className={`mt-1.5 font-display font-bold tracking-tight text-ink ${large ? 'text-2xl sm:text-3xl' : 'text-base'}`}>{collection.title}</h3>
                  <p className={`mt-1.5 max-w-[200px] text-xs leading-5 text-muted ${large ? 'sm:max-w-[250px]' : ''}`}>{collection.copy}</p>
                </div>
                <div className="relative z-10 mt-6 flex items-center gap-1.5 text-[11px] font-bold text-ink transition group-hover:text-primary">
                  Explore <ArrowRight size={13} className="transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function PcBuilderTeaser() {
  const defaults = {
    cpu: pcBuilderParts.cpu[1]?.id || '',
    motherboard: pcBuilderParts.motherboard[1]?.id || '',
    gpu: pcBuilderParts.gpu[1]?.id || '',
    memory: pcBuilderParts.memory[0]?.id || '',
  };
  const [selection, setSelection] = useState(defaults);
  const selected = useMemo(
    () => Object.values(selection).map((id) => getProduct(id)).filter(Boolean),
    [selection],
  );
  const total = selected.reduce((sum, product) => sum + product.price, 0);
  const labels = { cpu: 'Processor', motherboard: 'Motherboard', gpu: 'Graphics card', memory: 'Memory' };

  return (
    <section className="border-y bg-surface/35 py-12 sm:py-16">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10">
          <Reveal>
            <p className="eyebrow mb-2">Build with confidence</p>
            <h2 className="section-title max-w-md">Your dream PC, one part at a time.</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-muted">
              Pick your core components and watch the total update live. Our full builder checks sockets, estimates wattage and flags compatibility before you buy.
            </p>
            <div className="mt-5 space-y-2.5">
              {['Guided compatibility checks', 'Live total and wattage estimate', 'Add the whole build to cart'].map((item) => (
                <p key={item} className="flex items-center gap-2 text-xs font-semibold text-ink">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10 text-success"><BadgeCheck size={12} /></span>
                  {item}
                </p>
              ))}
            </div>
            <Button to="/pc-builder" className="mt-6" size="lg">
              Open the full PC Builder <ArrowRight size={16} />
            </Button>
          </Reveal>

          <Reveal delay={100}>
            <div className="card overflow-hidden shadow-card">
              <div className="flex items-center justify-between gap-3 border-b p-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white"><Cpu size={18} /></span>
                  <div>
                    <p className="text-xs font-bold text-ink">Quick build</p>
                    <p className="text-[10px] text-muted">4 core components</p>
                  </div>
                </div>
                <span className="chip border-success/30 bg-success/10 text-success"><span className="h-1.5 w-1.5 rounded-full bg-current" /> Compatible</span>
              </div>
              <div className="grid gap-3 p-4 sm:grid-cols-2">
                {Object.entries(labels).map(([key, label]) => (
                  <div key={key}>
                    <label htmlFor={`mini-${key}`} className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted">{label}</label>
                    <select
                      id={`mini-${key}`}
                      value={selection[key]}
                      onChange={(event) => setSelection((current) => ({ ...current, [key]: event.target.value }))}
                      className="input !min-h-[38px] !px-2.5 !text-[11px]"
                    >
                      {pcBuilderParts[key].map((product) => (
                        <option key={product.id} value={product.id}>{product.name} — {formatPeso(product.price)}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <div className="mx-4 mb-4 flex items-center justify-between rounded-xl border border-primary/20 bg-primary-soft p-3.5">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted">Live build total</p>
                  <p className="font-display text-xl font-bold text-primary">{formatPeso(total)}</p>
                </div>
                <span className="text-[10px] text-muted">{selected.length} parts selected</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function BrandMarquee() {
  const brandList = [...marqueeBrands, ...marqueeBrands];
  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Trusted brands</p>
            <h2 className="section-title">The names builders trust.</h2>
          </div>
          <Link to="/brands" className="text-xs font-bold text-primary hover:underline">All brands →</Link>
        </div>
      </div>
      <div
        className="relative overflow-hidden border-y bg-surface/30 py-5"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
      >
        <div className="flex w-max animate-marquee gap-2 hover:[animation-play-state:paused]">
          {brandList.map((brand, index) => (
            <Link
              key={`${brand}-${index}`}
              to={`/brand/${brand.toLowerCase()}`}
              tabIndex={index >= marqueeBrands.length ? -1 : 0}
              aria-hidden={index >= marqueeBrands.length}
              className="flex h-16 w-[132px] shrink-0 items-center justify-center rounded-xl border bg-surface px-4 transition hover:border-primary/50 hover:bg-surface-2"
            >
              <span className="font-display text-sm font-bold tracking-tight text-muted transition hover:text-primary">{brand}</span>
            </Link>
          ))}
        </div>
      </div>
      <p className="container-page mt-3 text-center text-[10px] text-muted">
        Authorized retailer & warranty support for leading hardware brands.
      </p>
    </section>
  );
}

function HomeCreditBanner() {
  const sample = getProduct('tnc-esports-pc-i5-12400f-rtx-4060');
  return (
    <section className="container-page pb-12 sm:pb-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-surface p-5 sm:p-8 lg:p-10">
          <div className="hero-mesh absolute inset-0 opacity-80" aria-hidden="true" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <span className="chip border-primary/30 bg-primary-soft text-primary"><WalletCards size={13} /> Home Credit accepted in-store</span>
              <h2 className="mt-4 max-w-lg font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Take it home today. Pay monthly.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-muted">
                Get the upgrade you need now and spread the cost across 6 to 24 months. Apply in-store at any TNC Tech Hub branch — our team will walk you through it.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold text-muted">
                <span className="flex items-center gap-1.5"><BadgeCheck size={13} className="text-success" /> Down payment from 10%</span>
                <span className="flex items-center gap-1.5"><BadgeCheck size={13} className="text-success" /> Plans up to 24 months</span>
                <span className="flex items-center gap-1.5"><BadgeCheck size={13} className="text-success" /> Quick in-store approval</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button to="/home-credit">See Home Credit options <ArrowRight size={15} /></Button>
                {sample && <Button to={`/product/${sample.id}`} variant="secondary">View sample build — {formatPeso(sample.price)}</Button>}
              </div>
            </div>
            <InstallmentCalculator price={sample?.price || 46900} compact />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const trustItems = [
  { icon: Truck, title: 'Free local delivery', copy: `On orders over ${formatPeso(15000)} in Balanga.` },
  { icon: BadgePercent, title: 'Daily local offers', copy: 'New deals on components and accessories.' },
  { icon: ShieldCheck, title: 'Secure payment', copy: 'Cash, card or Home Credit in-store.' },
  { icon: Headphones, title: 'Real human support', copy: 'Message our team 24/7 — repairs daily.' },
];

function TrustStrip() {
  return (
    <section className="border-y">
      <div className="container-page grid grid-cols-2 divide-x divide-y lg:grid-cols-4 lg:divide-y-0">
        {trustItems.map(({ icon: TrustIcon, title, copy }) => (
          <div key={title} className="flex items-start gap-3 px-3 py-5 sm:px-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary"><TrustIcon size={17} /></span>
            <div>
              <p className="text-[11px] font-bold text-ink sm:text-xs">{title}</p>
              <p className="mt-0.5 text-[9px] leading-4 text-muted sm:text-[10px]">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesBand() {
  const serviceItems = services.filter((service) =>
    ['diagnostics', 'os-installation', 'pc-cleaning', 'data-backup'].includes(service.id),
  );
  return (
    <section className="container-page py-12 sm:py-16">
      <SectionHeading
        eyebrow="Not just sales"
        title="We keep your tech running."
        description="Walk in or book ahead. Transparent service pricing, no guesswork."
        action={<Link to="/contact#services" className="hidden text-xs font-bold text-primary hover:underline sm:block">Book a service →</Link>}
      />
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {serviceItems.map((service, index) => (
          <Reveal key={service.id} delay={index * 40}>
            <Link
              to={`/contact?service=${service.id}`}
              className="card card-hover group flex h-full flex-col p-4"
            >
              <div className="mb-4 flex items-start justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon name={service.icon} size={19} />
                </span>
                <span className="text-[9px] font-semibold text-muted">{service.duration}</span>
              </div>
              <h3 className="text-sm font-bold text-ink transition group-hover:text-primary">{service.name}</h3>
              <p className="mt-1.5 flex-1 text-[11px] leading-5 text-muted">{service.description}</p>
              <div className="mt-4 flex items-center justify-between border-t pt-3">
                <Price value={service.price} size="sm" />
                <span className="flex items-center gap-1 text-[10px] font-bold text-primary">Book <ArrowRight size={12} /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-xl border bg-surface-2/60 p-4 sm:flex-row sm:items-center sm:px-5">
        <p className="flex items-start gap-2.5 text-xs text-muted">
          <HeartHandshake size={18} className="mt-0.5 shrink-0 text-primary" />
          <span><strong className="text-ink">Free diagnosis</strong> on walk-in repairs. If we can&apos;t fix it, you don&apos;t pay the diagnostic fee.</span>
        </p>
        <Button to="/contact" variant="secondary" size="sm">Talk to a technician</Button>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <HotDeals />
      <FeaturedCollections />
      <PcBuilderTeaser />
      <BrandMarquee />
      <div className="pt-12 sm:pt-16"><HomeCreditBanner /></div>
      <TrustStrip />
      <ServicesBand />
    </>
  );
}
