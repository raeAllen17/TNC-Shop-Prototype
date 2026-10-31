import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { formatPeso } from '../../lib/format';

export function Badge({ children, variant = 'neutral', dot = false, className = '' }) {
  const styles = {
    neutral: 'border-line bg-surface-2 text-muted',
    primary: 'border-primary/30 bg-primary-soft text-primary',
    success: 'border-success/30 bg-success/10 text-success',
    warning: 'border-warning/30 bg-warning/10 text-warning',
    danger: 'border-red-500/30 bg-red-500/10 text-red-400',
  };
  return (
    <span className={`chip ${styles[variant] || styles.neutral} ${className}`}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

export function SectionHeading({ eyebrow, title, description, action, className = '' }) {
  return (
    <div className={`mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
        {description && <p className="mt-2 text-sm leading-6 text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Price({ value, oldValue, size = 'md', className = '' }) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-4xl',
  };
  return (
    <div className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 ${className}`}>
      <span className={`font-display font-bold tracking-tight text-ink ${sizes[size]}`}>{formatPeso(value)}</span>
      {oldValue && oldValue > value && (
        <span className="text-xs text-muted line-through">{formatPeso(oldValue)}</span>
      )}
    </div>
  );
}

export function StarRating({ rating = 4.5, reviews = 0, className = '' }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-label={`Rated ${rating} out of 5${reviews ? ` from ${reviews} reviews` : ''}`}>
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            className={star <= Math.round(rating) ? 'fill-primary text-primary' : 'text-line'}
          />
        ))}
      </span>
      <span className="text-[11px] font-semibold text-muted">
        {rating.toFixed(1)}{reviews ? ` (${reviews})` : ''}
      </span>
    </div>
  );
}

export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          observer.unobserve(node);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

export function Counter({ value, suffix = '', className = '' }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(value);
      return undefined;
    }
    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const duration = 1100;
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(Math.round(value * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        run();
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  );
}

export function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}

export function ProductCardSkeleton() {
  return (
    <div className="card overflow-hidden p-3">
      <Skeleton className="mb-3 aspect-[4/3] w-full" />
      <Skeleton className="mb-2 h-2.5 w-16" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-2/3" />
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, description, action, titleAs: Title = 'h3', className = '' }) {
  return (
    <div className={`card flex flex-col items-center justify-center px-6 py-16 text-center ${className}`}>
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary">
        {Icon && <Icon size={26} strokeWidth={1.7} />}
      </div>
      <Title className="font-display text-lg font-bold text-ink">{title}</Title>
      {description && <p className="mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Divider({ className = '' }) {
  return <div className={`h-px w-full bg-line ${className}`} />;
}
