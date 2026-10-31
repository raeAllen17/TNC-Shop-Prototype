import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { products } from '../data/products';

const StoreContext = createContext(null);

const readStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private modes; the prototype still works in memory.
  }
};

let toastId = 0;

export function StoreProvider({ children }) {
  const [theme, setTheme] = useState(() => readStorage('tnc-theme', 'dark'));
  const [branchId, setBranchId] = useState(() => readStorage('tnc-branch', null));
  const [cart, setCart] = useState(() => readStorage('tnc-cart', []));
  const [wishlist, setWishlist] = useState(() => readStorage('tnc-wishlist', []));
  const [lastOrder, setLastOrder] = useState(() => readStorage('tnc-last-order', null));
  const [cartOpen, setCartOpen] = useState(false);
  const [branchModalOpen, setBranchModalOpen] = useState(() => !readStorage('tnc-branch', null));
  const [toasts, setToasts] = useState([]);
  const [pitchMode, setPitchMode] = useState(() => readStorage('tnc-pitch-mode', false));
  const cartBump = useRef(0);
  const [cartPulse, setCartPulse] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    writeStorage('tnc-theme', theme);
  }, [theme]);

  useEffect(() => writeStorage('tnc-cart', cart), [cart]);
  useEffect(() => writeStorage('tnc-wishlist', wishlist), [wishlist]);
  useEffect(() => writeStorage('tnc-branch', branchId), [branchId]);
  useEffect(() => writeStorage('tnc-pitch-mode', pitchMode), [pitchMode]);
  useEffect(() => writeStorage('tnc-last-order', lastOrder), [lastOrder]);

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = 'success', duration = 3200) => {
      toastId += 1;
      const id = toastId;
      setToasts((current) => [...current.slice(-2), { id, message, type }]);
      window.setTimeout(() => dismissToast(id), duration);
    },
    [dismissToast],
  );

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const chooseBranch = useCallback(
    (id) => {
      setBranchId(id);
      setBranchModalOpen(false);
      const branch = { balanga: 'Balanga Main', pilar: 'TNC Pilar', dinalupihan: 'TNC Dinalupihan' }[id];
      if (branch) showToast(`Shopping at ${branch}`, 'success');
    },
    [showToast],
  );

  const addToCart = useCallback(
    (productId, qty = 1, options = {}) => {
      const product = products.find((entry) => entry.id === productId);
      if (!product) return;
      setCart((current) => {
        const existing = current.find((item) => item.id === productId);
        if (existing) {
          return current.map((item) =>
            item.id === productId ? { ...item, qty: Math.min(item.qty + qty, 99) } : item,
          );
        }
        return [...current, { id: productId, qty: Math.min(qty, 99) }];
      });
      cartBump.current += 1;
      setCartPulse(cartBump.current);
      if (!options.silent) showToast(`${product.name} added to cart`);
    },
    [showToast],
  );

  const addManyToCart = useCallback(
    (productIds) => {
      const valid = productIds.filter((id) => products.some((product) => product.id === id));
      setCart((current) => {
        const next = [...current];
        valid.forEach((id) => {
          const existing = next.find((item) => item.id === id);
          if (existing) existing.qty = Math.min(existing.qty + 1, 99);
          else next.push({ id, qty: 1 });
        });
        return next;
      });
      cartBump.current += 1;
      setCartPulse(cartBump.current);
      showToast(`${valid.length} component${valid.length === 1 ? '' : 's'} added to cart`);
    },
    [showToast],
  );

  const updateQty = useCallback((productId, qty) => {
    setCart((current) =>
      qty <= 0
        ? current.filter((item) => item.id !== productId)
        : current.map((item) => (item.id === productId ? { ...item, qty: Math.min(qty, 99) } : item)),
    );
  }, []);

  const removeFromCart = useCallback(
    (productId) => {
      setCart((current) => current.filter((item) => item.id !== productId));
      showToast('Item removed from cart', 'info');
    },
    [showToast],
  );

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (productId) => {
      const product = products.find((entry) => entry.id === productId);
      setWishlist((current) => {
        if (current.includes(productId)) {
          showToast(`${product?.name || 'Item'} removed from wishlist`, 'info');
          return current.filter((id) => id !== productId);
        }
        showToast(`${product?.name || 'Item'} saved to wishlist`);
        return [...current, productId];
      });
    },
    [showToast],
  );

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((entry) => entry.id === item.id);
          return product ? { ...item, product, lineTotal: product.price * item.qty } : null;
        })
        .filter(Boolean),
    [cart],
  );

  const cartCount = useMemo(() => cart.reduce((total, item) => total + item.qty, 0), [cart]);
  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.lineTotal, 0),
    [cartItems],
  );

  const placeOrder = useCallback(
    (details) => {
      const order = {
        ...details,
        id: `TNC-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toISOString(),
        items: cartItems.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          qty: item.qty,
        })),
        subtotal,
        status: 'confirmed',
      };
      setLastOrder(order);
      setCart([]);
      return order;
    },
    [cartItems, subtotal],
  );

  const branch = useMemo(() => {
    const branchMap = {
      balanga: {
        id: 'balanga',
        name: 'Balanga Main',
        short: 'Balanga',
        address: 'Calero St., Ibayo, Balanga City, Bataan',
        hours: 'Daily, 10:00 AM – 6:30 PM',
        note: 'Near SM City Balanga & Iglesia ni Cristo',
      },
      pilar: {
        id: 'pilar',
        name: 'TNC Pilar',
        short: 'Pilar',
        address: 'Roman Superhighway, Pilar, Bataan',
        hours: 'Daily, 10:00 AM – 6:00 PM',
        note: 'Pickup and service drop-off available',
      },
      dinalupihan: {
        id: 'dinalupihan',
        name: 'TNC Dinalupihan',
        short: 'Dinalupihan',
        address: 'Rizal St., Dinalupihan, Bataan',
        hours: 'Daily, 10:00 AM – 6:00 PM',
        note: 'Home Credit applications accepted in store',
      },
    };
    return branchMap[branchId] || null;
  }, [branchId]);

  const wishlistProducts = useMemo(
    () => wishlist.map((id) => products.find((product) => product.id === id)).filter(Boolean),
    [wishlist],
  );

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      branchId,
      branch,
      setBranch: chooseBranch,
      branchModalOpen,
      setBranchModalOpen,
      cart,
      cartItems,
      cartCount,
      subtotal,
      cartOpen,
      setCartOpen,
      addToCart,
      addManyToCart,
      updateQty,
      removeFromCart,
      clearCart,
      wishlist,
      wishlistProducts,
      toggleWishlist,
      lastOrder,
      placeOrder,
      toasts,
      showToast,
      dismissToast,
      pitchMode,
      setPitchMode,
      cartPulse,
    }),
    [
      theme, toggleTheme, branchId, branch, chooseBranch, branchModalOpen, cart, cartItems,
      cartCount, subtotal, cartOpen, addToCart, addManyToCart, updateQty, removeFromCart,
      clearCart, wishlist, wishlistProducts, toggleWishlist, lastOrder, placeOrder, toasts,
      showToast, dismissToast, pitchMode, cartPulse,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used inside StoreProvider');
  return context;
};
