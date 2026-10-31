export const topNav = [
  { label: 'Home', to: '/' },
  { label: 'Laptops & Computers', to: '/shop?category=computers&sub=laptops' },
  { label: 'PC Builder', to: '/pc-builder' },
  { label: 'Deals', to: '/deals' },
  { label: 'Home Credit', to: '/home-credit' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

export const megaGroups = [
  {
    category: 'computers',
    icon: 'Laptop',
    title: 'Computers',
    items: [
      ['Gaming PCs', '/shop?category=computers&sub=gaming-pc'],
      ['Laptops', '/shop?category=computers&sub=laptops'],
      ['Office PCs', '/shop?category=computers&sub=office-pc'],
      ['Workstations', '/shop?category=computers&sub=workstation'],
      ['All Computers', '/shop?category=computers'],
    ],
  },
  {
    category: 'components',
    icon: 'Cpu',
    title: 'Components',
    items: [
      ['Processors', '/shop?category=components&sub=cpu'],
      ['Graphics Cards', '/shop?category=components&sub=gpu'],
      ['Motherboards', '/shop?category=components&sub=motherboard'],
      ['Memory', '/shop?category=components&sub=memory'],
      ['Storage', '/shop?category=components&sub=storage'],
      ['Power Supplies', '/shop?category=components&sub=psu'],
      ['Cases', '/shop?category=components&sub=case'],
      ['Coolers', '/shop?category=components&sub=cooler'],
    ],
  },
  {
    category: 'peripherals',
    icon: 'Keyboard',
    title: 'Peripherals',
    items: [
      ['Monitors', '/shop?category=peripherals&sub=monitor'],
      ['Keyboards', '/shop?category=peripherals&sub=keyboard'],
      ['Mice', '/shop?category=peripherals&sub=mouse'],
      ['Headsets', '/shop?category=peripherals&sub=headset'],
      ['Webcams', '/shop?category=peripherals&sub=webcam'],
    ],
  },
  {
    category: 'networking',
    icon: 'Router',
    title: 'Networking',
    items: [
      ['Routers', '/shop?category=networking&sub=router'],
      ['Switches', '/shop?category=networking&sub=switch'],
      ['Extenders', '/shop?category=networking&sub=extender'],
      ['Adapters', '/shop?category=networking&sub=adapter'],
    ],
  },
  {
    category: 'accessories',
    icon: 'Cable',
    title: 'Accessories',
    items: [
      ['Hubs & Docks', '/shop?category=accessories&sub=hub'],
      ['Desk Mats', '/shop?category=accessories&sub=deskmat'],
      ['Chargers', '/shop?category=accessories&sub=charger'],
      ['Cooling', '/shop?category=accessories&sub=cooling'],
    ],
  },
  {
    category: 'gadgets',
    icon: 'TabletSmartphone',
    title: 'Gadgets',
    items: [
      ['Printers', '/shop?category=gadgets&sub=printer'],
      ['Tablets', '/shop?category=gadgets&sub=tablet'],
      ['Audio', '/shop?category=gadgets&sub=audio'],
      ['UPS & Power', '/shop?category=gadgets&sub=ups'],
    ],
  },
  {
    category: 'deals',
    icon: 'Flame',
    title: 'Deals',
    items: [
      ['Hot Deals', '/deals'],
      ['Clearance', '/shop?category=deals&sub=clearance'],
      ['All Products', '/shop'],
      ['Brands', '/brands'],
    ],
  },
];

export const footerLinks = {
  shop: [
    ['All Products', '/shop'],
    ['Laptops & Computers', '/shop?category=computers'],
    ['Components', '/shop?category=components'],
    ['Peripherals', '/shop?category=peripherals'],
    ['Networking', '/shop?category=networking'],
    ['Deals', '/deals'],
    ['Brands', '/brands'],
  ],
  company: [
    ['About TNC', '/about'],
    ['Blog', '/blog'],
    ['PC Builder', '/pc-builder'],
    ['Home Credit', '/home-credit'],
    ['Wishlist', '/wishlist'],
    ['Track Order', '/track-order'],
  ],
  support: [
    ['FAQ', '/faq'],
    ['Contact Us', '/contact'],
    ['Repair Services', '/contact#services'],
    ['Privacy Policy', '/privacy'],
    ['Terms of Service', '/terms'],
  ],
};
