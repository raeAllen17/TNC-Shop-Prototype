import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle, MessageCircle, Phone, Search, Store } from 'lucide-react';
import Accordion from '../components/ui/Accordion';
import Tabs from '../components/ui/Tabs';
import { EmptyState } from '../components/ui/primitives';
import Button from '../components/ui/Button';

const faqs = [
  { category: 'Orders', q: 'Do I need an account to place an order?', a: 'No. Guest checkout works end-to-end. An account is optional and, when live, will keep your wishlist and order history across devices.' },
  { category: 'Orders', q: 'How do I know if an item is in stock?', a: 'Each product page shows the stock status for your selected branch. “In Stock” items are usually ready the same day. “Order Basis” items are sourced in 2–5 business days and our team will confirm before charging.' },
  { category: 'Orders', q: 'Can I reserve an item for pickup?', a: 'Yes. Place a guest order and choose store pickup. We hold reserved stock for 24 hours while we confirm your order by phone or email.' },
  { category: 'Orders', q: 'Do you deliver outside Balanga?', a: 'We deliver across Bataan. Local delivery within Balanga is free for orders over ₱15,000; nearby municipalities may have a small delivery fee confirmed by our team.' },
  { category: 'Orders', q: 'How do I track my order?', a: 'Go to Track Order and enter the order number from your confirmation. You can also use the demo order to see how the status timeline works.' },
  { category: 'Warranty', q: 'What warranty do components come with?', a: 'Most components carry a 1–3 year manufacturer warranty, with local RMA support from our Balanga team. Pre-built PCs include a 2-year parts and labor warranty.' },
  { category: 'Warranty', q: 'Do you accept returns?', a: 'Unopened items can be returned within 7 days with a receipt, subject to inspection. Defective items are covered by the manufacturer warranty. Change-of-mind returns may incur a restocking fee.' },
  { category: 'Warranty', q: 'Who handles warranty claims?', a: 'We do. Bring the item and receipt to any TNC Tech Hub branch. Our team coordinates with the distributor and keeps you updated on the timeline.' },
  { category: 'Repairs', q: 'How much is a diagnostic fee?', a: 'Walk-in diagnostics are free. If we cannot fix the issue, you pay nothing. Repair quotes are always approved by you before work begins.' },
  { category: 'Repairs', q: 'How long do repairs take?', a: 'OS installation and cleaning are usually same-day or 1–2 days. Hardware repairs depend on parts availability; we will give you an estimate before starting.' },
  { category: 'Repairs', q: 'Will I lose my data during repair?', a: 'Not intentionally. We recommend backing up first, and offer data backup and migration. Routine OS reinstalls may require a backup unless you request data preservation.' },
  { category: 'Repairs', q: 'Do you repair laptops bought elsewhere?', a: 'Yes, subject to parts availability and inspection. Bring the unit and charger to the Balanga branch for a free initial assessment.' },
  { category: 'Home Credit', q: 'What is the minimum down payment?', a: 'Home Credit plans start at 10% down payment. The exact amount, interest, and fees depend on the lender’s approval and current promos.' },
  { category: 'Home Credit', q: 'What do I need to apply?', a: 'Bring two valid government IDs and proof of income or employment. Students may apply with a co-borrower. Our staff will guide you through the in-store application.' },
  { category: 'Home Credit', q: 'Are online estimates guaranteed?', a: 'No. Our calculator provides an estimate only. The official offer is issued by Home Credit after document verification and in-store approval.' },
  { category: 'Account', q: 'Is my wishlist saved without an account?', a: 'Yes. Cart, wishlist, theme and branch are saved in this browser using localStorage. They stay on this device until you clear site data.' },
  { category: 'Account', q: 'When will accounts launch?', a: 'Account login is intentionally stubbed in this prototype. The live site can launch with guest checkout only, then add accounts in a later phase.' },
];

const tabs = ['All', 'Orders', 'Warranty', 'Repairs', 'Home Credit', 'Account'].map((label) => ({ label, id: label }));

export default function FAQPage() {
  const [tab, setTab] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((faq) => {
      const matchesTab = tab === 'All' || faq.category === tab;
      const matchesQuery = !q || `${faq.q} ${faq.a}`.toLowerCase().includes(q);
      return matchesTab && matchesQuery;
    });
  }, [tab, query]);

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary"><HelpCircle size={24} /></span>
        <p className="eyebrow mb-2">Here to help</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Frequently asked questions</h1>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">
          Straight answers about orders, warranty, repairs and Home Credit. Still stuck? Our Balanga team is a message away.
        </p>
        <div className="relative mx-auto mt-6 max-w-md">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="input pl-10"
            placeholder="Search the FAQ…"
            aria-label="Search frequently asked questions"
          />
        </div>
      </div>

      <div className="mx-auto mt-7 max-w-4xl">
        <Tabs tabs={tabs} onChange={(next) => setTab(next.id)} />
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_260px]">
          <div>
            {filtered.length > 0 ? (
              <>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted">{filtered.length} answer{filtered.length === 1 ? '' : 's'}</p>
                <Accordion key={`${tab}-${query}`} items={filtered} defaultOpen={0} />
              </>
            ) : (
              <EmptyState
                icon={Search}
                title="No matching answers"
                description="Try a different phrase or browse another category. You can also message our team directly."
                action={<Button onClick={() => { setQuery(''); setTab('All'); }}>Reset search</Button>}
              />
            )}
          </div>

          <aside className="space-y-3">
            <div className="card p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary"><MessageCircle size={17} /></span>
              <h2 className="mt-3 font-display text-sm font-bold text-ink">Still have a question?</h2>
              <p className="mt-1 text-[11px] leading-5 text-muted">Message our team or drop by the store. We answer during store hours and aim to reply within the day.</p>
              <Button to="/contact" size="sm" className="mt-3 w-full">Contact us <ArrowRight size={13} /></Button>
            </div>
            <div className="card p-4">
              <p className="flex items-center gap-2 text-[11px] font-bold text-ink"><Store size={14} className="text-primary" /> Balanga Main</p>
              <p className="mt-1.5 text-[10px] leading-5 text-muted">Calero St., Ibayo, Balanga City<br />Daily · 10:00 AM–6:30 PM</p>
              <a href="tel:+63472200000" className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-primary hover:underline"><Phone size={11} /> (047) 220-0000</a>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary-soft p-4">
              <p className="text-[10px] leading-5 text-muted"><strong className="text-ink">Buying on installment?</strong> Bring 2 valid IDs and proof of income. Our <Link to="/home-credit" className="font-semibold text-primary hover:underline">Home Credit page</Link> has the checklist.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
