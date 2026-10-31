import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Scale } from 'lucide-react';
import Button from './ui/Button';

export default function LegalLayout({ eyebrow, title, updated, intro, sections }) {
  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="mb-5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted hover:text-primary"><ArrowLeft size={13} /> Back to home</Link>
        <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-start">
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-xl border bg-surface p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary"><Scale size={17} /></span>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">On this page</p>
              <nav className="mt-2 space-y-1.5" aria-label="Page sections">
                {sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} className="block text-[11px] leading-4 text-muted transition hover:text-primary">{section.title}</a>
                ))}
              </nav>
              <div className="mt-4 border-t pt-3">
                <p className="text-[9px] leading-4 text-muted">Questions about this policy?</p>
                <a href="mailto:hello@tnctechhub.ph" className="mt-1 flex items-center gap-1.5 text-[10px] font-semibold text-primary hover:underline"><Mail size={11} /> Email us</a>
              </div>
            </div>
          </aside>

          <article>
            <p className="eyebrow mb-2">{eyebrow}</p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h1>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-muted">Last updated: {updated}</p>
            <div className="mt-4 rounded-xl border border-warning/25 bg-warning/10 p-3 text-[10px] leading-5 text-warning">
              Prototype copy for review. Final wording should be checked by the client and, where required, a Philippine legal professional before launch.
            </div>
            <p className="mt-5 text-xs leading-6 text-muted">{intro}</p>

            <div className="mt-6 space-y-6">
              {sections.map((section, index) => (
                <section key={section.id} id={section.id} className="scroll-mt-24">
                  <h2 className="font-display text-lg font-bold text-ink"><span className="mr-2 text-primary">{String(index + 1).padStart(2, '0')}</span>{section.title}</h2>
                  <div className="mt-2 space-y-2.5">
                    {section.body.map((paragraph) => <p key={paragraph} className="text-xs leading-6 text-muted">{paragraph}</p>)}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-8 rounded-xl border bg-surface p-5">
              <h2 className="font-display text-lg font-bold text-ink">Need clarification?</h2>
              <p className="mt-1.5 text-xs leading-6 text-muted">Our Balanga team can walk you through these terms during store hours.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button to="/contact" size="sm">Contact us</Button>
                <Button to="/faq" size="sm" variant="secondary">Read the FAQ</Button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
