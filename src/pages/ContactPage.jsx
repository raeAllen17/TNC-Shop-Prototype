import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock3, Cpu, HardDrive, Mail, MapPin, MessageCircle, Navigation, Phone, Send, ShieldCheck, Store, Wrench } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Button from '../components/ui/Button';
import { Badge } from '../components/ui/primitives';
import { branches } from '../data/products';

const topics = [
  { value: 'general', label: 'General inquiry' },
  { value: 'order', label: 'Order or reservation' },
  { value: 'product', label: 'Product availability' },
  { value: 'home-credit', label: 'Home Credit application' },
  { value: 'repair', label: 'Repair or diagnostics' },
  { value: 'b2b', label: 'Business / bulk orders' },
];

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const { branch, setBranch, showToast } = useStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: 'general', message: '' });
  const [submitted, setSubmitted] = useState(null);

  useEffect(() => {
    const requested = searchParams.get('topic');
    if (requested && topics.some((topic) => topic.value === requested)) {
      setForm((current) => ({ ...current, topic: requested }));
    }
  }, [searchParams]);

  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    const reference = `MSG-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmitted({ reference, name: form.name.split(' ')[0] || 'there' });
    showToast('Message prepared. This prototype does not send email yet.', 'success', 4200);
    setForm({ name: '', email: '', phone: '', topic: 'general', message: '' });
  };

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="eyebrow mb-2">Talk to a human</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">We&apos;re at the store,<br />and in your inbox.</h1>
        <p className="mt-2 text-sm leading-6 text-muted">Questions about stock, builds, repairs or Home Credit? Send a message or visit any TNC Tech Hub branch in Bataan.</p>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
        <div className="card overflow-hidden">
          <div className="border-b bg-surface-2/60 px-5 py-4">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink"><MessageCircle size={18} className="text-primary" /> Send a message</h2>
            <p className="mt-1 text-[11px] text-muted">We aim to reply within one business day. For urgent concerns, call the branch.</p>
          </div>
          {submitted ? (
            <div className="p-6 text-center sm:p-10">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success"><CheckCircle2 size={28} /></span>
              <h2 className="mt-4 font-display text-xl font-bold text-ink">Salamat, {submitted.name}!</h2>
              <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-muted">
                Your message is ready for our team. In the live site it would be emailed to the branch immediately. Your reference is <strong className="text-ink">{submitted.reference}</strong>.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <Button onClick={() => setSubmitted(null)} variant="secondary" size="sm">Send another</Button>
                <Button to="/faq" size="sm">Read the FAQ <ArrowRight size={13} /></Button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-3.5 p-5 sm:grid-cols-2 sm:p-6">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Your name</label>
                <input id="contact-name" required value={form.name} onChange={(event) => setField('name', event.target.value)} className="input" placeholder="Juan Dela Cruz" autoComplete="name" />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Email</label>
                <input id="contact-email" type="email" required value={form.email} onChange={(event) => setField('email', event.target.value)} className="input" placeholder="you@email.com" autoComplete="email" />
              </div>
              <div>
                <label htmlFor="contact-phone" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Mobile <span className="font-normal normal-case">(optional)</span></label>
                <input id="contact-phone" type="tel" value={form.phone} onChange={(event) => setField('phone', event.target.value)} className="input" placeholder="09XX XXX XXXX" autoComplete="tel" />
              </div>
              <div>
                <label htmlFor="contact-topic" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Topic</label>
                <select id="contact-topic" value={form.topic} onChange={(event) => setField('topic', event.target.value)} className="input">
                  {topics.map((topic) => <option key={topic.value} value={topic.value}>{topic.label}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">How can we help?</label>
                <textarea id="contact-message" required rows={5} value={form.message} onChange={(event) => setField('message', event.target.value)} className="input min-h-[120px] resize-y py-3" placeholder="Include the product or order number if relevant…" />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[10px] leading-4 text-muted">By sending, you agree to our <Link to="/privacy" className="font-semibold text-primary hover:underline">Privacy Policy</Link>. No spam, ever.</p>
                <Button type="submit">Send message <Send size={14} /></Button>
              </div>
            </form>
          )}
        </div>

        <div className="space-y-3">
          <div className="card overflow-hidden">
            <div className="relative h-40 overflow-hidden bg-[#191919]">
              <div className="hero-mesh absolute inset-0 opacity-70" />
              <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-glow">
                  <MapPin size={22} />
                  <span className="absolute inset-0 animate-ping rounded-full border border-primary/50" />
                </span>
                <Badge variant="primary" className="mt-2">Balanga Main</Badge>
              </div>
              <span className="absolute bottom-2 left-3 rounded bg-black/50 px-1.5 py-0.5 text-[8px] uppercase tracking-wide text-white/70">Calero St. · Ibayo · Balanga</span>
            </div>
            <div className="p-4">
              <h3 className="flex items-center gap-2 text-sm font-bold text-ink"><Store size={15} className="text-primary" /> TNC Tech Hub Balanga</h3>
              <p className="mt-1.5 text-[11px] leading-5 text-muted">Calero St., Ibayo, Balanga City, Bataan<br />Near SM City Balanga & Iglesia ni Cristo.</p>
              <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-muted"><Clock3 size={13} className="text-primary" /> Daily · 10:00 AM–6:30 PM</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href="tel:+63472200000" className="btn-secondary !min-h-[34px] !px-3 !text-[10px]"><Phone size={12} /> Call branch</a>
                <a href="https://www.google.com/maps/search/?api=1&query=TNC+Tech+Hub+Balanga+Calero+Street+Ibayo" target="_blank" rel="noreferrer" className="btn-secondary !min-h-[34px] !px-3 !text-[10px]"><Navigation size={12} /> Directions</a>
              </div>
            </div>
          </div>

          <div className="card p-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Quick contacts</h3>
            <div className="mt-2 divide-y">
              <a href="mailto:hello@tnctechhub.ph" className="flex items-center gap-3 py-2.5 text-xs text-ink hover:text-primary"><Mail size={14} className="text-primary" /> hello@tnctechhub.ph</a>
              <a href="tel:+63472200000" className="flex items-center gap-3 py-2.5 text-xs text-ink hover:text-primary"><Phone size={14} className="text-primary" /> (047) 220-0000</a>
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary-soft p-4">
            <p className="flex items-center gap-2 text-xs font-bold text-ink"><Wrench size={14} className="text-primary" /> Walk-in diagnostics are free.</p>
            <p className="mt-1 text-[10px] leading-5 text-muted">Bring your unit and charger. No appointment needed during store hours.</p>
          </div>
        </div>
      </div>

      <section id="services" className="mt-10 scroll-mt-24">
        <div className="mb-3">
          <p className="eyebrow mb-1">In-store services</p>
          <h2 className="font-display text-xl font-bold text-ink">Repair, upgrade, or start fresh.</h2>
          <p className="mt-1 text-[11px] text-muted">Walk in during store hours or message us first so we can prepare the parts.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Wrench, title: 'Repair & diagnostics', copy: 'Free basic diagnostics. We quote before any work begins.' },
            { icon: Cpu, title: 'PC assembly', copy: 'Custom builds with compatibility and wattage checks.' },
            { icon: HardDrive, title: 'Upgrades & cleanup', copy: 'SSD, RAM, GPU upgrades plus OS and dust cleanup.' },
            { icon: ShieldCheck, title: 'Warranty support', copy: 'Help processing supplier warranties for parts bought here.' },
          ].map((service) => (
            <div key={service.title} className="card p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary"><service.icon size={17} /></span>
              <h3 className="mt-3 text-sm font-bold text-ink">{service.title}</h3>
              <p className="mt-1 text-[10px] leading-5 text-muted">{service.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">Our branches</h2>
            <p className="text-[11px] text-muted">Select a branch to see local stock and pickup availability.</p>
          </div>
          <Badge variant="success">{branch ? 'Branch selected' : 'No branch selected'}</Badge>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {Object.values(branches).map((item) => {
            const selected = branch === item.id;
            return (
              <div key={item.id} className={`card p-4 ${selected ? 'border-primary/60' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${selected ? 'bg-primary text-white' : 'bg-surface-2 text-primary'}`}><MapPin size={16} /></span>
                  {selected && <Badge variant="primary">My branch</Badge>}
                </div>
                <h3 className="mt-3 text-sm font-bold text-ink">{item.name}</h3>
                <p className="mt-1 text-[10px] leading-5 text-muted">{item.address}</p>
                <p className="mt-2 flex items-center gap-1.5 text-[10px] text-muted"><Clock3 size={11} /> {item.hours}</p>
                <button
                  type="button"
                  onClick={() => { setBranch(item.id); showToast(`Branch set to ${item.name}.`, 'success'); }}
                  className={`mt-3 w-full rounded-lg border py-2 text-[10px] font-bold transition ${selected ? 'border-primary/40 bg-primary-soft text-primary' : 'bg-surface-2 text-muted hover:border-primary/40 hover:text-primary'}`}
                >
                  {selected ? 'Selected branch' : 'Set as my branch'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
