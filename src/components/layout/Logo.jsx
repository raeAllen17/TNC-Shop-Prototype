import { Link } from 'react-router-dom';

export default function Logo({ compact = false, onNavigate }) {
  return (
    <Link
      to="/"
      onClick={onNavigate}
      className="group flex shrink-0 items-center gap-2.5 rounded-lg"
      aria-label="TNC Tech Hub Balanga — home"
    >
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#111] ring-1 ring-primary/40 transition group-hover:ring-primary sm:h-10 sm:w-10">
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <circle cx="32" cy="32" r="22" fill="none" stroke="#F26122" strokeWidth="2" />
          <path d="M20 41c6-1 10-5 12-11 3 6 7 9 13 10-3-12-8-20-13-20s-10 8-12 21Z" fill="#F26122" />
          <circle cx="28" cy="28" r="2.2" fill="#111" />
          <path d="M18 32h8M38 30h7" stroke="#F26122" strokeWidth="1.5" strokeLinecap="round" opacity=".8" />
        </svg>
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-[15px] font-bold tracking-tight text-ink sm:text-base">TNC Tech Hub</span>
          <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.28em] text-primary">Balanga</span>
        </span>
      )}
    </Link>
  );
}
