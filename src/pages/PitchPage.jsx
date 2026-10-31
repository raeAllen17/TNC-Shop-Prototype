import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, CalendarCheck, Check, CheckCircle2, ChevronLeft, ChevronRight,
  GripVertical, Mail, Phone, Presentation, Printer, Sparkles,
} from 'lucide-react';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Accordion from '../components/ui/Accordion';
import { useStore } from '../context/StoreContext';
import {
  agency, comparisonSlides, findings, maintenancePlans, newFeatures, pitchFaqs, pitchHero,
  roadmap, slaRows,
} from '../data/pitch';
import { formatPesoShort } from '../lib/format';

const severityStyles = {
  Critical: 'border-danger/30 bg-danger/10 text-danger',
  High: 'border-warning/30 bg-warning/10 text-warning',
  Medium: 'border-line bg-surface-2 text-muted',
  Growth: 'border-primary/25 bg-primary-soft text-primary',
};

function BeforeAfter({ slide, initial = 52 }) {
  const [position, setPosition] = useState(initial);

  return (
    <div className="overflow-hidden rounded-xl border bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary"><Presentation size={14} /></span>
          <h3 className="text-xs font-bold text-ink">{slide.title}</h3>
        </div>
        <p className="flex items-center gap-1 text-[9px] text-muted"><GripVertical size={11} /> Drag to compare</p>
      </div>
      <div className="relative h-[255px] select-none overflow-hidden bg-[#0d0d0d] sm:h-[290px]">
        <div className="absolute inset-0 overflow-hidden">
          <MockBefore type={slide.title} label={slide.beforeLabel} />
        </div>
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <MockAfter type={slide.title} label={slide.afterLabel} />
        </div>
        <div className="pointer-events-none absolute inset-y-0 z-20 w-px bg-primary" style={{ left: `${position}%` }}>
          <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary bg-[#111] text-primary shadow-glow">
            <GripVertical size={16} />
          </span>
        </div>
        <span className="absolute left-2.5 top-2.5 z-10 rounded bg-black/65 px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-white/60">{slide.beforeLabel}</span>
        <span className="absolute right-2.5 top-2.5 z-10 rounded bg-primary px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-white">{slide.afterLabel}</span>
        <input
          type="range"
          min="4"
          max="96"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
          aria-label={`Compare ${slide.title}: before and after`}
        />
      </div>
      <div className="grid gap-2 px-4 py-3 sm:grid-cols-3">
        {slide.points.map((point) => (
          <p key={point} className="flex items-start gap-1.5 text-[9px] leading-4 text-muted"><Check size={11} className="mt-0.5 shrink-0 text-success" /> {point}</p>
        ))}
      </div>
    </div>
  );
}

function MockBefore({ type, label }) {
  const home = type === 'Home page';
  return (
    <div className="h-full w-full bg-[#e9e5df] p-2 text-[#2c2c2c]">
      <div className="flex items-center justify-between rounded bg-[#d8d2c8] px-2 py-1">
        <span className="text-[6px] font-bold">TNC TECH HUB</span>
        <span className="flex gap-1 text-[5px] text-[#6a665f]"><span>Home</span><span>Home</span><span>Products</span><span>Test</span></span>
      </div>
      <div className="mt-1.5 grid grid-cols-[.7fr_1.3fr] gap-1.5">
        <div className="space-y-1">
          <div className="h-12 rounded bg-[#c9c2b7]" />
          <div className="h-2 w-3/4 rounded bg-[#c9c2b7]" />
          <div className="h-2 w-1/2 rounded bg-[#c9c2b7]" />
          <div className="mt-2 h-4 w-9 rounded bg-[#b9af9f]" />
        </div>
        <div className="grid grid-cols-2 gap-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded border border-[#cfc8bc] bg-[#f5f2ec] p-1">
              <div className="mb-0.5 h-6 rounded bg-[#ddd6ca]" />
              <div className="h-1.5 w-full rounded bg-[#cbc3b6]" />
              <div className="mt-0.5 h-1.5 w-1/2 rounded bg-[#cbc3b6]" />
              {index === 1 && <span className="mt-0.5 block w-fit bg-yellow-300 px-0.5 text-[4px] font-bold text-black">TEST 2 · ₱2.00</span>}
            </div>
          ))}
        </div>
      </div>
      {home && (
        <div className="mt-1 space-y-0.5 rounded bg-[#d8d2c8] p-1">
          {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-1 w-full rounded bg-[#bdb5a8]" style={{ width: `${92 - index * 9}%` }} />)}
        </div>
      )}
      {!home && (
        <div className="mt-1.5 space-y-0.5 rounded bg-[#d8d2c8] p-1">
          {Array.from({ length: 9 }).map((_, index) => <div key={index} className="flex items-center justify-between border-b border-[#c8c0b4] py-0.5 text-[4px] text-[#6a665f]"><span>Product #{index + 1} — item name</span><span>₱{index + 1},999</span></div>)}
        </div>
      )}
      <span className="sr-only">{label} mockup</span>
    </div>
  );
}

function MockAfter({ type, label }) {
  const home = type === 'Home page';
  return (
    <div className="h-full w-full bg-[#111] p-2 text-white">
      <div className="flex items-center justify-between rounded border border-white/10 bg-[#171717] px-2 py-1.5">
        <span className="flex items-center gap-1 text-[6px] font-bold"><span className="flex h-3 w-3 items-center justify-center rounded bg-primary text-[5px]">T</span> TNC</span>
        <span className="flex gap-1 text-[5px] text-white/50"><span>Computers</span><span>Components</span><span>PC Builder</span><span className="text-primary">Deals</span></span>
        <span className="rounded bg-primary px-1.5 py-0.5 text-[4px] font-bold">Search</span>
      </div>
      <div className="mt-1.5 grid grid-cols-[1.15fr_.85fr] gap-1.5">
        <div className="relative overflow-hidden rounded border border-white/10 bg-[#171717] p-2">
          <span className="text-[4px] font-bold uppercase tracking-wide text-primary">Built in Bataan</span>
          <p className="mt-1 w-4/5 text-[9px] font-bold leading-[1.05]">Your next upgrade starts here.</p>
          <div className="mt-1 flex gap-1"><span className="rounded bg-primary px-1 py-0.5 text-[4px] font-bold">Shop now</span><span className="rounded border border-white/15 px-1 py-0.5 text-[4px] text-white/60">Build a PC</span></div>
          <div className="absolute -bottom-3 -right-2 h-14 w-14 rounded-full bg-primary/20 blur-xl" />
        </div>
        <div className="grid grid-cols-2 gap-1">
          {['Laptops', 'GPUs', 'Monitors', 'Deals'].map((item, index) => (
            <div key={item} className="flex flex-col justify-between rounded border border-white/10 bg-[#1b1b1b] p-1">
              <span className={`h-3 w-3 rounded ${index === 3 ? 'bg-primary/30' : 'bg-white/10'}`} />
              <span className="text-[4px] font-bold text-white/80">{item}</span>
            </div>
          ))}
        </div>
      </div>
      {home ? (
        <div className="mt-1.5 flex items-center justify-between rounded border border-white/10 bg-[#171717] p-1">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="flex items-center gap-1">
              <span className="h-5 w-5 rounded bg-white/5" />
              <div><div className="h-1 w-6 rounded bg-white/20" /><div className="mt-0.5 h-1 w-4 rounded bg-primary/50" /></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-1.5 grid grid-cols-[.42fr_1fr] gap-1.5">
          <div className="rounded border border-white/10 bg-[#171717] p-1.5">
            <div className="mb-1 h-1 w-7 rounded bg-white/20" />
            {['Brand', 'Price', 'Stock'].map((label) => <div key={label} className="mb-0.5 flex items-center gap-1 text-[4px] text-white/50"><span className="h-1.5 w-1.5 rounded-sm border border-white/25" /> {label}</div>)}
          </div>
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded border border-white/10 bg-[#1b1b1b] p-1">
                <div className="mb-0.5 h-6 rounded bg-white/5" />
                <div className="h-1 w-full rounded bg-white/20" />
                <div className="mt-0.5 h-1 w-1/2 rounded bg-primary/60" />
              </div>
            ))}
          </div>
        </div>
      )}
      <span className="sr-only">{label} mockup</span>
    </div>
  );
}

