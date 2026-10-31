import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, CalendarDays, CheckCircle2, ClipboardCheck, CreditCard, FileCheck2, ShieldCheck, Store, WalletCards } from 'lucide-react';
import InstallmentCalculator from '../components/InstallmentCalculator';
import ProductCard from '../components/ProductCard';
import { Reveal, SectionHeading } from '../components/ui/primitives';
import Button from '../components/ui/Button';
import { products } from '../data/products';

const sampleIds = [
  'tnc-starter-gaming-pc-ryzen-5-5600-rtx-3050',
  'asus-tuf-gaming-a15-ryzen-5-7535hs-rtx-4050',
  'tnc-esports-pc-i5-12400f-rtx-4060',
];
const sampleBuilds = sampleIds.map((id) => products.find((product) => product.id === id)).filter(Boolean).slice(0, 3);

const steps = [
  { icon: CalendarDays, title: 'Estimate online', copy: 'Use the calculator to find a monthly amount that fits your budget.' },
  { icon: Store, title: 'Visit a branch', copy: 'Bring your IDs and proof of income. Our team prepares the application.' },
  { icon: FileCheck2, title: 'Get approved', copy: 'Home Credit reviews your documents and issues the official offer.' },
  { icon: CheckCircle2, title: 'Take it home', copy: 'Pay the down payment and collect your new gear the same day.' },
];

const requirements = [
  'Two valid government-issued IDs',
  'Proof of income or employment',
  'Active mobile number and email',
  'Down payment from 10%',
  'Co-borrower may be required for students',
];

export default function HomeCreditPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="hero-mesh absolute inset-0" aria-hidden="true" />
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="container-page relative py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[1fr_430px] lg:items-center">
            <div>
              <span className="chip border-primary/30 bg-primary-soft text-primary"><WalletCards size={13} /> Home Credit accepted</span>
              <h1 className="mt-4 max-w-xl font-display text-3xl font-bold leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Upgrade now.<br /><span className="text-primary">Pay comfortably.</span>
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-7 text-muted">
                Spread the cost of a laptop, GPU or complete gaming PC over 6 to 24 months. Estimate your plan online, then apply in-store with our team.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold text-muted">
                <span className="flex items-center gap-1.5"><BadgeCheck size={14} className="text-success" /> Down payment from 10%</span>
                <span className="flex items-center gap-1.5"><BadgeCheck size={14} className="text-success" /> Plans up to 24 months</span>
                <span className="flex items-center gap-1.5"><BadgeCheck size={14} className="text-success" /> Same-day approval possible</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button to="/contact?topic=home-credit">Book a credit consultation <ArrowRight size={15} /></Button>
                <Button to="/shop?category=computers&sub=gaming-pc" variant="secondary">Shop pre-built PCs</Button>
              </div>
            </div>
            <Reveal><InstallmentCalculator price={46900} editable title="Estimate your monthly plan" /></Reveal>
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <SectionHeading eyebrow="Simple process" title="Four steps, no guesswork." description="Everything happens with a real person at a TNC Tech Hub branch." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <Reveal key={step.title} delay={index * 50}>
                <div className="card h-full p-4">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary"><StepIcon size={18} /></span>
                    <span className="font-display text-2xl font-bold text-line">0{index + 1}</span>
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-ink">{step.title}</h3>
                  <p className="mt-1.5 text-[11px] leading-5 text-muted">{step.copy}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y bg-surface/35 py-10 sm:py-14">
        <div className="container-page grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
          <div className="card p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={18} className="text-primary" />
              <h2 className="font-display text-xl font-bold text-ink">What to bring</h2>
            </div>
            <p className="mt-2 text-xs leading-6 text-muted">Requirements can vary by lender and promo. Bringing these to the branch makes the process faster.</p>
            <ul className="mt-4 space-y-2.5">
              {requirements.map((requirement) => (
                <li key={requirement} className="flex items-start gap-2.5 text-xs text-muted">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10 text-success"><CheckCircle2 size={12} /></span>
                  {requirement}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg bg-surface-2 p-3 text-[10px] leading-4 text-muted">
              <strong className="text-ink">Students:</strong> a parent or guardian can apply as co-borrower. Requirements remain subject to Home Credit approval.
            </p>
          </div>

          <div className="card p-5 sm:p-6">
            <h2 className="font-display text-xl font-bold text-ink">Plan durations</h2>
            <p className="mt-1.5 text-xs text-muted">Longer plans lower the monthly amount, but may increase total interest.</p>
            <div className="mt-4 space-y-2">
              {[6, 9, 12, 18, 24].map((months) => (
                <div key={months} className="flex items-center justify-between rounded-lg border bg-surface-2 px-3 py-2.5">
                  <span className="flex items-center gap-2 text-xs font-semibold text-ink"><CalendarDays size={13} className="text-primary" /> {months} months</span>
                  <span className="text-[10px] text-muted">{months <= 9 ? 'Faster payoff' : months <= 12 ? 'Most popular' : 'Lowest monthly'}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-warning/25 bg-warning/10 p-3 text-[10px] leading-4 text-warning">
              <ShieldCheck size={14} className="mt-0.5 shrink-0" />
              Estimates do not include interest or fees. Final monthly payment is confirmed by Home Credit after approval.
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <SectionHeading
          eyebrow="Popular with Home Credit"
          title="Upgrades people are financing."
          action={<Link to="/shop?category=computers" className="text-xs font-bold text-primary hover:underline">Browse computers →</Link>}
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {sampleBuilds.map((product, index) => <ProductCard key={product.id} product={product} index={index} compact />)}
        </div>
      </section>

      <section className="container-page pb-12 sm:pb-16">
        <div className="relative overflow-hidden rounded-2xl border border-primary/25 bg-primary-soft p-5 sm:p-7">
          <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Need a hand?</p>
              <h2 className="mt-1 font-display text-xl font-bold text-ink">Let&apos;s find a plan that fits.</h2>
              <p className="mt-1 text-xs text-muted">Talk to our Balanga team — no pressure, no online commitment.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button to="/contact?topic=home-credit">Book a call <ArrowRight size={14} /></Button>
              <Button to="/faq" variant="secondary">Home Credit FAQ</Button>
            </div>
          </div>
          <CreditCard size={110} className="pointer-events-none absolute -right-4 -top-6 text-primary/10" />
        </div>
      </section>
    </>
  );
}
