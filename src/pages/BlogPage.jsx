import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CalendarDays, Clock3, Search, Send } from 'lucide-react';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import { EmptyState } from '../components/ui/primitives';
import { useStore } from '../context/StoreContext';
import { blogPosts } from '../data/products';

export default function BlogPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [email, setEmail] = useState('');
  const { showToast } = useStore();

  const categories = ['All', ...new Set(blogPosts.map((post) => post.category))];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category;
      const matchesQuery = !q || `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const subscribe = (event) => {
    event.preventDefault();
    showToast(`Thanks! ${email} is on the list. Newsletter launching soon.`, 'success', 4200);
    setEmail('');
  };

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-2">Notes from the workbench</p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Build smarter.</h1>
          <p className="mt-2 max-w-lg text-sm leading-6 text-muted">Practical guides, maintenance tips and honest buying advice from the TNC Balanga team.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="input pl-9" placeholder="Search articles…" aria-label="Search articles" />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`min-h-[30px] rounded-full border px-3 text-[10px] font-semibold transition ${category === item ? 'border-primary bg-primary text-white' : 'bg-surface text-muted hover:border-primary/40 hover:text-ink'}`}
          >
            {item}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState icon={Search} title="No articles found" description="Try another keyword or category." action={<Button onClick={() => { setQuery(''); setCategory('All'); }}>Reset filters</Button>} />
        </div>
      ) : (
        <>
          {featured && (
            <Link to={`/blog/${featured.slug}`} className="group mt-6 grid overflow-hidden rounded-2xl border bg-surface transition hover:border-primary/40 md:grid-cols-2">
              <div className="relative min-h-[200px] overflow-hidden bg-[#161616] md:min-h-[280px]">
                <div className="hero-mesh absolute inset-0" />
                <div className="grid-lines absolute inset-0 opacity-70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-glow"><Icon name={featured.icon} size={36} /></span>
                </div>
                <span className="absolute left-4 top-4 rounded-full bg-primary px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white">Featured</span>
              </div>
              <div className="flex flex-col justify-center p-5 sm:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{featured.category}</p>
                <h2 className="mt-2 font-display text-xl font-bold leading-tight text-ink transition group-hover:text-primary sm:text-2xl">{featured.title}</h2>
                <p className="mt-2 text-xs leading-6 text-muted">{featured.excerpt}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] text-muted">
                  <span className="flex items-center gap-1"><CalendarDays size={11} /> {featured.date}</span>
                  <span className="flex items-center gap-1"><Clock3 size={11} /> {featured.readTime}</span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-primary">Read article <ArrowRight size={13} className="transition group-hover:translate-x-1" /></span>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {rest.map((post) => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="group card flex gap-4 p-4 transition hover:border-primary/40">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon name={post.icon} size={24} /></span>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-primary">{post.category}</p>
                    <h2 className="mt-1 text-sm font-bold leading-snug text-ink transition group-hover:text-primary">{post.title}</h2>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-muted">{post.excerpt}</p>
                    <div className="mt-2 flex items-center gap-3 text-[9px] text-muted">
                      <span>{post.date}</span><span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border bg-surface p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary"><BookOpen size={18} /></span>
          <div>
            <h2 className="font-display text-lg font-bold text-ink">One useful email a month.</h2>
            <p className="mt-0.5 text-[11px] text-muted">Build ideas, maintenance reminders and local restocks.</p>
          </div>
        </div>
        <form onSubmit={subscribe} className="flex w-full gap-2 sm:w-auto">
          <label htmlFor="blog-email" className="sr-only">Email address</label>
          <input id="blog-email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="input !min-h-[38px] w-full !text-xs sm:w-52" placeholder="you@email.com" />
          <Button type="submit" size="sm" aria-label="Subscribe"><Send size={14} /></Button>
        </form>
      </div>
    </div>
  );
}
