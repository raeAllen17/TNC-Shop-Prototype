import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { overlayTips } from '../../data/pitch';

const fallbackTips = {
  '/categories': [
    { n: 1, x: 50, y: 28, title: 'Clear category architecture', text: 'Seven clean groups and every item resolves to a real listing.' },
    { n: 2, x: 78, y: 58, title: 'No dead ends', text: 'Category cards, filters and brand links are all functional.' },
  ],
  '/deals': [
    { n: 1, x: 55, y: 25, title: 'Prominent deal storytelling', text: 'Countdown, savings and stock state make offers easy to act on.' },
    { n: 2, x: 25, y: 62, title: 'Real catalogue data', text: 'No test products or odd placeholder prices anywhere.' },
  ],
  '/cart': [
    { n: 1, x: 30, y: 35, title: 'Cart clarity', text: 'Line items, quantities, pickup branch and totals in one view.' },
    { n: 2, x: 73, y: 60, title: 'Clear path to checkout', text: 'One focused next step with no distracting upsells.' },
  ],
  '/checkout': [
    { n: 1, x: 30, y: 38, title: 'Guest checkout', text: 'No account required. Payment method and pickup branch are explicit.' },
    { n: 2, x: 74, y: 48, title: 'No surprise costs', text: 'Subtotal, delivery estimate and installment option are disclosed.' },
  ],
  '/wishlist': [
    { n: 1, x: 50, y: 32, title: 'Saved for later', text: 'Wishlist persists locally so a customer can return without signing in.' },
  ],
  '/home-credit': [
    { n: 1, x: 69, y: 38, title: 'Estimate before visiting', text: 'A transparent calculator reduces friction for installment buyers.' },
    { n: 2, x: 35, y: 64, title: 'Eligibility disclosure', text: 'Clear disclaimers protect both the customer and the store.' },
  ],
  '/faq': [
    { n: 1, x: 50, y: 30, title: 'Answers in one place', text: 'Accordion sections cover shipping, repairs, warranties and credit.' },
  ],
  '/contact': [
    { n: 1, x: 30, y: 36, title: 'Multiple ways to reach you', text: 'Form, phone, email, hours and a branch location block.' },
    { n: 2, x: 72, y: 52, title: 'Map-ready', text: 'A map placeholder is ready for the Google Maps embed.' },
  ],
  '/track-order': [
    { n: 1, x: 48, y: 36, title: 'Order status timeline', text: 'Customers can see exactly where their order is.' },
  ],
  '/login': [
    { n: 1, x: 50, y: 36, title: 'Low-friction accounts', text: 'Guest checkout stays available; accounts are optional.' },
  ],
  '/blog': [
    { n: 1, x: 48, y: 34, title: 'Content that earns search traffic', text: 'Build guides, maintenance advice and local buying help.' },
  ],
  '/brands': [
    { n: 1, x: 50, y: 30, title: 'Shop by brand', text: 'Every brand resolves to a real filtered catalogue.' },
  ],
  '/about': [
    { n: 1, x: 48, y: 30, title: 'Local story, told well', text: 'Balanga roots, service expertise and clear store details.' },
  ],
  '/brand': [
    { n: 1, x: 48, y: 34, title: 'Brand landing pages', text: 'Search-friendly pages that filter the real catalogue.' },
  ],
};

const getTips = (pathname) => {
  if (overlayTips[pathname]) return overlayTips[pathname];
  if (pathname.startsWith('/product/')) return overlayTips['/product'];
  if (pathname.startsWith('/brand/')) return fallbackTips['/brand'];
  if (pathname === '/search') return overlayTips['/shop'];
  return fallbackTips[pathname] || [
    { n: 1, x: 52, y: 30, title: 'Designed around the purchase', text: 'Every page keeps the next useful action visible and removes dead ends.' },
    { n: 2, x: 72, y: 58, title: 'Built to maintain', text: 'Reusable components and editable content keep future updates quick.' },
  ];
};

export default function PitchOverlay() {
  const location = useLocation();
  const { pitchMode, setPitchMode } = useStore();
  const [active, setActive] = useState(null);
  const tips = getTips(location.pathname);

  useEffect(() => setActive(null), [location.pathname]);

  if (!pitchMode) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[85]" aria-label="Pitch highlights overlay">
      <div className="pointer-events-auto absolute right-3 top-[130px] flex items-center gap-1.5 rounded-full border border-primary/30 bg-surface/95 px-3 py-1.5 text-[10px] font-bold text-primary shadow-float backdrop-blur-md md:top-[126px]">
        <Sparkles size={12} />
        {tips.length} pitch highlight{tips.length === 1 ? '' : 's'}
        <button
          type="button"
          onClick={() => setPitchMode(false)}
          className="ml-1 flex h-5 w-5 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-ink"
          aria-label="Hide pitch highlights"
        >
          <X size={12} />
        </button>
      </div>

      {tips.map((tip) => {
        const isActive = active === tip.n;
        const openLeft = tip.x > 60;
        return (
          <div key={tip.n} className="absolute" style={{ left: `${tip.x}%`, top: `${tip.y}%` }}>
            <button
              type="button"
              onClick={() => setActive(isActive ? null : tip.n)}
              onMouseEnter={() => setActive(tip.n)}
              className="pointer-events-auto relative flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary text-[11px] font-extrabold text-white shadow-[0_0_0_4px_rgba(242,97,34,0.25),0_8px_28px_rgba(0,0,0,0.4)] transition hover:scale-110"
              aria-label={`Pitch highlight ${tip.n}: ${tip.title}`}
              aria-expanded={isActive}
            >
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/25" />
              {tip.n}
            </button>

            {isActive && (
              <div
                className="pointer-events-auto absolute top-0 z-10 w-[240px] -translate-y-1/2 rounded-xl border border-primary/25 bg-surface p-3.5 shadow-float sm:w-[270px]"
                style={openLeft ? { right: '22px' } : { left: '22px' }}
                role="tooltip"
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-primary">Improvement {tip.n}</span>
                  <button type="button" onClick={() => setActive(null)} className="text-muted hover:text-ink" aria-label="Close tip">
                    <X size={12} />
                  </button>
                </div>
                <p className="text-xs font-bold leading-5 text-ink">{tip.title}</p>
                <p className="mt-1 text-[11px] leading-[18px] text-muted">{tip.text}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
