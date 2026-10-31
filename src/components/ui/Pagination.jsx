import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ current, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = [];
  const push = (value) => {
    if (!pages.includes(value)) pages.push(value);
  };
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i += 1) push(i);
  } else {
    push(1);
    if (current > 3) push('start-ellipsis');
    for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i += 1) push(i);
    if (current < totalPages - 2) push('end-ellipsis');
    push(totalPages);
  }

  return (
    <nav className="flex flex-wrap items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border bg-surface text-muted transition hover:border-primary hover:text-primary disabled:opacity-35"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((page) =>
        typeof page === 'string' ? (
          <span key={page} className="flex h-9 w-7 items-center justify-center text-xs text-muted">…</span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onChange(page)}
            aria-current={current === page ? 'page' : undefined}
            aria-label={`Page ${page}`}
            className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-xs font-bold transition ${
              current === page
                ? 'border-primary bg-primary text-white'
                : 'border-line bg-surface text-muted hover:border-primary hover:text-primary'
            }`}
          >
            {page}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onChange(current + 1)}
        disabled={current === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border bg-surface text-muted transition hover:border-primary hover:text-primary disabled:opacity-35"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
