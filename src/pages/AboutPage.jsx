import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Heart, MapPin, ShieldCheck, Sparkles, Store, Users, Wrench } from 'lucide-react';
import { Reveal, SectionHeading } from '../components/ui/primitives';
import Button from '../components/ui/Button';

const values = [
  { icon: ShieldCheck, title: 'Honest advice', copy: 'We recommend what fits your budget and use case — not just what is on the shelf.' },
  { icon: Wrench, title: 'Built with care', copy: 'Cable management, BIOS updates and stress tests are part of every custom build.' },
  { icon: Users, title: 'Local by design', copy: 'Real people in Bataan answer your questions before and after the sale.' },
  { icon: Sparkles, title: 'Always learning', copy: 'Our team tests new hardware so we can explain the trade-offs in plain language.' },
];

const chapters = [
  { year: 'The start', title: 'A repair counter first', copy: 'TNC began by fixing the PCs students and families already owned. That repair mindset still shapes how we sell — we want your current gear to last.' },
  { year: 'The shift', title: 'From parts to full builds', copy: 'As gaming and remote work grew, customers needed more than replacements. We started assembling custom PCs and curating parts for every budget.' },
  { year: 'The growth', title: 'One store to three branches', copy: 'Balanga, Pilar and Dinalupihan let us serve more of Bataan with local stock, pickup and after-sales support.' },
  { year: 'Today', title: 'A tech hub, not just a shop', copy: 'This redesign is the next step: clearer product information, real local stock visibility, and a simpler way to buy, build and get help.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="hero-mesh absolute inset-0" aria-hidden="true" />
        <div className="container-page relative py-10 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <span className="chip border-primary/30 bg-primary-soft text-primary"><MapPin size={12} /> Balanga City, Bataan</span>
              <h1 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-5xl">
                Your tech neighbors.<br /><span className="text-primary">Not a faceless store.</span>
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-7 text-muted">
                TNC Tech Hub is where Bataan goes for honest advice, well-built PCs and after-sales support that does not disappear after checkout.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button to="/contact">Visit the store <ArrowRight size={15} /></Button>
                <Button to="/pc-builder" variant="secondary">Start a build</Button>
              </div>
            </div>
            <Reveal>
              <div className="overflow-hidden rounded-2xl border bg-surface">
                <div className="relative h-44 overflow-hidden bg-[#171717] sm:h-52">
                  <div className="hero-mesh absolute inset-0" />
                  <div className="grid-lines absolute inset-0 opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2 backdrop-blur">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white"><Store size={16} /></span>
                      <div><p className="text-[10px] font-bold text-white">TNC Tech Hub Balanga</p><p className="text-[8px] text-white/60">Calero St. · Ibayo</p></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
                  {[['3', 'Branches'], ['10+', 'Years serving Bataan'], ['1,000+', 'Builds assembled'], ['4.9', 'Customer rating']].map(([value, label]) => (
                    <div key={label} className="bg-surface p-3 text-center">
                      <p className="font-display text-lg font-bold text-primary">{value}</p>
                      <p className="mt-0.5 text-[8px] uppercase tracking-wide text-muted">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow mb-2">Our story</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">Built one upgrade at a time.</h2>
            <p className="mt-3 text-xs leading-6 text-muted">
              We are gamers, builders, students and everyday computer users. That is why we take the extra minute to explain what a part does and whether you actually need it.
            </p>
            <div className="mt-5 flex items-center gap-3 rounded-xl border bg-surface p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary"><Heart size={18} /></span>
              <p className="text-[11px] leading-5 text-muted"><strong className="text-ink">Our promise:</strong> no pressure, no jargon, no disappearing act after the sale.</p>
            </div>
          </div>
          <div className="space-y-3">
            {chapters.map((chapter, index) => (
              <Reveal key={chapter.year} delay={index * 50}>
                <div className="flex gap-4 rounded-xl border bg-surface p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-2 font-display text-xs font-bold text-primary">0{index + 1}</span>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-primary">{chapter.year}</p>
                    <h3 className="mt-0.5 text-sm font-bold text-ink">{chapter.title}</h3>
                    <p className="mt-1 text-[11px] leading-5 text-muted">{chapter.copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-surface/35 py-10 sm:py-14">
        <div className="container-page">
          <SectionHeading eyebrow="What we stand for" title="The boring things done right." description="Good tech retail is less about hype and more about consistency." />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const ValueIcon = value.icon;
              return (
                <Reveal key={value.title} delay={index * 50}>
                  <div className="card h-full p-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary"><ValueIcon size={18} /></span>
                    <h3 className="mt-4 text-sm font-bold text-ink">{value.title}</h3>
                    <p className="mt-1.5 text-[11px] leading-5 text-muted">{value.copy}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <div className="grid gap-6 rounded-2xl border bg-surface p-5 sm:p-7 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <p className="eyebrow mb-2">Visit us</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink">See the builds in person.</h2>
            <p className="mt-2 max-w-md text-xs leading-6 text-muted">Photos are helpful, but nothing beats hearing a mechanical keyboard or seeing a monitor in person. Drop by during store hours.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button to="/contact">Store details <ArrowRight size={14} /></Button>
              <Button to="/faq" variant="secondary">Common questions</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[['Daily', '10:00–6:30'], ['Balanga', 'Main branch'], ['Pilar', 'Branch'], ['Dinalupihan', 'Branch']].map(([label, value]) => (
              <div key={label} className="rounded-xl bg-surface-2 p-3">
                <p className="text-[9px] uppercase tracking-wide text-muted">{label}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-ink"><MapPin size={11} className="text-primary" /> {value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-page pb-12">
        <div className="flex flex-col items-center justify-between gap-3 border-t pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] text-muted">Looking for parts and prices? <Link to="/shop" className="font-semibold text-primary hover:underline">Browse the shop</Link> or <Link to="/pc-builder" className="font-semibold text-primary hover:underline">start a build</Link>.</p>
          <div className="flex items-center gap-3 text-[10px] text-muted"><Cpu size={14} className="text-primary" /> Prototype content for client review</div>
        </div>
      </div>
    </>
  );
}
