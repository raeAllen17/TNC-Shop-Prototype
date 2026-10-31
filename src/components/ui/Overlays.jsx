import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

function useLockBody(open) {
  useEffect(() => {
    if (!open) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);
}

function CloseButton({ onClose }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink"
      aria-label="Close dialog"
    >
      <X size={18} />
    </button>
  );
}

export function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  useLockBody(open);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    const timer = window.setTimeout(() => {
      const focusable = panelRef.current?.querySelector('button, [href], input, select, textarea');
      focusable?.focus();
    }, 20);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  if (!open) return null;
  const widths = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return createPortal(
    <div className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close dialog backdrop"
        tabIndex={-1}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative max-h-[92vh] w-full overflow-y-auto rounded-t-2xl border bg-surface shadow-float sm:rounded-2xl ${widths[size] || widths.md} animate-bounceIn`}
      >
        <div className="flex items-start justify-between gap-4 border-b p-5">
          <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
          <CloseButton onClose={onClose} />
        </div>
        <div className="p-5">{children}</div>
        {footer && <div className="border-t p-5">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}

export function Drawer({ open, onClose, title, children, footer, side = 'right', width = 'max-w-md' }) {
  useLockBody(open);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    const timer = window.setTimeout(() => {
      panelRef.current?.querySelector('button, [href], input')?.focus();
    }, 40);
    return () => {
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  const position = side === 'left' ? 'left-0' : 'right-0';
  const border = side === 'left' ? 'sm:border-r' : 'sm:border-l';

  return createPortal(
    <div className={`fixed inset-0 z-[95] ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        role="presentation"
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute inset-y-0 ${position} flex w-full ${width} flex-col border-line bg-surface shadow-float transition-transform duration-300 ${border} ${open ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between gap-4 border-b p-5">
          <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
          <CloseButton onClose={onClose} />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer && <div className="border-t p-5">{footer}</div>}
      </aside>
    </div>,
    document.body,
  );
}

export function ToastHost() {
  const { toasts, dismissToast } = useStore();
  const icons = { success: CheckCircle2, error: AlertCircle, info: Info };
  return createPortal(
    <div className="pointer-events-none fixed inset-x-4 bottom-[82px] z-[120] flex flex-col items-center gap-2 md:bottom-6 md:left-auto md:right-6 md:items-end">
      {toasts.map((toast) => {
        const ToastIcon = icons[toast.type] || Info;
        return (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border bg-surface/95 p-3.5 shadow-float backdrop-blur-xl animate-bounceIn"
          >
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toast.type === 'error' ? 'bg-red-500/10 text-red-400' : toast.type === 'info' ? 'bg-primary-soft text-primary' : 'bg-success/10 text-success'}`}>
              <ToastIcon size={17} />
            </span>
            <p className="flex-1 text-sm font-medium text-ink">{toast.message}</p>
            <button type="button" onClick={() => dismissToast(toast.id)} className="text-muted hover:text-ink" aria-label="Dismiss notification">
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>,
    document.body,
  );
}