export default function PitchPage() {
  const { showToast, setPitchMode } = useStore();
  const [billing, setBilling] = useState('monthly');

  const enterPrototype = () => {
    setPitchMode(true);
    showToast('Pitch mode on. Annotations appear on key pages.', 'success');
  };

  return (
    <div className="bg-bg">
      <div className="border-b bg-surface/40">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 py-2.5">
          <p className="flex items-center gap-2 text-[10px] text-muted"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary font-display text-[9px] font-bold text-white">{agency.logoText}</span> Prepared by <strong className="text-ink">{agency.name}</strong> for TNC Tech Hub Balanga</p>
          <div className="flex items-center gap-2">
            <span className="hidden text-[9px] text-muted sm:inline">Private proposal · Jan 2026</span>
            <button type="button" onClick={() => window.print()} className="chip border-line bg-surface text-muted hover:border-primary hover:text-primary"><Printer size={11} /> Print / PDF</button>
          </div>
        </div>
      </div>

      <section id="top" className="relative overflow-hidden border-b">
        <div className="hero-mesh absolute inset-0" aria-hidden="true" />
        <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-page relative py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="chip border-primary/30 bg-primary-soft text-primary"><Sparkles size={12} /> {pitchHero.eyebrow}</span>
            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.06] tracking-tight text-ink sm:text-4xl lg:text-6xl">
              A store this good deserves a website that <span className="text-primary">works as hard as you do.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">{pitchHero.description}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              <Button to="/contact?topic=b2b">Book a call <CalendarCheck size={15} /></Button>
              <Button to="/" variant="secondary" onClick={enterPrototype}>Explore the prototype <ArrowRight size={15} /></Button>
              <Button to="/pitch#plans" variant="ghost">See plans</Button>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {pitchHero.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border bg-surface/80 p-4 backdrop-blur">
                <p className="font-display text-2xl font-bold text-primary sm:text-3xl">{stat.value}{stat.suffix}</p>
                <p className="mt-1 text-[10px] leading-4 text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sticky top-[57px] z-20 hidden border-b bg-bg/90 backdrop-blur lg:block">
        <div className="container-page flex items-center gap-5 overflow-x-auto py-2.5 text-[10px] font-semibold text-muted">
          {[['Audit', '#audit'], ['Before / after', '#compare'], ['Features', '#features'], ['Plans', '#plans'], ['SLA', '#sla'], ['Timeline', '#timeline'], ['FAQ', '#pitch-faq']].map(([label, href]) => (
            <a key={href} href={href} className="whitespace-nowrap transition hover:text-primary">{label}</a>
          ))}
          <Link to="/" className="ml-auto whitespace-nowrap text-primary hover:underline">Open live prototype →</Link>
        </div>
      </div>

      <section id="audit" className="container-page scroll-mt-24 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="eyebrow mb-2">01 · What we found</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">The current site is leaking trust.</h2>
            <p className="mt-3 text-xs leading-6 text-muted">These are not aesthetic opinions. Each item is a friction point that costs a sale or a store visit.</p>
            <div className="mt-4 rounded-xl border border-danger/25 bg-danger/10 p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-danger">Highest priority</p>
              <p className="mt-1.5 text-xs leading-5 text-muted">Remove test products, fix dead links and make the catalogue usable on a phone before adding anything new.</p>
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {findings.map((finding) => (
              <div key={finding.title} className="card p-4">
                <div className="flex items-start justify-between gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-2 text-primary"><Icon name={finding.icon} size={16} /></span>
                  <span className={`rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide ${severityStyles[finding.severity] || severityStyles.Medium}`}>{finding.severity}</span>
                </div>
                <h3 className="mt-3 text-xs font-bold text-ink">{finding.title}</h3>
                <p className="mt-1 text-[10px] leading-5 text-muted">{finding.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="compare" className="scroll-mt-24 border-y bg-surface/35 py-12 sm:py-16">
        <div className="container-page">
          <p className="eyebrow mb-2">02 · The difference</p>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Less friction. More confidence.</h2>
              <p className="mt-2 max-w-xl text-xs leading-6 text-muted">Drag each slider. The redesign is not about decoration — it is about making the next action obvious.</p>
            </div>
            <span className="rounded-full border border-primary/25 bg-primary-soft px-3 py-1 text-[9px] font-semibold text-primary">Interactive · drag to compare</span>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <BeforeAfter slide={comparisonSlides.home} initial={54} />
            <BeforeAfter slide={comparisonSlides.listing} initial={46} />
          </div>
        </div>
      </section>

      <section id="features" className="container-page scroll-mt-24 py-12 sm:py-16">
        <p className="eyebrow mb-2">03 · What we built</p>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Eight improvements, one goal: fewer reasons to leave.</h2>
            <p className="mt-2 max-w-xl text-xs leading-6 text-muted">Every feature in the prototype is live and clickable — not a static mockup.</p>
          </div>
          <Button to="/" size="sm" variant="secondary" onClick={enterPrototype}>Open prototype <ArrowUpRight size={13} /></Button>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {newFeatures.map((feature, index) => (
            <div key={feature.title} className="card p-4">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary"><Icon name={feature.icon} size={16} /></span>
                <span className="font-display text-lg font-bold text-line">0{index + 1}</span>
              </div>
              <h3 className="mt-3 text-xs font-bold text-ink">{feature.title}</h3>
              <p className="mt-1 text-[10px] leading-5 text-muted">{feature.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="plans" className="scroll-mt-24 border-y bg-surface/35 py-12 sm:py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">04 · Ongoing care</p>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Keep it fast, secure and current.</h2>
              <p className="mt-2 max-w-lg text-xs leading-6 text-muted">Optional maintenance after launch. Cancel anytime with 30 days&apos; notice.</p>
            </div>
            <div className="flex rounded-lg border bg-surface p-0.5">
              {[['monthly', 'Monthly'], ['annual', 'Annual · 2 months free']].map(([value, label]) => (
                <button key={value} type="button" onClick={() => setBilling(value)} className={`rounded-md px-3 py-1.5 text-[10px] font-bold transition ${billing === value ? 'bg-primary text-white' : 'text-muted hover:text-ink'}`}>{label}</button>
              ))}
            </div>
          </div>
          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {maintenancePlans.map((plan) => (
              <div key={plan.id} className={`relative flex h-full flex-col rounded-2xl border p-5 ${plan.featured ? 'border-primary bg-surface shadow-glow' : 'bg-surface'}`}>
                {plan.featured && <span className="absolute -top-2.5 left-5 rounded-full bg-primary px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white">Recommended</span>}
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold text-ink">{plan.name}</h3>
                  {plan.featured && <CheckCircle2 size={17} className="text-primary" />}
                </div>
                <p className="mt-1 min-h-[32px] text-[10px] leading-4 text-muted">{plan.description}</p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="font-display text-2xl font-bold text-ink">{formatPesoShort(billing === 'monthly' ? plan.price : plan.price * 10)}</span>
                  <span className="pb-1 text-[9px] text-muted">/{billing === 'monthly' ? 'month' : 'year'}</span>
                </div>
                <p className="mt-0.5 text-[9px] text-muted">{billing === 'monthly' ? 'Billed monthly' : `Save ${formatPesoShort(plan.price * 2)} vs monthly`}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[10px] leading-4 text-muted"><Check size={11} className="mt-0.5 shrink-0 text-success" /> {feature}</li>
                  ))}
                </ul>
                <Button to={`/contact?topic=b2b`} variant={plan.featured ? 'primary' : 'secondary'} size="sm" className="mt-5 w-full">Choose {plan.name}</Button>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-[9px] text-muted">Prices are prototype proposals in Philippine pesos. Final scope and VAT treatment to be confirmed.</p>
        </div>
      </section>

      <section id="sla" className="container-page scroll-mt-24 py-12 sm:py-16">
        <p className="eyebrow mb-2">05 · Service levels</p>
        <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">What “supported” actually means.</h2>
        <p className="mt-2 max-w-xl text-xs leading-6 text-muted">Response targets are measured during business hours. Outages are triaged immediately where possible.</p>
        <div className="mt-5 overflow-x-auto rounded-xl border bg-surface">
          <table className="w-full min-w-[620px] text-left">
            <thead>
              <tr className="border-b bg-surface-2/60 text-[9px] uppercase tracking-wide text-muted">
                <th scope="col" className="px-4 py-3 font-bold">Task</th>
                <th scope="col" className="px-4 py-3 font-bold">Starter</th>
                <th scope="col" className="px-4 py-3 font-bold text-primary">Growth</th>
                <th scope="col" className="px-4 py-3 font-bold">Pro</th>
              </tr>
            </thead>
            <tbody className="divide-y text-[11px]">
              {slaRows.map((row) => (
                <tr key={row.task}>
                  <th scope="row" className="px-4 py-3 font-semibold text-ink">{row.task}</th>
                  <td className="px-4 py-3 text-muted">{row.starter}</td>
                  <td className="bg-primary-soft/40 px-4 py-3 font-medium text-ink">{row.growth}</td>
                  <td className="px-4 py-3 text-muted">{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="timeline" className="scroll-mt-24 border-y bg-surface/35 py-12 sm:py-16">
        <div className="container-page">
          <p className="eyebrow mb-2">06 · Timeline</p>
          <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Seven weeks to launch. Then we keep improving.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {roadmap.map((phase, index) => (
              <div key={phase.phase} className="relative card p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary"><Icon name={phase.icon} size={16} /></span>
                <p className="mt-3 text-[9px] font-bold uppercase tracking-wide text-primary">{phase.week}</p>
                <h3 className="mt-0.5 text-xs font-bold text-ink">{phase.phase}</h3>
                <p className="mt-1 text-[10px] leading-5 text-muted">{phase.description}</p>
                {index < roadmap.length - 1 && <ChevronRight size={14} className="absolute -right-2 top-5 hidden text-line lg:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pitch-faq" className="container-page scroll-mt-24 py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
          <div>
            <p className="eyebrow mb-2">07 · Questions</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Straight answers before we start.</h2>
            <p className="mt-2 text-xs leading-6 text-muted">Anything else? We are happy to walk through the prototype on a call or in-store.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button to="/contact?topic=b2b" size="sm">Book a call <CalendarCheck size={13} /></Button>
              <a href={`mailto:${agency.email}`} className="btn btn-secondary !min-h-[34px] !text-[10px]"><Mail size={12} /> Email</a>
            </div>
          </div>
          <Accordion items={pitchFaqs} defaultOpen={0} />
        </div>
      </section>

      <section className="container-page pb-12 sm:pb-16">
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-primary-soft p-6 sm:p-8">
          <div className="hero-mesh absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow mb-2">Next step</p>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Let&apos;s make the site earn its keep.</h2>
              <p className="mt-2 max-w-md text-xs leading-6 text-muted">A 30-minute walkthrough is enough to decide whether this direction fits. No obligation.</p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Button to="/contact?topic=b2b" size="lg">Book the walkthrough <ArrowRight size={15} /></Button>
              <a href={`tel:${agency.phone.replace(/\s/g, '')}`} className="btn btn-secondary !min-h-[48px]"><Phone size={14} /> {agency.phone}</a>
            </div>
          </div>
          <div className="relative mt-5 flex flex-wrap gap-x-5 gap-y-1 border-t border-primary/20 pt-3 text-[9px] text-muted">
            <span>{agency.name} · {agency.tagline}</span>
            <span>{agency.location}</span>
            <span>{agency.email}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-1 text-[10px] font-semibold text-muted hover:text-primary"><ChevronLeft size={12} /> Back to the store prototype</Link>
          <div className="flex gap-2">
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[10px] text-muted hover:text-primary">Back to top ↑</button>
            <button type="button" onClick={() => showToast('Use your browser print dialog to save this proposal as PDF.', 'info')} className="text-[10px] text-muted hover:text-primary">Save as PDF</button>
          </div>
        </div>
      </section>
    </div>
  );
}
