import Icon from './Icon';
import { getSubcategory } from '../data/products';

const palettes = [
  ['#17100d', '#0c0c0c'],
  ['#0e1417', '#0b0b0b'],
  ['#15110f', '#0a0a0a'],
  ['#101416', '#0b0c0d'],
];

export default function ProductVisual({ product, variant = 0, className = '', showMeta = true }) {
  const sub = getSubcategory(product.category, product.sub);
  const iconName = sub?.icon || 'Cpu';
  const palette = palettes[(product.name.length + variant) % palettes.length];
  const angle = 18 + ((product.name.length + variant * 13) % 24);

  return (
    <div
      className={`relative overflow-hidden bg-[#0c0c0c] ${className}`}
      style={{ background: `linear-gradient(${angle + 120}deg, ${palette[0]}, ${palette[1]} 68%)` }}
      role="img"
      aria-label={`${product.brand} ${product.name} product illustration`}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-12 h-52 w-52 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(242,97,34,0.18)' }}
      />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(130deg, black, transparent 72%)',
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
        <line x1="0" y1="78%" x2="36%" y2="78%" stroke="#F26122" strokeOpacity="0.35" strokeWidth="1" />
        <line x1="64%" y1="22%" x2="100%" y2="22%" stroke="#F26122" strokeOpacity="0.25" strokeWidth="1" />
        <circle cx="93%" cy="22%" r="2.5" fill="#F26122" fillOpacity="0.85" />
        <circle cx="7%" cy="78%" r="2" fill="#F26122" fillOpacity="0.5" />
        <path d="M0 94% L10% 94% L10% 88% L18% 88%" stroke="#F26122" strokeOpacity="0.24" fill="none" />
      </svg>

      <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">{product.brand}</span>
        <span className="h-1 w-1 rounded-full bg-primary/70" />
        <span className="text-[9px] uppercase tracking-[0.16em] text-white/30">{sub?.name}</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex h-[52%] w-[52%] max-h-40 max-w-40 items-center justify-center">
          <span className="absolute inset-0 rounded-full border border-primary/20" />
          <span
            className="absolute rounded-full border border-dashed border-white/10"
            style={{ inset: variant % 2 === 0 ? '10%' : '-4%', transform: `rotate(${angle}deg)` }}
          />
          <span className="absolute inset-[22%] rounded-2xl bg-primary/10 blur-md" />
          <Icon
            name={iconName}
            size={54}
            strokeWidth={1.1}
            className="relative z-10 text-primary drop-shadow-[0_0_18px_rgba(242,97,34,0.35)] sm:scale-110"
          />
        </div>
      </div>

      {showMeta && (
        <div className="absolute inset-x-4 bottom-3 z-10 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="line-clamp-1 text-[11px] font-semibold leading-4 text-white/70">
              {product.name.replace(`${product.brand} `, '')}
            </p>
            <p className="mt-0.5 text-[8px] uppercase tracking-[0.18em] text-white/25">TNC Tech Hub Balanga</p>
          </div>
          <div className="flex shrink-0 items-end gap-[2px]" aria-hidden="true">
            {[6, 10, 4, 12, 8, 5, 11].map((height, index) => (
              <span key={index} className="w-[2px] rounded-sm bg-white/20" style={{ height }} />
            ))}
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.06]" />
    </div>
  );
}
