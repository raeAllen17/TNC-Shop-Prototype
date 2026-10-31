export const agency = {
  name: 'Northline Studio',
  tagline: 'Websites that move local businesses forward.',
  contactName: 'Northline Project Team',
  email: 'hello@northline.studio',
  phone: '+63 917 555 0142',
  location: 'Bataan, Philippines',
  logoText: 'NS',
  accent: '#F26122',
};

export const pitchHero = {
  eyebrow: 'Website redesign proposal',
  title: 'A store this good deserves a website that works as hard as you do.',
  description:
    'TNC Tech Hub Balanga has the products, expertise and loyal customers. We rebuilt the online experience to turn that trust into measurable sales — faster, clearer and built for mobile-first shoppers.',
  stats: [
    { value: 100, suffix: '%', label: 'Working navigation links' },
    { value: 3, suffix: '×', label: 'Faster product discovery' },
    { value: 24, suffix: '', label: 'Products per page, not one long list' },
    { value: 0, suffix: '', label: 'Test products visible to customers' },
  ],
};

export const findings = [
  {
    title: 'Dead & placeholder links',
    detail: 'Navigation and footer links led nowhere, eroding trust before a customer could browse.',
    icon: 'Unlink',
    severity: 'High',
  },
  {
    title: 'Duplicate menu entries',
    detail: 'The same categories appeared multiple times, making the catalogue feel disorganized.',
    icon: 'Copy',
    severity: 'Medium',
  },
  {
    title: 'One very long product list',
    detail: 'Dozens of products loaded on a single page with no pagination, filters or sorting.',
    icon: 'List',
    severity: 'High',
  },
  {
    title: 'Test products visible to customers',
    detail: 'Items like “Test 2” and a ₱2.00 keyboard were live alongside real inventory.',
    icon: 'FlaskConical',
    severity: 'Critical',
  },
  {
    title: 'Inconsistent pricing',
    detail: 'Formatting changed between pages, and sale prices were not clearly distinguished.',
    icon: 'BadgePercent',
    severity: 'Medium',
  },
  {
    title: 'Template footer links',
    detail: 'Default template links and missing business details left customers without answers.',
    icon: 'LayoutTemplate',
    severity: 'Medium',
  },
  {
    title: 'Missing blog',
    detail: 'No buying guides or maintenance content to bring local shoppers in through search.',
    icon: 'Newspaper',
    severity: 'Growth',
  },
  {
    title: 'No mobile-first navigation',
    detail: 'The desktop-only layout made browsing difficult on the phones most customers use.',
    icon: 'Smartphone',
    severity: 'Critical',
  },
];

export const newFeatures = [
  { title: 'Faster pagination', detail: '24 products per page with filters, sorting and instant chips.', icon: 'Gauge' },
  { title: 'Working navigation', detail: 'Every category, brand and footer link goes to a real page.', icon: 'Link2' },
  { title: 'PC Builder', detail: 'Guided compatibility checks, wattage estimates and one-click add all.', icon: 'Cpu' },
  { title: 'Installment calculator', detail: 'Transparent Home Credit estimates before the customer visits.', icon: 'Calculator' },
  { title: 'Instant search', detail: 'Suggestions for products, categories and brands as you type.', icon: 'Search' },
  { title: 'Branch-aware stock', detail: 'Balanga, Pilar and Dinalupihan availability, remembered per customer.', icon: 'MapPin' },
  { title: 'Mobile bottom nav', detail: 'Thumb-friendly access to home, categories, search, cart and account.', icon: 'PanelBottom' },
  { title: 'Pitch overlay', detail: 'This live prototype can annotate each page for stakeholder reviews.', icon: 'Presentation' },
];

export const maintenancePlans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 4500,
    cadence: 'per month',
    description: 'Essential care for a brochure-led store site.',
    featured: false,
    features: [
      'Managed hosting & SSL',
      'Uptime monitoring',
      '2 product/content updates monthly',
      'Security patches & weekly backups',
      'Monthly health report',
      'Email support (48h response)',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 8500,
    cadence: 'per month',
    description: 'For a store actively adding products and running promos.',
    featured: true,
    features: [
      'Everything in Starter',
      '10 product updates monthly',
      'Price & promo updates',
      'Daily backups',
      'Monthly performance report',
      'Basic on-page SEO',
      'Priority support (24h response)',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 14500,
    cadence: 'per month',
    description: 'A full growth partner for an ambitious local retailer.',
    featured: false,
    features: [
      'Everything in Growth',
      'Unlimited product updates',
      'SEO content (2 posts/month)',
      'Conversion & analytics review',
      'Quarterly strategy call',
      'Priority support (4h response)',
      'Seasonal campaign landing pages',
    ],
  },
];

