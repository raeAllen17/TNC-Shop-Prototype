import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock3, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Send, Youtube } from 'lucide-react';
import Logo from './Logo';
import { useStore } from '../../context/StoreContext';
import { footerLinks } from '../../data/navigation';
import { formatPeso } from '../../lib/format';

const socials = [
  { label: 'Facebook', icon: Facebook },
  { label: 'Instagram', icon: Instagram },
  { label: 'YouTube', icon: Youtube },
  { label: 'Messenger', icon: MessageCircle },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useStore();

  const subscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    showToast(`Thanks! ${email.trim()} is on the list. Newsletter launching soon.`, 'success', 4200);
    setEmail('');
  };

  return (
    <footer className="mt-16 border-t bg-surface/40">
      <div className="container-page py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_.75fr_.75fr_.75fr_1.25fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-xs leading-6 text-muted">
              Bataan&apos;s home for computer hardware, custom gaming builds and trusted repair services since day one.
            </p>
            <div className="mt-5 space-y-3 text-xs">
              <p className="flex items-start gap-2.5 text-muted">
                <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                <span>Calero St., Ibayo, Balanga City, Bataan<br /><span className="text-[10px] text-muted">Near SM City Balanga & Iglesia ni Cristo</span></span>
              </p>
              <p className="flex items-center gap-2.5 text-muted">
                <Clock3 size={15} className="shrink-0 text-primary" /> Open daily · 10:00 AM–6:30 PM
              </p>
              <a href="tel:+63472200000" className="flex items-center gap-2.5 text-muted transition hover:text-primary">
                <Phone size={15} className="shrink-0 text-primary" /> (047) 220-0000
              </a>
              <a href="mailto:hello@tnctechhub.ph" className="flex items-center gap-2.5 text-muted transition hover:text-primary">
                <Mail size={15} className="shrink-0 text-primary" /> hello@tnctechhub.ph
              </a>
            </div>
            <div className="mt-5">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">We accept</p>
              <div className="flex flex-wrap gap-1.5">
                {['Cash', 'Visa', 'Mastercard', 'Home Credit'].map((payment) => (
                  <span key={payment} className="rounded-md border bg-surface px-2 py-1 text-[9px] font-bold text-muted">{payment}</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">Shop</h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map(([label, to]) => (
                <li key={label}><Link to={to} className="text-xs text-muted transition hover:text-primary">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map(([label, to]) => (
                <li key={label}><Link to={to} className="text-xs text-muted transition hover:text-primary">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">Support</h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map(([label, to]) => (
                <li key={label}><Link to={to} className="text-xs text-muted transition hover:text-primary">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-display text-base font-bold text-ink">Gear up in your inbox.</h3>
            <p className="mb-3 text-xs leading-5 text-muted">Build ideas, local promos and restock alerts. No spam.</p>
            <form onSubmit={subscribe} className="flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@email.com"
                className="input !min-h-[40px] flex-1 !px-3 !text-xs"
              />
              <button type="submit" className="flex h-[40px] w-[42px] shrink-0 items-center justify-center rounded-lg bg-primary text-white transition hover:bg-primary-hover" aria-label="Subscribe to newsletter">
                <Send size={16} />
              </button>
            </form>
            <p className="mt-3 text-[10px] leading-4 text-muted">Free local delivery on orders over {formatPeso(15000)} within Balanga.</p>

            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ label, icon: SocialIcon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => showToast(`${label} page is coming soon.`, 'info')}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border bg-surface text-muted transition hover:border-primary hover:text-primary"
                  aria-label={`${label} — coming soon`}
                >
                  <SocialIcon size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="container-page flex flex-col gap-2 py-4 text-[10px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TNC Tech Hub Balanga. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="transition hover:text-primary">Privacy</Link>
            <Link to="/terms" className="transition hover:text-primary">Terms</Link>
            <Link to="/pitch" className="transition hover:text-primary">Design concept</Link>
            <span>Made for Bataan gamers & builders.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
