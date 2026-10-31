# TNC Tech Hub Balanga Prototype

A clickable, mobile-first ecommerce redesign for TNC Tech Hub Balanga, built for a client pitch. The prototype covers product discovery, PC building, Home Credit estimates, checkout, store services, and a dedicated proposal page at `/pitch`.

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL. The Vite server supports client-side routes automatically.

```bash
npm run build     # production build in dist/
npm run preview   # preview the production build
npm run lint      # ESLint, zero warnings allowed
```

Requires Node.js 18+ and npm. The prototype was verified with Node 24 and npm 11.

## Key routes

| Route | Purpose |
| --- | --- |
| `/` | Storefront home, featured products, categories, services, blog |
| `/shop` | Filterable catalog with search, category, brand, price, sort, grid/list |
| `/product/:id` | Product detail, gallery, specs, calculator, stock, related products |
| `/pc-builder` | Guided build with compatibility and wattage checks |
| `/cart`, `/checkout`, `/order-success` | Cart, guest checkout, confirmation |
| `/track-order` | Demo order tracking using the last local order |
| `/wishlist` | Saved products persisted locally |
| `/deals` | Current offers and discounts |
| `/categories`, `/brands`, `/brand/:slug` | Catalog landing pages |
| `/search` | Search results with filters |
| `/home-credit` | Financing explainer and editable installment calculator |
| `/about`, `/contact`, `/faq` | Store information, contact form, support |
| `/contact#services` | In-store repair and upgrade services |
| `/blog`, `/blog/:slug` | Buying guides and maintenance articles |
| `/privacy`, `/terms` | Legal pages |
| `/login`, `/register` | Non-functional authentication screens |
| `/pitch` | Client proposal, scope, plans, timeline, and presentation mode |
| `*` | Branded 404 page |

## Prototype behavior

- All data is local and deterministic. No backend, authentication, payments, email, or live stock service is connected.
- Forms and account screens simulate success states and intentionally avoid pretending to send data.
- Cart, wishlist, branch, theme, last order, PC build, and pitch mode persist in `localStorage`.
- Checkout creates a local order reference for the success and tracking screens.
- Home Credit results are estimates only and require in-store approval.
- Product imagery is generated with SVG/CSS through `ProductVisual`; no external stock photos are used.

## Store details used

- TNC Tech Hub Balanga, Calero St., Ibayo, Balanga City, Bataan
- Near SM City Balanga and Iglesia ni Cristo
- Daily, 10:00 AM to 6:30 PM
- Branches: Balanga Main, Pilar, and Dinalupihan
- Free local delivery on orders over PHP 15,000

## Customization

- `src/data/products.js`: branches, categories, brands, 112 seeded products, services, blog posts, and PC Builder parts.
- `src/data/pitch.js`: proposal framing, findings, features, plans, SLA, roadmap, FAQ, and overlay tips.
- `src/data/navigation.js`: desktop navigation, mega-menu, and footer links.
- `src/index.css` and `tailwind.config.js`: design tokens, typography, themes, and shared utilities.
- `src/context/StoreContext.jsx`: local state and persistence.
- `src/pages/`: route-level screens. `src/components/` holds shared UI, layout, and pitch components.

To change the presentation story, edit `src/data/pitch.js` first. To change the catalog, edit the seed rows in `src/data/products.js`; product IDs are generated from names.

## Design direction

- Dark-first interface with an orange accent and optional light theme.
- Plus Jakarta Sans for UI and Space Grotesk for display headings.
- Mobile-first layouts verified down to 360px, with desktop navigation, mobile tab bar, and accessible focus states.
- Brand tokens: `#111111` background, `#181818` surface, `#F26122` primary, `#F5F5F5` text.

## Known limitations

- Product records are sample data and may contain illustrative prices, ratings, and availability.
- Pitch metrics and timeline details are proposal content, not audited claims.
- Authentication, account history, checkout payment, newsletter, and contact submission are UI-only.
- No automated browser test suite is included; run the lint and production build before sharing a deployment.
