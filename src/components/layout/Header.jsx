import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, Clock3, Heart, LayoutGrid, MapPin, Menu, Moon, Search,
  ShoppingCart, Sparkles, Sun, User, X,
} from 'lucide-react';
import Logo from './Logo';
import SearchBox from '../SearchBox';
import CartDrawer from './CartDrawer';
import BranchModal from './BranchModal';
import { Drawer } from '../ui/Overlays';
import { useStore } from '../../context/StoreContext';
import { categories } from '../../data/products';
import { megaGroups, topNav } from '../../data/navigation';
import Icon from '../Icon';

export default function Header() {
  const location = useLocation();
  const {
    theme, toggleTheme, branch, setBranchModalOpen, wishlist, cartCount, setCartOpen, cartPulse,
  } = useStore();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const megaRef = useRef(null);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setMobileSearch(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onClick = (event) => {
      if (megaRef.current && !megaRef.current.contains(event.target)) setMegaOpen(false);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMegaOpen(false);
        setMobileSearch(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const navIsActive = (to) => {
    const path = to.split('?')[0];
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-[60] border-b glass">
        <div className="container-page">
          <div className="flex h-[58px] items-center gap-2.5 sm:h-16 lg:h-[66px] lg:gap-4">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <Logo onNavigate={() => setMobileOpen(false)} />

            <div className="hidden flex-1 justify-center px-2 lg:flex xl:px-8">
              <div className="w-full max-w-[500px]">
                <SearchBox />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-0.5 sm:gap-1 lg:ml-0">
              <button
                type="button"
                onClick={() => setMobileSearch((value) => !value)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-ink lg:hidden"
                aria-label="Search products"
                aria-expanded={mobileSearch}
              >
                {mobileSearch ? <X size={19} /> : <Search size={19} />}
              </button>

              <button
                type="button"
                onClick={() => setBranchModalOpen(true)}
                className="hidden items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-2.5 py-2 text-[11px] font-semibold text-muted transition hover:border-primary/50 hover:text-ink md:flex"
                aria-label={`Change branch. Current branch: ${branch?.name || 'not selected'}`}
              >
                <MapPin size={13} className="text-primary" />
                <span className="max-w-[90px] truncate">{branch?.short || 'Select branch'}</span>
                <ChevronDown size={12} />
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="hidden h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-primary sm:flex"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <Link
                to="/wishlist"
                className="relative hidden h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-primary sm:flex"
                aria-label={`Wishlist, ${wishlist.length} items`}
              >
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="absolute right-1 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link
                to="/login"
                className="hidden h-9 w-9 items-center justify-center rounded-lg text-muted transition hover:bg-surface-2 hover:text-primary sm:flex"
                aria-label="Account and sign in"
              >
                <User size={18} />
              </Link>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative ml-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-ink transition hover:bg-primary hover:text-white"
                aria-label={`Open cart, ${cartCount} items`}
              >
                <span key={cartPulse} className={cartPulse ? 'animate-bounceIn' : ''}>
                  <ShoppingCart size={18} />
                </span>
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-white ring-2 ring-bg">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 border-t py-1.5 lg:hidden">
            <button
              type="button"
              onClick={() => setBranchModalOpen(true)}
              className="flex min-w-0 items-center gap-1.5 text-[10px] font-semibold text-muted"
              aria-label="Select branch"
            >
              <MapPin size={12} className="shrink-0 text-primary" />
              <span className="truncate">{branch?.name || 'Choose a branch'}</span>
              <ChevronDown size={10} className="shrink-0" />
            </button>
            <span className="hidden items-center gap-1 text-[10px] text-muted min-[400px]:flex">
              <Clock3 size={11} className="text-primary" /> Open until 6:30 PM
            </span>
            <Link to="/deals" className="flex items-center gap-1 text-[10px] font-bold text-primary">
              <Sparkles size={11} /> Today&apos;s deals
            </Link>
          </div>

          {mobileSearch && (
            <div className="pb-3 lg:hidden">
              <SearchBox autoFocus onNavigate={() => setMobileSearch(false)} />
            </div>
          )}

          <div className="hidden items-center gap-1 lg:flex" ref={megaRef}>
            <div className="relative">
              <button
                type="button"
                onClick={() => setMegaOpen((value) => !value)}
                aria-expanded={megaOpen}
                aria-controls="mega-menu"
                className={`flex min-h-[40px] items-center gap-2 rounded-lg px-3 text-xs font-bold transition ${
                  megaOpen ? 'text-primary' : 'text-ink hover:text-primary'
                }`}
              >
                <LayoutGrid size={16} className={megaOpen ? 'text-primary' : ''} />
                All Categories
                <ChevronDown size={13} className={`transition ${megaOpen ? 'rotate-180' : ''}`} />
              </button>

              {megaOpen && (
                <div
                  id="mega-menu"
                  className="absolute left-0 top-[calc(100%+9px)] z-[65] w-[min(1180px,calc(100vw-3rem))] rounded-2xl border bg-surface p-5 shadow-float"
                >
                  <div className="mb-4 flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary">
                        <LayoutGrid size={14} />
                      </span>
                      <span className="text-xs font-bold text-ink">Shop by category</span>
                    </div>
                    <Link to="/categories" className="flex items-center gap-1 text-[10px] font-semibold text-muted transition hover:text-primary">
                      View all categories <ChevronDown size={11} className="-rotate-90" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 gap-x-5 gap-y-5 xl:grid-cols-7">
                    {megaGroups.map((group) => (
                      <div key={group.category}>
                        <Link
                          to={`/shop?category=${group.category}`}
                          onClick={() => setMegaOpen(false)}
                          className="group mb-2.5 flex items-center gap-2"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg border bg-surface-2 text-primary transition group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                            <Icon name={group.icon} size={15} />
                          </span>
                          <span className="text-[11px] font-bold text-ink group-hover:text-primary">{group.title}</span>
                        </Link>
                        <ul className="space-y-0.5">
                          {group.items.map(([label, to]) => (
                            <li key={`${group.category}-${label}`}>
                              <Link
                                to={to}
                                onClick={() => setMegaOpen(false)}
                                className="block rounded-md px-1.5 py-1 text-[10.5px] leading-4 text-muted transition hover:bg-primary-soft hover:text-primary"
                              >
                                {label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-primary-soft px-3.5 py-2.5">
                    <p className="flex items-center gap-2 text-[11px] text-muted">
                      <Sparkles size={13} className="text-primary" /> Not sure what fits? Let our PC Builder check compatibility.
                    </p>
                    <Link to="/pc-builder" onClick={() => setMegaOpen(false)} className="text-[11px] font-bold text-primary hover:underline">
                      Open PC Builder
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div className="mx-1 h-5 w-px bg-line" />

            {topNav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`relative rounded-lg px-2.5 py-2 text-[11.5px] font-semibold transition ${
                  navIsActive(item.to)
                    ? 'text-primary'
                    : 'text-muted hover:bg-surface-2 hover:text-ink'
                }`}
              >
                {item.label}
                {navIsActive(item.to) && <span className="absolute inset-x-2.5 -bottom-[9px] h-0.5 rounded-full bg-primary" />}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <CartDrawer />
      <BranchModal />

      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} title="Menu" side="left">
        <div className="p-5">
          <button
            type="button"
            onClick={() => { setMobileOpen(false); setBranchModalOpen(true); }}
            className="mb-5 flex w-full items-center gap-3 rounded-xl border bg-surface-2 p-3 text-left"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary"><MapPin size={17} /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] font-bold uppercase tracking-wide text-muted">Your branch</span>
              <span className="block truncate text-sm font-semibold text-ink">{branch?.name || 'Choose a branch'}</span>
            </span>
            <ChevronDown size={15} className="text-muted" />
          </button>

          <nav className="space-y-1" aria-label="Mobile main navigation">
            {topNav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`flex min-h-[42px] items-center justify-between rounded-lg px-3 text-sm font-semibold transition ${
                  navIsActive(item.to) ? 'bg-primary-soft text-primary' : 'text-ink hover:bg-surface-2'
                }`}
              >
                {item.label}
                <ChevronDown size={14} className="-rotate-90 opacity-40" />
              </Link>
            ))}
          </nav>

          <div className="my-5 h-px bg-line" />
          <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Categories</p>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id === 'deals' ? 'deals' : category.id}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-lg border bg-surface-2 px-2.5 py-2.5 text-xs font-semibold text-ink transition hover:border-primary hover:text-primary"
              >
                <Icon name={category.icon} size={15} className="text-primary" />
                {category.name}
              </Link>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 text-xs">
            {[['Track Order', '/track-order'], ['Wishlist', '/wishlist'], ['Blog', '/blog'], ['About', '/about'], ['Brands', '/brands'], ['Sign in', '/login']].map(([label, to]) => (
              <Link
                key={label}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-2.5 py-2 text-muted transition hover:bg-surface-2 hover:text-ink"
              >
                {label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => { toggleTheme(); setMobileOpen(false); }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-semibold text-muted transition hover:text-ink"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            Switch to {theme === 'dark' ? 'light' : 'dark'} theme
          </button>
        </div>
      </Drawer>
    </>
  );
}
