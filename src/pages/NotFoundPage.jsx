import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, SearchX } from 'lucide-react';
import SearchBox from '../components/SearchBox';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="container-page flex min-h-[60vh] items-center py-12">
      <div className="mx-auto max-w-lg text-center">
        <p className="font-display text-[76px] font-bold leading-none tracking-tighter text-line sm:text-[108px]">404</p>
        <span className="mx-auto mt-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary"><SearchX size={24} /></span>
        <h1 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">This part is out of stock.</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">The page may have moved, or the link is incomplete. Let&apos;s get you back to something useful.</p>
        <div className="mx-auto mt-5 max-w-md text-left">
          <SearchBox large />
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Button to="/">Back to home <ArrowLeft size={14} /></Button>
          <Button to="/shop" variant="secondary">Browse the shop</Button>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3 text-[10px] text-muted">
          <Link to="/categories" className="hover:text-primary">Categories</Link>
          <span>·</span>
          <Link to="/pc-builder" className="hover:text-primary">PC Builder</Link>
          <span>·</span>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
          <span>·</span>
          <Link to="/faq" className="hover:text-primary">FAQ</Link>
        </div>
        <p className="mt-6 flex items-center justify-center gap-1.5 text-[9px] text-muted"><Compass size={11} /> Still lost? Our Balanga team can point you in the right direction.</p>
      </div>
    </div>
  );
}
