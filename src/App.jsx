import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileTabBar from './components/layout/MobileTabBar';
import PitchFab from './components/pitch/PitchFab';
import PitchOverlay from './components/pitch/PitchOverlay';
import { ToastHost } from './components/ui/Overlays';

const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const PCBuilderPage = lazy(() => import('./pages/PCBuilderPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'));
const TrackOrderPage = lazy(() => import('./pages/TrackOrderPage'));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const DealsPage = lazy(() => import('./pages/DealsPage'));
const BrandsPage = lazy(() => import('./pages/BrandsPage'));
const BrandPage = lazy(() => import('./pages/BrandPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const HomeCreditPage = lazy(() => import('./pages/HomeCreditPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const PitchPage = lazy(() => import('./pages/PitchPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const titles = {
  '/': 'TNC Tech Hub Balanga — Build. Upgrade. Perform.',
  '/shop': 'Shop all products · TNC Tech Hub Balanga',
  '/categories': 'Browse categories · TNC Tech Hub Balanga',
  '/search': 'Search · TNC Tech Hub Balanga',
  '/deals': 'Hot deals · TNC Tech Hub Balanga',
  '/brands': 'Shop by brand · TNC Tech Hub Balanga',
  '/pc-builder': 'PC Builder · TNC Tech Hub Balanga',
  '/cart': 'Your cart · TNC Tech Hub Balanga',
  '/checkout': 'Checkout · TNC Tech Hub Balanga',
  '/order-success': 'Order confirmed · TNC Tech Hub Balanga',
  '/track-order': 'Track order · TNC Tech Hub Balanga',
  '/wishlist': 'Wishlist · TNC Tech Hub Balanga',
  '/login': 'Sign in · TNC Tech Hub Balanga',
  '/register': 'Create account · TNC Tech Hub Balanga',
  '/faq': 'Frequently asked questions · TNC Tech Hub Balanga',
  '/contact': 'Contact & branches · TNC Tech Hub Balanga',
  '/home-credit': 'Home Credit · TNC Tech Hub Balanga',
  '/about': 'About us · TNC Tech Hub Balanga',
  '/privacy': 'Privacy Policy · TNC Tech Hub Balanga',
  '/terms': 'Terms of Service · TNC Tech Hub Balanga',
  '/blog': 'Blog · TNC Tech Hub Balanga',
  '/pitch': 'Website Proposal · TNC Tech Hub Balanga',
};

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = titles[path];
    if (!title && path.startsWith('/product/')) title = 'Product details · TNC Tech Hub Balanga';
    if (!title && path.startsWith('/brand/')) title = 'Brand · TNC Tech Hub Balanga';
    if (!title && path.startsWith('/blog/')) title = 'Article · TNC Tech Hub Balanga';
    document.title = title || 'Page not found · TNC Tech Hub Balanga';

    if (location.hash) {
      const timer = window.setTimeout(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return undefined;
  }, [location.pathname, location.hash]);

  return null;
}

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
      <Loader2 size={26} className="animate-spin text-primary" />
      <p className="text-[11px] font-semibold text-muted">Loading TNC Tech Hub…</p>
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/pc-builder" element={<PCBuilderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/brand/:slug" element={<BrandPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/home-credit" element={<HomeCreditPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/pitch" element={<PitchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  const location = useLocation();
  const isPitch = location.pathname.startsWith('/pitch');
  const hasProductBar = location.pathname.startsWith('/product/');

  return (
    <>
      <RouteEffects />
      {isPitch ? (
        <div className="min-h-screen">
          <AppRoutes />
          <ToastHost />
        </div>
      ) : (
        <div className={`flex min-h-screen flex-col md:pb-0 ${hasProductBar ? 'pb-[calc(136px+env(safe-area-inset-bottom))]' : 'pb-[calc(62px+env(safe-area-inset-bottom))]'}`}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" className="flex-1">
            <AppRoutes />
          </main>
          <Footer />
          <MobileTabBar />
          <PitchFab />
          <PitchOverlay />
          <ToastHost />
        </div>
      )}
    </>
  );
}
