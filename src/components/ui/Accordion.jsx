import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items, defaultOpen = 0, className = '' }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`divide-y divide-line rounded-2xl border bg-surface ${className}`}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q || item.title || index}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-surface-2/60"
            >
              <span className="text-sm font-semibold text-ink">{item.q || item.title}</span>
              <ChevronDown
                size={17}
                className={`shrink-0 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''}`}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-4 text-sm leading-7 text-muted">{item.a || item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