export const slaRows = [
  { task: 'Critical outage response', starter: '8 business hours', growth: '4 business hours', pro: '1 hour' },
  { task: 'Product/price updates', starter: '5 business days', growth: '2 business days', pro: 'Within 24 hours' },
  { task: 'Security patching', starter: 'Monthly', growth: 'Bi-weekly', pro: 'Weekly' },
  { task: 'Backups retention', starter: '7 days', growth: '30 days', pro: '90 days' },
  { task: 'Monthly report', starter: 'Basic uptime', growth: 'Traffic + uptime', pro: 'Full performance review' },
  { task: 'Support channel', starter: 'Email', growth: 'Email + chat', pro: 'Dedicated contact' },
];

export const roadmap = [
  { phase: 'Discovery', week: 'Week 1', description: 'Stakeholder workshop, inventory audit and customer journey mapping.', icon: 'Search' },
  { phase: 'Design', week: 'Weeks 2–3', description: 'Wireframes, brand-led UI design and a clickable prototype for sign-off.', icon: 'PenTool' },
  { phase: 'Build', week: 'Weeks 4–6', description: 'Responsive build, product data migration, integrations and QA.', icon: 'Code2' },
  { phase: 'Launch', week: 'Week 7', description: 'Content migration, SEO checks, analytics setup and team training.', icon: 'Rocket' },
  { phase: 'Care', week: 'Ongoing', description: 'Proactive maintenance, updates, reporting and quarterly improvements.', icon: 'HeartHandshake' },
];

export const pitchFaqs = [
  {
    q: 'How long does the redesign take?',
    a: 'The proposed timeline is seven weeks from discovery to launch. Product data migration and client feedback are the most common factors that affect timing.',
  },
  {
    q: 'Can we keep our current product list?',
    a: 'Yes. We will clean and migrate the existing catalogue, remove test products, normalize pricing and map items to the new category structure.',
  },
  {
    q: 'Do we need to commit to maintenance?',
    a: 'No. The website can launch as a standalone project. Maintenance is optional and designed to keep the site secure, fast and current.',
  },
  {
    q: 'Will the site accept online payments?',
    a: 'This prototype focuses on discovery and store visits. Checkout is built as an order request flow; we can add an online payment gateway in a later phase.',
  },
  {
    q: 'Can staff update products themselves?',
    a: 'We can add a lightweight admin panel or connect an existing inventory source. Most stores choose our Growth or Pro plan for hands-off updates.',
  },
];

export const comparisonSlides = {
  home: {
    title: 'Home page',
    beforeLabel: 'Current site',
    afterLabel: 'Proposed redesign',
    points: ['Clear hero and primary actions', 'Real inventory & pricing', 'Mobile-first navigation'],
  },
  listing: {
    title: 'Product listing',
    beforeLabel: 'One long list',
    afterLabel: 'Filtered & paginated',
    points: ['24 items per page', 'Sticky filter sidebar', 'Sort and grid/list views'],
  },
};

export const overlayTips = {
  '/': [
    { n: 1, x: 74, y: 21, title: 'Editable hero', text: 'One clear promise, two focused CTAs, and live store-hours context.' },
    { n: 2, x: 18, y: 46, title: 'Category shortcuts', text: 'Large, thumb-friendly cards route to real listings — no dead links.' },
    { n: 3, x: 68, y: 63, title: 'Deals with urgency', text: 'Countdown, stock badges, and honest pricing in one scannable carousel.' },
    { n: 4, x: 44, y: 80, title: 'Trust & services', text: 'Shipping, warranty and repair services answer pre-purchase questions.' },
  ],
  '/shop': [
    { n: 1, x: 16, y: 36, title: 'Sticky filters', text: 'Brand, price and availability filters stay in reach while comparing.' },
    { n: 2, x: 58, y: 22, title: 'Result clarity', text: 'Live count, active chips, sort, and grid/list toggle.' },
    { n: 3, x: 55, y: 70, title: 'Server-style pagination', text: '24 products per page keeps browsing fast on mobile data.' },
  ],
  '/pc-builder': [
    { n: 1, x: 26, y: 42, title: 'Guided steps', text: 'Choose one component at a time, with prices reflected live.' },
    { n: 2, x: 77, y: 38, title: 'Live total & wattage', text: 'Compatibility warnings catch socket mismatches before checkout.' },
  ],
  '/product': [
    { n: 1, x: 28, y: 34, title: 'Product story', text: 'Gallery, stock badge and branch availability at a glance.' },
    { n: 2, x: 73, y: 47, title: 'Buy with confidence', text: 'Installment estimate, spec table, and compatible suggestions.' },
  ],
  '/pitch': [
    { n: 1, x: 18, y: 18, title: 'Evidence, not opinion', text: 'Every recommendation maps back to a real problem found on the current site.' },
    { n: 2, x: 79, y: 42, title: 'Before / after', text: 'Drag the comparison slider to show the client the difference.' },
    { n: 3, x: 52, y: 69, title: 'Clear next step', text: 'Simple plans, an SLA table and a direct call booking CTA.' },
  ],
};
