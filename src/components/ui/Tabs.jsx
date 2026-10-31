import { useRef, useState } from 'react';

export default function Tabs({ tabs, defaultIndex = 0, onChange, className = '' }) {
  const [active, setActive] = useState(defaultIndex);
  const refs = useRef([]);

  const select = (index) => {
    setActive(index);
    onChange?.(tabs[index]);
  };

  const handleKey = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    select(next);
    refs.current[next]?.focus();
  };

  return (
    <div className={className}>
      <div role="tablist" className="flex gap-1 overflow-x-auto rounded-xl border bg-surface-2 p-1 no-scrollbar">
        {tabs.map((tab, index) => (
          <button
            key={tab.id || tab.label}
            ref={(node) => { refs.current[index] = node; }}
            type="button"
            role="tab"
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => handleKey(event, index)}
            className={`min-h-[38px] flex-1 whitespace-nowrap rounded-lg px-3 text-xs font-bold transition ${
              active === index ? 'bg-surface text-primary shadow-sm' : 'text-muted hover:text-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs[active]?.content && <div className="mt-4">{tabs[active].content}</div>}
    </div>
  );
}
