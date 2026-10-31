import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Facebook, Link2, MessageCircle } from 'lucide-react';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import ProductCard from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { blogPosts, products } from '../data/products';

const recommended = {
  'budget-gaming-pc-2026': ['amd-ryzen-5-5600', 'gigabyte-b550m-k', 'gigabyte-rtx-5060-eagle-oc-8gb'],
  'hydrate-your-laptop': ['deepcool-z3-thermal-paste', 'deepcool-ak400-digital'],
  'home-credit-guide': ['asus-tuf-gaming-a15-ryzen-5-7535hs-rtx-4050', 'tnc-starter-gaming-pc-ryzen-5-5600-rtx-3050'],
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const { showToast } = useStore();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="container-page py-16 text-center">
        <p className="eyebrow mb-2">404 · Article</p>
        <h1 className="font-display text-3xl font-bold text-ink">That article is not on the shelf.</h1>
        <p className="mt-2 text-sm text-muted">It may have been moved or renamed.</p>
        <Button to="/blog" className="mt-5">Back to the blog</Button>
      </div>
    );
  }

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const picks = (recommended[post.slug] || []).map((id) => products.find((product) => product.id === id)).filter(Boolean);
  const shareText = `Read "${post.title}" from TNC Tech Hub Balanga`;

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, text: shareText, url });
      } catch {
        /* user dismissed */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast('Article link copied.', 'success');
    } catch {
      showToast('Copy the URL from your address bar to share.', 'info');
    }
  };

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-muted hover:text-primary"><ArrowLeft size={13} /> All articles</Link>

        <div className="mt-5">
          <span className="chip border-primary/30 bg-primary-soft text-primary">{post.category}</span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-[1.12] tracking-tight text-ink sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm leading-6 text-muted">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-y py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-soft font-display text-[10px] font-bold text-primary">TNC</span>
              <div>
                <p className="text-[11px] font-bold text-ink">TNC Build Team</p>
                <p className="flex items-center gap-2 text-[9px] text-muted"><span className="flex items-center gap-1"><CalendarDays size={9} /> {post.date}</span><span className="flex items-center gap-1"><Clock3 size={9} /> {post.readTime}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={share} className="flex h-8 w-8 items-center justify-center rounded-lg border text-muted hover:border-primary hover:text-primary" aria-label="Copy article link"><Link2 size={13} /></button>
              <button type="button" onClick={() => showToast('Facebook sharing is coming soon.', 'info')} className="flex h-8 w-8 items-center justify-center rounded-lg border text-muted hover:border-primary hover:text-primary" aria-label="Share on Facebook"><Facebook size={13} /></button>
              <button type="button" onClick={() => showToast('Messenger sharing is coming soon.', 'info')} className="flex h-8 w-8 items-center justify-center rounded-lg border text-muted hover:border-primary hover:text-primary" aria-label="Share on Messenger"><MessageCircle size={13} /></button>
            </div>
          </div>
        </div>

        <div className="relative my-6 flex h-44 items-center justify-center overflow-hidden rounded-2xl border bg-[#161616] sm:h-56">
          <div className="hero-mesh absolute inset-0" />
          <div className="grid-lines absolute inset-0 opacity-70" />
          <span className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary"><Icon name={post.icon} size={36} /></span>
        </div>

        <article className="space-y-4">
          {post.body.map((paragraph, index) => (
            <div key={paragraph}>
              <p className={index === 0 ? 'text-sm leading-7 text-ink/90 first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:leading-[.9] first-letter:text-primary' : 'text-sm leading-7 text-muted'}>
                {paragraph}
              </p>
              {index === 1 && (
                <div className="my-5 rounded-xl border border-primary/25 bg-primary-soft p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">From the workbench</p>
                  <p className="mt-1 text-xs leading-6 text-ink">Need help with the actual build? Our Balanga technicians assemble, cable-manage and stress-test PCs in-store. <Link to="/pc-builder" className="font-bold text-primary hover:underline">Start with the PC Builder →</Link></p>
                </div>
              )}
            </div>
          ))}
        </article>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-surface-2 p-4">
          <p className="text-[10px] text-muted">Written by the TNC Tech Hub Balanga team.</p>
          <div className="flex gap-2">
            <Button to="/contact" size="sm" variant="secondary">Ask a question</Button>
            <Button to="/shop" size="sm">Shop parts <ArrowRight size={13} /></Button>
          </div>
        </div>
      </div>

      {picks.length > 0 && (
        <section className="mx-auto mt-10 max-w-5xl">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="font-display text-xl font-bold text-ink">Parts mentioned or recommended</h2>
            <Link to="/shop" className="text-[10px] font-bold text-primary hover:underline">See all →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {picks.map((product, index) => <ProductCard key={product.id} product={product} index={index} compact />)}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mx-auto mt-10 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-ink">Keep reading</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link key={item.slug} to={`/blog/${item.slug}`} className="group card flex items-start gap-3 p-4 transition hover:border-primary/40">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary"><Icon name={item.icon} size={18} /></span>
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wide text-primary">{item.category}</p>
                  <h3 className="mt-0.5 text-xs font-bold leading-5 text-ink group-hover:text-primary">{item.title}</h3>
                  <p className="mt-1 text-[9px] text-muted">{item.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
