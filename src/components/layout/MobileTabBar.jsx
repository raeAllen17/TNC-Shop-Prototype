import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutGrid, Search, ShoppingCart, User } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function MobileTabBar() {
  const location = useLocation();
  const { cartCount, setCartOpen } = useStore();

  const items = [
    { label: 'Home', icon: Home, to: '/', exact: true },
    { label: 'Categories', icon: LayoutGrid, to: '/categories' },
    { label: 'Search', icon: Search, to: '/search' },
    { label: 'Cart', icon: ShoppingCart, cart: true },
    { label: 'Account', icon: User, to: '/login' },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-[62] border-t glass pb-[env(safe-area-inset-bottom)] md:hidden" aria-label="Mobile tab navigation">
      <div className="grid h-[62px] grid-cols-5">
        {items.map((item) => {
          const active = item.to && (item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to) && item.to !== '/');
          const Icon = item.icon;
          const content = (
            <>
              <span className={`relative flex h-8 w-10 items-center justify-center rounded-lg transition ${active ? 'bg-primary-soft text-primary' : 'text-muted'}`}>
                <Icon size={19} />
                {item.cart && cartCount > 0 && (
                  <span className="absolute -right-0.5 -top-1 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-primary px-0.5 text-[8px] font-bold text-white">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </span>
              <span className={`text-[9px] font-semibold ${active ? 'text-primary' : 'text-muted'}`}>{item.label}</span>
            </>
          );

          if (item.cart) {
            return (
              <button key={item.label} type="button" onClick={() => setCartOpen(true)} className="flex flex-col items-center justify-center gap-0.5" aria-label={`Open cart, ${cartCount} items`}>
                {content}
              </button>
            );
          }

          return (
            <Link key={item.label} to={item.to} className="flex flex-col items-center justify-center gap-0.5" aria-current={active ? 'page' : undefined}>
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
