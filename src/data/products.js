export const branches = [
  {
    id: 'balanga',
    name: 'Balanga Main',
    short: 'Balanga',
    address: 'Calero St., Ibayo, Balanga City, Bataan',
    hours: 'Daily, 10:00 AM – 6:30 PM',
    note: 'Near SM City Balanga & Iglesia ni Cristo',
  },
  {
    id: 'pilar',
    name: 'TNC Pilar',
    short: 'Pilar',
    address: 'Roman Superhighway, Pilar, Bataan',
    hours: 'Daily, 10:00 AM – 6:00 PM',
    note: 'Pickup and service drop-off available',
  },
  {
    id: 'dinalupihan',
    name: 'TNC Dinalupihan',
    short: 'Dinalupihan',
    address: 'Rizal St., Dinalupihan, Bataan',
    hours: 'Daily, 10:00 AM – 6:00 PM',
    note: 'Home Credit applications accepted in store',
  },
];

export const categories = [
  {
    id: 'computers',
    name: 'Computers',
    icon: 'Laptop',
    blurb: 'Gaming rigs, everyday laptops & workstations',
    subs: [
      { id: 'gaming-pc', name: 'Gaming PCs', icon: 'Gamepad2' },
      { id: 'laptops', name: 'Laptops', icon: 'Laptop' },
      { id: 'office-pc', name: 'Office PCs', icon: 'Monitor' },
      { id: 'workstation', name: 'Workstations', icon: 'Cpu' },
    ],
  },
  {
    id: 'components',
    name: 'Components',
    icon: 'Cpu',
    blurb: 'CPUs, GPUs, memory, storage & more',
    subs: [
      { id: 'cpu', name: 'Processors', icon: 'Cpu' },
      { id: 'gpu', name: 'Graphics Cards', icon: 'Gpu' },
      { id: 'motherboard', name: 'Motherboards', icon: 'CircuitBoard' },
      { id: 'memory', name: 'Memory', icon: 'MemoryStick' },
      { id: 'storage', name: 'Storage', icon: 'HardDrive' },
      { id: 'psu', name: 'Power Supplies', icon: 'PlugZap' },
      { id: 'case', name: 'PC Cases', icon: 'Box' },
      { id: 'cooler', name: 'Coolers', icon: 'Fan' },
    ],
  },
  {
    id: 'peripherals',
    name: 'Peripherals',
    icon: 'Keyboard',
    blurb: 'Monitors, keyboards, mice & headsets',
    subs: [
      { id: 'monitor', name: 'Monitors', icon: 'Monitor' },
      { id: 'keyboard', name: 'Keyboards', icon: 'Keyboard' },
      { id: 'mouse', name: 'Mice', icon: 'Mouse' },
      { id: 'headset', name: 'Headsets', icon: 'Headphones' },
      { id: 'webcam', name: 'Webcams', icon: 'Webcam' },
    ],
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: 'Router',
    blurb: 'Routers, switches & reliable Wi-Fi',
    subs: [
      { id: 'router', name: 'Routers', icon: 'Router' },
      { id: 'switch', name: 'Switches', icon: 'Network' },
      { id: 'extender', name: 'Extenders', icon: 'Wifi' },
      { id: 'adapter', name: 'Adapters', icon: 'Cable' },
    ],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: 'Cable',
    blurb: 'Hubs, mats, chargers & essentials',
    subs: [
      { id: 'hub', name: 'Hubs & Docks', icon: 'Usb' },
      { id: 'deskmat', name: 'Desk Mats', icon: 'RectangleHorizontal' },
      { id: 'charger', name: 'Chargers', icon: 'BatteryCharging' },
      { id: 'cooling', name: 'Cooling', icon: 'Fan' },
    ],
  },
  {
    id: 'gadgets',
    name: 'Gadgets',
    icon: 'TabletSmartphone',
    blurb: 'Printers, tablets, audio & UPS',
    subs: [
      { id: 'printer', name: 'Printers', icon: 'Printer' },
      { id: 'tablet', name: 'Tablets', icon: 'Tablet' },
      { id: 'audio', name: 'Audio', icon: 'Speaker' },
      { id: 'ups', name: 'UPS & Power', icon: 'BatteryFull' },
    ],
  },
  {
    id: 'deals',
    name: 'Deals',
    icon: 'Flame',
    blurb: 'Limited-time price drops',
    subs: [
      { id: 'hot', name: 'Hot Deals', icon: 'Flame' },
      { id: 'clearance', name: 'Clearance', icon: 'Tags' },
    ],
  },
];

export const brands = [
  'AMD', 'Intel', 'NVIDIA', 'ASUS', 'MSI', 'Gigabyte', 'Corsair', 'Kingston',
  'Samsung', 'Logitech', 'Redragon', 'TP-Link', 'AOC', 'Nvision', 'Deepcool',
  'NZXT', 'Thermalright', 'Tecware', 'Darkflash', 'Keychron', 'Razer', 'HyperX',
  'Epson', 'Canon', 'Brother', 'Lenovo', 'Acer', 'Xiaomi', 'Baseus', 'Anker',
  'Secure', 'Ugreen', 'WD', 'Seagate', 'Crucial', 'G.Skill', 'TeamGroup',
  'Lian Li', 'Cooler Master', 'SteelSeries', 'JBL', 'Apple', 'ASRock', 'ID-Cooling',
  'Seasonic', 'Royal Kludge', 'A4Tech',
];

const slugify = (value) =>
  value.toLowerCase().replace(/["']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const groups = [
  {
    category: 'components', sub: 'cpu', items: [
      ['AMD Ryzen 5 5600', 7250, 'AMD', { socket: 'AM4', tdp: 65, cores: '6C / 12T', boost: '4.4 GHz', specs: [['Socket', 'AM4'], ['Cores / Threads', '6 / 12'], ['Base Clock', '3.5 GHz'], ['Boost Clock', '4.4 GHz'], ['TDP', '65W'], ['Warranty', '3 years']] }],
      ['AMD Ryzen 7 7800X3D', 20100, 'AMD', { socket: 'AM5', tdp: 120, cores: '8C / 16T', boost: '5.0 GHz', specs: [['Socket', 'AM5'], ['Cores / Threads', '8 / 16'], ['Base Clock', '4.2 GHz'], ['Boost Clock', '5.0 GHz'], ['L3 Cache', '96MB 3D V-Cache'], ['TDP', '120W']] }],
      ['AMD Ryzen 5 7600', 12950, 'AMD', { socket: 'AM5', tdp: 65, cores: '6C / 12T', boost: '5.1 GHz', specs: [['Socket', 'AM5'], ['Cores / Threads', '6 / 12'], ['Boost Clock', 'up to 5.1 GHz'], ['L3 Cache', '32MB'], ['TDP', '65W'], ['Cooler', 'Wraith Stealth included']] }],
      ['AMD Ryzen 9 7950X', 36500, 'AMD', { socket: 'AM5', tdp: 170, cores: '16C / 32T', boost: '5.7 GHz', specs: [['Socket', 'AM5'], ['Cores / Threads', '16 / 32'], ['Boost Clock', 'up to 5.7 GHz'], ['L3 Cache', '64MB'], ['TDP', '170W'], ['Best for', 'Creator & rendering']] }],
      ['Intel Core i3-12100F', 4650, 'Intel', { socket: 'LGA1700', tdp: 58, cores: '4C / 8T', boost: '4.3 GHz', specs: [['Socket', 'LGA1700'], ['Cores / Threads', '4 / 8'], ['Boost Clock', '4.3 GHz'], ['Cache', '12MB'], ['TDP', '58W'], ['Cooler', 'Included']] }],
      ['Intel Core i5-12400F', 7950, 'Intel', { socket: 'LGA1700', tdp: 65, cores: '6C / 12T', boost: '4.4 GHz', specs: [['Socket', 'LGA1700'], ['Cores / Threads', '6 / 12'], ['Boost Clock', '4.4 GHz'], ['Cache', '18MB'], ['TDP', '65W'], ['Cooler', 'Included']] }],
      ['Intel Core i5-13600KF', 15200, 'Intel', { socket: 'LGA1700', tdp: 125, cores: '14C / 20T', boost: '5.1 GHz', specs: [['Socket', 'LGA1700'], ['Cores / Threads', '14 / 20'], ['Boost Clock', '5.1 GHz'], ['Cache', '24MB'], ['TDP', '125W'], ['Overclocking', 'Unlocked']] }],
      ['Intel Core i5-14400F', 11950, 'Intel', { socket: 'LGA1700', tdp: 65, cores: '10C / 16T', boost: '4.7 GHz', specs: [['Socket', 'LGA1700'], ['Cores / Threads', '10 / 16'], ['Boost Clock', '4.7 GHz'], ['Cache', '20MB'], ['TDP', '65W'], ['Cooler', 'Included']] }],
      ['Intel Core i7-14700K', 24800, 'Intel', { socket: 'LGA1700', tdp: 125, cores: '20C / 28T', boost: '5.6 GHz', specs: [['Socket', 'LGA1700'], ['Cores / Threads', '20 / 28'], ['Boost Clock', '5.6 GHz'], ['Cache', '33MB'], ['TDP', '125W'], ['Overclocking', 'Unlocked']] }],
    ],
  },
  {
    category: 'components', sub: 'motherboard', items: [
      ['Gigabyte B550M K', 4800, 'Gigabyte', { socket: 'AM4', specs: [['Socket', 'AM4'], ['Form Factor', 'Micro-ATX'], ['Memory', '4x DDR4 up to 128GB'], ['M.2', '1x PCIe 4.0'], ['LAN', 'Gigabit Ethernet'], ['Warranty', '3 years']] }],
      ['MSI B650M Gaming Plus WiFi', 7850, 'MSI', { socket: 'AM5', specs: [['Socket', 'AM5'], ['Form Factor', 'Micro-ATX'], ['Memory', '4x DDR5 up to 128GB'], ['M.2', '2x PCIe 4.0'], ['Wireless', 'Wi-Fi 6E'], ['Warranty', '3 years']] }],
      ['ASUS TUF B760M-Plus WiFi D4', 8990, 'ASUS', { socket: 'LGA1700', specs: [['Socket', 'LGA1700'], ['Form Factor', 'Micro-ATX'], ['Memory', '4x DDR4 up to 128GB'], ['M.2', '2x PCIe 4.0'], ['Wireless', 'Wi-Fi 6'], ['Warranty', '3 years']] }],
      ['Gigabyte B760M DS3H AX', 7450, 'Gigabyte', { socket: 'LGA1700', specs: [['Socket', 'LGA1700'], ['Form Factor', 'Micro-ATX'], ['Memory', '4x DDR4 up to 128GB'], ['M.2', '2x PCIe 4.0'], ['Wireless', 'Wi-Fi 6E'], ['Warranty', '3 years']] }],
      ['ASRock A520M-HVS', 3100, 'ASRock', { socket: 'AM4', specs: [['Socket', 'AM4'], ['Form Factor', 'Micro-ATX'], ['Memory', '2x DDR4 up to 64GB'], ['M.2', '1x PCIe 3.0'], ['LAN', 'Gigabit Ethernet'], ['Warranty', '3 years']] }],
      ['MSI MAG X670E Tomahawk WiFi', 24500, 'MSI', { socket: 'AM5', specs: [['Socket', 'AM5'], ['Form Factor', 'ATX'], ['Memory', '4x DDR5 up to 192GB'], ['M.2', '4x PCIe 5.0'], ['Wireless', 'Wi-Fi 6E'], ['Warranty', '3 years']] }],
    ],
  },
  {
    category: 'components', sub: 'gpu', items: [
      ['Gigabyte RTX 5060 Eagle OC 8GB', 22620, 'Gigabyte', { wattage: 145, vram: '8GB GDDR7', specs: [['GPU', 'GeForce RTX 5060'], ['Memory', '8GB GDDR7'], ['Boost Clock', '2550 MHz'], ['Interface', 'PCIe 5.0 x8'], ['Power', '1x 8-pin, 145W'], ['Warranty', '3 years']] }],
      ['ASUS RTX 4060 Dual 8GB', 18750, 'ASUS', { wattage: 115, vram: '8GB GDDR6', specs: [['GPU', 'GeForce RTX 4060'], ['Memory', '8GB GDDR6'], ['Boost Clock', '2460 MHz'], ['Interface', 'PCIe 4.0 x8'], ['Power', '1x 8-pin, 115W'], ['Warranty', '3 years']] }],
      ['MSI RTX 4070 Super Ventus 2X', 36500, 'MSI', { wattage: 220, vram: '12GB GDDR6X', specs: [['GPU', 'GeForce RTX 4070 SUPER'], ['Memory', '12GB GDDR6X'], ['Boost Clock', '2520 MHz'], ['Interface', 'PCIe 4.0 x16'], ['Power', '2x 8-pin, 220W'], ['Warranty', '3 years']] }],
      ['Gigabyte RX 7600 Gaming OC 8GB', 17900, 'Gigabyte', { wattage: 165, vram: '8GB GDDR6', specs: [['GPU', 'Radeon RX 7600'], ['Memory', '8GB GDDR6'], ['Boost Clock', '2755 MHz'], ['Interface', 'PCIe 4.0 x8'], ['Power', '1x 8-pin, 165W'], ['Warranty', '3 years']] }],
      ['ASUS TUF RX 7800 XT OC 16GB', 32900, 'ASUS', { wattage: 263, vram: '16GB GDDR6', specs: [['GPU', 'Radeon RX 7800 XT'], ['Memory', '16GB GDDR6'], ['Boost Clock', '2520 MHz'], ['Interface', 'PCIe 4.0 x16'], ['Power', '2x 8-pin, 263W'], ['Warranty', '3 years']] }],
      ['ZOTAC RTX 5080 AMP Extreme 16GB', 65900, 'NVIDIA', { wattage: 360, vram: '16GB GDDR7', stock: 'order', specs: [['GPU', 'GeForce RTX 5080'], ['Memory', '16GB GDDR7'], ['Boost Clock', '2800 MHz'], ['Interface', 'PCIe 5.0 x16'], ['Power', '3x 8-pin, 360W'], ['Warranty', '3 years']] }],
    ],
  },
  {
    category: 'components', sub: 'memory', items: [
      ['Kingston Fury Beast 16GB DDR5 6000', 12850, 'Kingston', { memoryType: 'DDR5', specs: [['Type', 'DDR5'], ['Capacity', '16GB (2x8GB)'], ['Speed', '6000 MT/s'], ['Latency', 'CL36'], ['Profile', 'AMD EXPO / Intel XMP'], ['Warranty', 'Lifetime']] }],
      ['Kingston Fury Beast 8GB DDR4 3200', 1190, 'Kingston', { memoryType: 'DDR4', specs: [['Type', 'DDR4'], ['Capacity', '8GB (1x8GB)'], ['Speed', '3200 MT/s'], ['Latency', 'CL16'], ['Profile', 'Intel XMP'], ['Warranty', 'Lifetime']] }],
      ['Corsair Vengeance 32GB DDR5 6000', 15400, 'Corsair', { memoryType: 'DDR5', specs: [['Type', 'DDR5'], ['Capacity', '32GB (2x16GB)'], ['Speed', '6000 MT/s'], ['Latency', 'CL36'], ['Profile', 'Intel XMP 3.0'], ['Warranty', 'Lifetime']] }],
      ['TeamGroup T-Force Vulcan 16GB DDR4', 2250, 'TeamGroup', { memoryType: 'DDR4', specs: [['Type', 'DDR4'], ['Capacity', '16GB (2x8GB)'], ['Speed', '3200 MT/s'], ['Latency', 'CL16'], ['Profile', 'Intel XMP'], ['Warranty', 'Lifetime']] }],
      ['G.Skill Trident Z5 RGB 32GB DDR5', 17800, 'G.Skill', { memoryType: 'DDR5', specs: [['Type', 'DDR5'], ['Capacity', '32GB (2x16GB)'], ['Speed', '6400 MT/s'], ['Latency', 'CL32'], ['Lighting', 'RGB'], ['Warranty', 'Lifetime']] }],
      ['Kingston Fury 16GB DDR4 3200', 2650, 'Kingston', { memoryType: 'DDR4', specs: [['Type', 'DDR4'], ['Capacity', '16GB (2x8GB)'], ['Speed', '3200 MT/s'], ['Latency', 'CL16'], ['Profile', 'Intel XMP'], ['Warranty', 'Lifetime']] }],
    ],
  },
  {
    category: 'components', sub: 'storage', items: [
      ['Samsung 990 Pro 2TB NVMe', 24500, 'Samsung', { specs: [['Capacity', '2TB'], ['Form Factor', 'M.2 2280'], ['Interface', 'PCIe 4.0 x4'], ['Read Speed', '7,450 MB/s'], ['Write Speed', '6,900 MB/s'], ['Warranty', '5 years']] }],
      ['Kingston NV3 1TB NVMe', 3450, 'Kingston', { specs: [['Capacity', '1TB'], ['Form Factor', 'M.2 2280'], ['Interface', 'PCIe 4.0 x4'], ['Read Speed', '6,000 MB/s'], ['Write Speed', '4,000 MB/s'], ['Warranty', '3 years']] }],
      ['Crucial P3 Plus 500GB NVMe', 2350, 'Crucial', { specs: [['Capacity', '500GB'], ['Form Factor', 'M.2 2280'], ['Interface', 'PCIe 4.0 x4'], ['Read Speed', '4,700 MB/s'], ['Write Speed', '1,900 MB/s'], ['Warranty', '5 years']] }],
      ['Samsung 870 EVO 1TB SATA SSD', 4850, 'Samsung', { specs: [['Capacity', '1TB'], ['Form Factor', '2.5-inch'], ['Interface', 'SATA III'], ['Read Speed', '560 MB/s'], ['Write Speed', '530 MB/s'], ['Warranty', '5 years']] }],
      ['Seagate Barracuda 1TB HDD', 2250, 'Seagate', { specs: [['Capacity', '1TB'], ['Form Factor', '3.5-inch'], ['Interface', 'SATA III'], ['Cache', '64MB'], ['Speed', '7200 RPM'], ['Warranty', '2 years']] }],
      ['WD Black SN850X 2TB NVMe', 18900, 'WD', { specs: [['Capacity', '2TB'], ['Form Factor', 'M.2 2280'], ['Interface', 'PCIe 4.0 x4'], ['Read Speed', '7,300 MB/s'], ['Write Speed', '6,600 MB/s'], ['Warranty', '5 years']] }],
    ],
  },
  {
    category: 'components', sub: 'psu', items: [
      ['Corsair CX650 80+ Bronze', 3400, 'Corsair', { wattage: 650, specs: [['Wattage', '650W'], ['Efficiency', '80+ Bronze'], ['Modular', 'Non-modular'], ['Fan', '120mm'], ['Protection', 'OVP / UVP / SCP'], ['Warranty', '5 years']] }],
      ['Seasonic Focus GX-750 Gold', 5450, 'Seasonic', { wattage: 750, specs: [['Wattage', '750W'], ['Efficiency', '80+ Gold'], ['Modular', 'Fully modular'], ['Fan', '135mm FDB'], ['Protection', 'Full suite'], ['Warranty', '10 years']] }],
      ['MSI MAG A650BN Bronze', 2850, 'MSI', { wattage: 650, specs: [['Wattage', '650W'], ['Efficiency', '80+ Bronze'], ['Modular', 'Non-modular'], ['Fan', '120mm'], ['Protection', 'OCP / OVP / SCP'], ['Warranty', '5 years']] }],
      ['Corsair RM850e Gold', 7450, 'Corsair', { wattage: 850, specs: [['Wattage', '850W'], ['Efficiency', '80+ Gold'], ['Modular', 'Fully modular'], ['Fan', '120mm'], ['Standard', 'ATX 3.0 / PCIe 5.1'], ['Warranty', '7 years']] }],
      ['Deepcool PF700 80+ White', 3250, 'Deepcool', { wattage: 700, specs: [['Wattage', '700W'], ['Efficiency', '80+ White'], ['Modular', 'Non-modular'], ['Fan', '120mm'], ['Protection', 'OVP / OPP / SCP'], ['Warranty', '3 years']] }],
    ],
  },
  {
    category: 'components', sub: 'case', items: [
      ['Tecware Timber ATX Case', 2400, 'Tecware', { specs: [['Form Factor', 'Mid Tower ATX'], ['Side Panel', 'Tempered glass'], ['Fans', '3x 120mm ARGB included'], ['GPU Clearance', '330mm'], ['Front I/O', 'USB-C, USB 3.0 x2'], ['Warranty', '1 year']] }],
      ['NZXT H5 Flow', 4590, 'NZXT', { specs: [['Form Factor', 'Mid Tower ATX'], ['Side Panel', 'Tempered glass'], ['Fans', '2x 120mm included'], ['GPU Clearance', '365mm'], ['Front I/O', 'USB-C, USB-A'], ['Warranty', '2 years']] }],
      ['Lian Li Lancool 216', 5450, 'Lian Li', { specs: [['Form Factor', 'Mid Tower ATX'], ['Side Panel', 'Tempered glass'], ['Fans', '2x 160mm ARGB front'], ['GPU Clearance', '392mm'], ['Front I/O', 'USB-C, USB 3.0 x2'], ['Warranty', '2 years']] }],
      ['Darkflash DK352 Mesh', 1950, 'Darkflash', { specs: [['Form Factor', 'Mid Tower ATX'], ['Side Panel', 'Tempered glass'], ['Fans', '4x 120mm ARGB included'], ['GPU Clearance', '330mm'], ['Front I/O', 'USB 3.0 x1, USB 2.0 x2'], ['Warranty', '1 year']] }],
      ['Cooler Master MasterBox TD500', 5290, 'Cooler Master', { specs: [['Form Factor', 'Mid Tower ATX'], ['Side Panel', 'Tempered glass'], ['Fans', '3x 120mm ARGB included'], ['GPU Clearance', '410mm'], ['Front I/O', 'USB-C, USB 3.0 x2'], ['Warranty', '2 years']] }],
    ],
  },
  {
    category: 'components', sub: 'cooler', items: [
      ['Deepcool AK400 Digital', 2150, 'Deepcool', { specs: [['Type', 'Air cooler'], ['Height', '155mm'], ['Fans', '1x 120mm PWM'], ['TDP Support', '220W'], ['Sockets', 'AM4 / AM5 / LGA1700'], ['Warranty', '1 year']] }],
      ['Thermalright Peerless Assassin 120 SE', 2450, 'Thermalright', { specs: [['Type', 'Dual-tower air cooler'], ['Height', '155mm'], ['Fans', '2x 120mm PWM'], ['TDP Support', '265W'], ['Sockets', 'AM4 / AM5 / LGA1700'], ['Warranty', '1 year']] }],
      ['NZXT Kraken 240 AIO', 7250, 'NZXT', { specs: [['Type', '240mm AIO liquid'], ['Fans', '2x 120mm'], ['Display', 'LCD pump head'], ['TDP Support', '280W'], ['Sockets', 'AM4 / AM5 / LGA1700'], ['Warranty', '3 years']] }],
      ['Deepcool LE520 ARGB AIO', 3340, 'Deepcool', { specs: [['Type', '240mm AIO liquid'], ['Fans', '2x 120mm ARGB'], ['Pump', 'Anti-leak'], ['TDP Support', '220W'], ['Sockets', 'AM4 / AM5 / LGA1700'], ['Warranty', '2 years']] }],
      ['ID-Cooling SE-214-XT', 1190, 'ID-Cooling', { specs: [['Type', 'Air cooler'], ['Height', '150mm'], ['Fans', '1x 120mm PWM'], ['TDP Support', '180W'], ['Sockets', 'AM4 / LGA1700'], ['Warranty', '1 year']] }],
    ],
  },
  {
    category: 'computers', sub: 'gaming-pc', items: [
      ['TNC Starter Gaming PC — Ryzen 5 5600 + RTX 3050', 34900, 'TNC', { specs: [['CPU', 'AMD Ryzen 5 5600'], ['GPU', 'NVIDIA RTX 3050 8GB'], ['Memory', '16GB DDR4 3200'], ['Storage', '512GB NVMe SSD'], ['PSU', '550W 80+ Bronze'], ['Warranty', '2 years parts & labor']] }],
      ['TNC Esports PC — i5-12400F + RTX 4060', 46900, 'TNC', { specs: [['CPU', 'Intel Core i5-12400F'], ['GPU', 'NVIDIA RTX 4060 8GB'], ['Memory', '16GB DDR4 3200'], ['Storage', '1TB NVMe SSD'], ['PSU', '650W 80+ Bronze'], ['Warranty', '2 years parts & labor']] }],
      ['TNC Creator PC — Ryzen 7 7700 + RTX 4070', 79900, 'TNC', { specs: [['CPU', 'AMD Ryzen 7 7700'], ['GPU', 'NVIDIA RTX 4070 12GB'], ['Memory', '32GB DDR5 6000'], ['Storage', '1TB NVMe Gen4'], ['PSU', '750W 80+ Gold'], ['Warranty', '2 years parts & labor']] }],
      ['TNC Pro Workstation — Ryzen 9 7950X', 128900, 'TNC', { specs: [['CPU', 'AMD Ryzen 9 7950X'], ['GPU', 'NVIDIA RTX 4070 Super'], ['Memory', '64GB DDR5 6000'], ['Storage', '2TB NVMe Gen4'], ['PSU', '850W 80+ Gold'], ['Warranty', '2 years parts & labor']] }],
      ['TNC Mini ITX — Ryzen 5 8600G', 38900, 'TNC', { specs: [['CPU', 'AMD Ryzen 5 8600G'], ['GPU', 'Radeon 760M integrated'], ['Memory', '16GB DDR5 5600'], ['Storage', '1TB NVMe SSD'], ['PSU', '600W SFX Gold'], ['Warranty', '2 years parts & labor']] }],
    ],
  },
  {
    category: 'computers', sub: 'office-pc', items: [
      ['TNC Office Essential — i3-12100', 21900, 'TNC', { specs: [['CPU', 'Intel Core i3-12100'], ['GPU', 'Intel UHD 730'], ['Memory', '8GB DDR4 3200'], ['Storage', '256GB NVMe SSD'], ['PSU', '500W'], ['Warranty', '2 years parts & labor']] }],
      ['TNC Business Pro — i5-12400', 28900, 'TNC', { specs: [['CPU', 'Intel Core i5-12400'], ['GPU', 'Intel UHD 730'], ['Memory', '16GB DDR4 3200'], ['Storage', '512GB NVMe SSD'], ['OS', 'Windows 11 Pro'], ['Warranty', '2 years parts & labor']] }],
      ['TNC Home Office — Ryzen 5 5600G', 24900, 'TNC', { specs: [['CPU', 'AMD Ryzen 5 5600G'], ['GPU', 'Radeon Vega 7'], ['Memory', '16GB DDR4 3200'], ['Storage', '512GB NVMe SSD'], ['PSU', '500W 80+ Bronze'], ['Warranty', '2 years parts & labor']] }],
    ],
  },
  {
    category: 'computers', sub: 'laptops', items: [
      ['ASUS TUF Gaming A15 — Ryzen 5 7535HS + RTX 4050', 52995, 'ASUS', { specs: [['CPU', 'AMD Ryzen 5 7535HS'], ['GPU', 'NVIDIA RTX 4050 6GB'], ['Display', '15.6" FHD 144Hz'], ['Memory', '16GB DDR5'], ['Storage', '512GB NVMe SSD'], ['Warranty', '2 years']] }],
      ['Acer Nitro V15 — i7-13620H + RTX 4060', 61995, 'Acer', { specs: [['CPU', 'Intel Core i7-13620H'], ['GPU', 'NVIDIA RTX 4060 8GB'], ['Display', '15.6" FHD 144Hz'], ['Memory', '16GB DDR5'], ['Storage', '1TB NVMe SSD'], ['Warranty', '2 years']] }],
      ['Lenovo IdeaPad Slim 3 — i5-12450H', 32995, 'Lenovo', { specs: [['CPU', 'Intel Core i5-12450H'], ['GPU', 'Intel UHD'], ['Display', '15.6" FHD'], ['Memory', '16GB DDR4'], ['Storage', '512GB NVMe SSD'], ['Warranty', '2 years']] }],
      ['MSI Cyborg 15 — i5-12450H + RTX 4050', 49995, 'MSI', { specs: [['CPU', 'Intel Core i5-12450H'], ['GPU', 'NVIDIA RTX 4050 6GB'], ['Display', '15.6" FHD 144Hz'], ['Memory', '16GB DDR5'], ['Storage', '512GB NVMe SSD'], ['Warranty', '2 years']] }],
      ['Apple MacBook Air M2 13"', 61990, 'Apple', { specs: [['CPU', 'Apple M2 8-core'], ['GPU', '8-core integrated'], ['Display', '13.6" Liquid Retina'], ['Memory', '8GB unified'], ['Storage', '256GB SSD'], ['Warranty', '1 year Apple']] }],
      ['ASUS Vivobook 15 — i3-1215U', 27995, 'ASUS', { specs: [['CPU', 'Intel Core i3-1215U'], ['GPU', 'Intel UHD'], ['Display', '15.6" FHD'], ['Memory', '8GB DDR4'], ['Storage', '512GB NVMe SSD'], ['Warranty', '2 years']] }],
    ],
  },
  {
    category: 'computers', sub: 'workstation', items: [
      ['TNC Rendering Rig — Ryzen 9 7950X + RTX 4080', 149900, 'TNC', { stock: 'order', specs: [['CPU', 'AMD Ryzen 9 7950X'], ['GPU', 'NVIDIA RTX 4080 Super'], ['Memory', '64GB DDR5'], ['Storage', '2TB NVMe + 4TB HDD'], ['PSU', '1000W 80+ Gold'], ['Warranty', '2 years parts & labor']] }],
      ['TNC CAD Workstation — i7-14700K + RTX 4070', 96900, 'TNC', { stock: 'order', specs: [['CPU', 'Intel Core i7-14700K'], ['GPU', 'NVIDIA RTX 4070 12GB'], ['Memory', '32GB DDR5'], ['Storage', '2TB NVMe SSD'], ['PSU', '850W 80+ Gold'], ['Warranty', '2 years parts & labor']] }],
    ],
  },
  {
    category: 'peripherals', sub: 'monitor', items: [
      ['Nvision 24" 144Hz Gaming Monitor', 3950, 'Nvision', { specs: [['Size', '24 inch'], ['Resolution', '1920 x 1080'], ['Refresh Rate', '144Hz'], ['Panel', 'VA'], ['Ports', 'HDMI, DP'], ['Warranty', '1 year']] }],
      ['AOC 24G2SP 165Hz IPS', 9950, 'AOC', { specs: [['Size', '23.8 inch'], ['Resolution', '1920 x 1080'], ['Refresh Rate', '165Hz'], ['Panel', 'IPS'], ['Ports', 'HDMI x2, DP'], ['Warranty', '3 years']] }],
      ['ASUS TUF VG27AQ 27" 165Hz', 16950, 'ASUS', { specs: [['Size', '27 inch'], ['Resolution', '2560 x 1440'], ['Refresh Rate', '165Hz'], ['Panel', 'IPS'], ['Ports', 'HDMI, DP'], ['Warranty', '3 years']] }],
      ['Xiaomi A24i 23.8" Monitor', 3999, 'Xiaomi', { specs: [['Size', '23.8 inch'], ['Resolution', '1920 x 1080'], ['Refresh Rate', '100Hz'], ['Panel', 'IPS'], ['Ports', 'HDMI, DP'], ['Warranty', '1 year']] }],
      ['Samsung Odyssey G5 32" 1440p', 18900, 'Samsung', { specs: [['Size', '32 inch'], ['Resolution', '2560 x 1440'], ['Refresh Rate', '144Hz'], ['Panel', 'VA curved'], ['Ports', 'HDMI, DP'], ['Warranty', '2 years']] }],
      ['AOC 27B2H 27" Office Monitor', 6490, 'AOC', { specs: [['Size', '27 inch'], ['Resolution', '1920 x 1080'], ['Refresh Rate', '75Hz'], ['Panel', 'IPS'], ['Ports', 'HDMI, VGA'], ['Warranty', '3 years']] }],
    ],
  },
  {
    category: 'peripherals', sub: 'keyboard', items: [
      ['Redragon K611 RGB Mechanical Keyboard', 1350, 'Redragon', { specs: [['Layout', 'TKL 87-key'], ['Switch', 'Red linear'], ['Connection', 'USB-C wired'], ['Lighting', 'RGB'], ['Keycaps', 'Double-shot PBT'], ['Warranty', '1 year']] }],
      ['Logitech G Pro X TKL Lightspeed', 8990, 'Logitech', { specs: [['Layout', 'TKL'], ['Switch', 'GX Brown tactile'], ['Connection', 'Lightspeed wireless'], ['Lighting', 'LIGHTSYNC RGB'], ['Battery', 'Up to 50 hours'], ['Warranty', '2 years']] }],
      ['Keychron K2 V2 Wireless', 4590, 'Keychron', { specs: [['Layout', '75% 84-key'], ['Switch', 'Gateron Brown'], ['Connection', 'Bluetooth 5.1 / USB-C'], ['Lighting', 'White backlight'], ['Battery', '4000mAh'], ['Warranty', '1 year']] }],
      ['Royal Kludge RK61 60% Keyboard', 1750, 'Royal Kludge', { specs: [['Layout', '60% 61-key'], ['Switch', 'Red linear'], ['Connection', 'Bluetooth / USB-C'], ['Lighting', 'RGB'], ['Battery', '1450mAh'], ['Warranty', '1 year']] }],
      ['Razer BlackWidow V4 X', 5490, 'Razer', { specs: [['Layout', 'Full-size'], ['Switch', 'Razer Yellow'], ['Connection', 'USB wired'], ['Lighting', 'Chroma RGB'], ['Extras', 'Media keys, wrist rest'], ['Warranty', '2 years']] }],
    ],
  },
  {
    category: 'peripherals', sub: 'mouse', items: [
      ['Logitech G102 Lightsync Mouse', 1290, 'Logitech', { specs: [['Sensor', '8,000 DPI optical'], ['Buttons', '6 programmable'], ['Connection', 'USB wired'], ['Lighting', 'LIGHTSYNC RGB'], ['Weight', '85g'], ['Warranty', '2 years']] }],
      ['Razer DeathAdder V3 Mouse', 4490, 'Razer', { specs: [['Sensor', '30,000 DPI Focus Pro'], ['Buttons', '6 programmable'], ['Connection', 'USB wired'], ['Weight', '59g'], ['Switches', 'Optical Gen-3'], ['Warranty', '2 years']] }],
      ['Redragon M808 Storm Mouse', 990, 'Redragon', { specs: [['Sensor', '12,400 DPI optical'], ['Buttons', '8 programmable'], ['Connection', 'USB wired'], ['Lighting', 'RGB'], ['Weight', '85g'], ['Warranty', '1 year']] }],
      ['Logitech G304 Wireless Mouse', 2290, 'Logitech', { specs: [['Sensor', '12,000 DPI HERO'], ['Buttons', '6 programmable'], ['Connection', 'Lightspeed wireless'], ['Battery', '250 hours'], ['Weight', '99g'], ['Warranty', '2 years']] }],
      ['SteelSeries Rival 3 Mouse', 1950, 'SteelSeries', { specs: [['Sensor', '8,500 DPI TrueMove Core'], ['Buttons', '6 programmable'], ['Connection', 'USB wired'], ['Lighting', 'RGB'], ['Weight', '77g'], ['Warranty', '2 years']] }],
    ],
  },
  {
    category: 'peripherals', sub: 'headset', items: [
      ['HyperX Cloud II Gaming Headset', 4490, 'HyperX', { specs: [['Driver', '53mm neodymium'], ['Audio', '7.1 virtual surround'], ['Microphone', 'Detachable noise-cancelling'], ['Connection', 'USB / 3.5mm'], ['Compatibility', 'PC, PS5, Xbox'], ['Warranty', '2 years']] }],
      ['Logitech G335 Wired Headset', 2790, 'Logitech', { specs: [['Driver', '40mm'], ['Audio', 'Stereo'], ['Microphone', 'Flip-to-mute'], ['Connection', '3.5mm'], ['Weight', '240g'], ['Warranty', '2 years']] }],
      ['Redragon H510 Zeus Headset', 2150, 'Redragon', { specs: [['Driver', '53mm'], ['Audio', '7.1 virtual surround'], ['Microphone', 'Detachable'], ['Connection', 'USB / 3.5mm'], ['Weight', '310g'], ['Warranty', '1 year']] }],
      ['Razer BlackShark V2 X', 3290, 'Razer', { specs: [['Driver', '50mm TriForce'], ['Audio', '7.1 surround'], ['Microphone', 'HyperClear cardioid'], ['Connection', '3.5mm'], ['Weight', '240g'], ['Warranty', '2 years']] }],
    ],
  },
  {
    category: 'peripherals', sub: 'webcam', items: [
      ['A4Tech PK-910H Webcam', 1290, 'A4Tech', { specs: [['Resolution', '1080p Full HD'], ['Frame Rate', '30fps'], ['Microphone', 'Built-in'], ['Connection', 'USB 2.0'], ['Mount', 'Clip / tripod'], ['Warranty', '1 year']] }],
      ['Logitech C920 HD Pro Webcam', 3990, 'Logitech', { specs: [['Resolution', '1080p Full HD'], ['Frame Rate', '30fps'], ['Microphone', 'Dual stereo'], ['Connection', 'USB-A'], ['Features', 'Auto light correction'], ['Warranty', '2 years']] }],
    ],
  },
  {
    category: 'networking', sub: 'router', items: [
      ['TP-Link Archer AX55 WiFi 6 Router', 5290, 'TP-Link', { specs: [['Standard', 'Wi-Fi 6 AX3000'], ['Speed', '2402 Mbps (5GHz)'], ['Antennas', '4 external'], ['Ports', '4x Gigabit LAN'], ['Features', 'OneMesh, WPA3'], ['Warranty', '3 years']] }],
      ['TP-Link Archer C6 AC1200 Router', 1890, 'TP-Link', { specs: [['Standard', 'Wi-Fi 5 AC1200'], ['Speed', '867 Mbps (5GHz)'], ['Antennas', '4 external'], ['Ports', '4x Gigabit LAN'], ['Features', 'MU-MIMO, OneMesh'], ['Warranty', '3 years']] }],
      ['ASUS RT-AX57 WiFi 6 Router', 3990, 'ASUS', { specs: [['Standard', 'Wi-Fi 6 AX3000'], ['Speed', '2402 Mbps (5GHz)'], ['Antennas', '4 external'], ['Ports', '4x Gigabit LAN'], ['Features', 'AiMesh, AiProtection'], ['Warranty', '3 years']] }],
    ],
  },
  {
    category: 'networking', sub: 'switch', items: [
      ['TP-Link TL-SG1008D 8-Port Switch', 1450, 'TP-Link', { specs: [['Ports', '8x Gigabit'], ['Switching Capacity', '16 Gbps'], ['Housing', 'Metal'], ['Plug & Play', 'Yes'], ['Power', 'External adapter'], ['Warranty', '3 years']] }],
      ['TP-Link TL-SG1016D 16-Port Switch', 3290, 'TP-Link', { specs: [['Ports', '16x Gigabit'], ['Switching Capacity', '32 Gbps'], ['Housing', 'Rack-mount metal'], ['Plug & Play', 'Yes'], ['Power', 'Internal'], ['Warranty', '3 years']] }],
    ],
  },
  {
    category: 'networking', sub: 'extender', items: [
      ['TP-Link RE450 AC1750 Extender', 2490, 'TP-Link', { specs: [['Standard', 'Wi-Fi 5 AC1750'], ['Speed', '1300 Mbps (5GHz)'], ['Antennas', '3 external'], ['Port', '1x Gigabit Ethernet'], ['Features', 'OneMesh, AP mode'], ['Warranty', '3 years']] }],
      ['TP-Link RE315 AC1200 Extender', 1390, 'TP-Link', { specs: [['Standard', 'Wi-Fi 5 AC1200'], ['Speed', '867 Mbps (5GHz)'], ['Antennas', '2 external'], ['Port', '1x Ethernet'], ['Features', 'OneMesh, AP mode'], ['Warranty', '3 years']] }],
    ],
  },
  {
    category: 'networking', sub: 'adapter', items: [
      ['Ugreen USB-C to Gigabit Ethernet', 950, 'Ugreen', { specs: [['Interface', 'USB-C 3.0'], ['Speed', '10/100/1000 Mbps'], ['Chipset', 'RTL8153'], ['Compatibility', 'Windows, macOS, Linux'], ['Cable Length', '15cm'], ['Warranty', '1 year']] }],
      ['TP-Link UE300 USB 3.0 Ethernet', 790, 'TP-Link', { specs: [['Interface', 'USB 3.0'], ['Speed', '10/100/1000 Mbps'], ['Chipset', 'RTL8153'], ['Compatibility', 'Windows, macOS, Linux'], ['Design', 'Foldable'], ['Warranty', '3 years']] }],
    ],
  },
  {
    category: 'accessories', sub: 'hub', items: [
      ['Ugreen 6-in-1 USB-C Hub', 1490, 'Ugreen', { specs: [['Ports', 'HDMI, USB-C PD, USB 3.0 x3'], ['Display', '4K @ 30Hz'], ['Power Delivery', '100W pass-through'], ['Housing', 'Aluminum'], ['Compatibility', 'Windows, macOS'], ['Warranty', '1 year']] }],
      ['Baseus 8-in-1 USB-C Docking Hub', 2290, 'Baseus', { specs: [['Ports', 'HDMI, DP, USB x3, SD, LAN'], ['Display', '4K @ 60Hz'], ['Power Delivery', '100W'], ['Housing', 'Aluminum'], ['Compatibility', 'Windows, macOS'], ['Warranty', '1 year']] }],
    ],
  },
  {
    category: 'accessories', sub: 'deskmat', items: [
      ['Tecware Haste XL Deskmat', 690, 'Tecware', { specs: [['Size', '900 x 400 x 4mm'], ['Surface', 'Speed cloth'], ['Base', 'Anti-slip rubber'], ['Edges', 'Stitched'], ['Care', 'Hand wash'], ['Warranty', '6 months']] }],
      ['Razer Gigantus V2 Large', 1590, 'Razer', { specs: [['Size', '940 x 410 x 4mm'], ['Surface', 'Textured cloth'], ['Base', 'Anti-slip rubber'], ['Edges', 'Stitched'], ['Care', 'Hand wash'], ['Warranty', '1 year']] }],
    ],
  },
  {
    category: 'accessories', sub: 'charger', items: [
      ['Baseus 65W GaN Charger', 1390, 'Baseus', { specs: [['Output', '65W total'], ['Ports', '2x USB-C, 1x USB-A'], ['Protocol', 'PD 3.0 / QC 4+'], ['Size', 'Compact GaN'], ['Compatibility', 'Laptops, phones, tablets'], ['Warranty', '1 year']] }],
      ['Anker PowerCore 10,000mAh', 1990, 'Anker', { specs: [['Capacity', '10,000mAh'], ['Output', '20W USB-C PD'], ['Ports', 'USB-C, USB-A'], ['Weight', '212g'], ['Features', 'PowerIQ'], ['Warranty', '18 months']] }],
    ],
  },
  {
    category: 'accessories', sub: 'cooling', items: [
      ['Deepcool Z3 Thermal Paste', 320, 'Deepcool', { specs: [['Volume', '1.5g syringe'], ['Conductivity', '3.2 W/m-K'], ['Application', 'CPU / GPU'], ['Non-curing', 'Yes'], ['Electrical Safety', 'Non-conductive'], ['Warranty', '6 months']] }],
      ['Cooler Master CryoFuze Thermal Paste', 590, 'Cooler Master', { specs: [['Volume', '2g syringe'], ['Conductivity', '14 W/m-K'], ['Application', 'CPU / GPU'], ['Non-curing', 'Yes'], ['Electrical Safety', 'Non-conductive'], ['Warranty', '6 months']] }],
    ],
  },
  {
    category: 'gadgets', sub: 'printer', items: [
      ['Epson L3310 All-in-One Printer', 10450, 'Epson', { specs: [['Type', 'Ink tank all-in-one'], ['Functions', 'Print, scan, copy'], ['Print Speed', '10 ppm black'], ['Connectivity', 'Wi-Fi, USB'], ['Paper', 'A4, Letter'], ['Warranty', '2 years']] }],
      ['Canon PIXMA G2020 Printer', 8995, 'Canon', { specs: [['Type', 'Ink tank printer'], ['Functions', 'Print, scan, copy'], ['Print Speed', '9.1 ppm black'], ['Connectivity', 'USB'], ['Paper', 'A4, Letter'], ['Warranty', '2 years']] }],
      ['Brother DCP-T420W Printer', 10950, 'Brother', { specs: [['Type', 'Ink tank all-in-one'], ['Functions', 'Print, scan, copy'], ['Print Speed', '12 ppm black'], ['Connectivity', 'Wi-Fi, USB'], ['Paper', 'A4, Letter'], ['Warranty', '2 years']] }],
    ],
  },
  {
    category: 'gadgets', sub: 'tablet', items: [
      ['Samsung Galaxy Tab A9', 10990, 'Samsung', { specs: [['Display', '8.7" WXGA+'], ['Processor', 'MediaTek Helio G99'], ['Memory', '4GB + 64GB'], ['Battery', '5100mAh'], ['Connectivity', 'Wi-Fi'], ['Warranty', '1 year']] }],
      ['Xiaomi Pad 6', 17490, 'Xiaomi', { specs: [['Display', '11" 144Hz 2.8K'], ['Processor', 'Snapdragon 870'], ['Memory', '8GB + 128GB'], ['Battery', '8840mAh'], ['Connectivity', 'Wi-Fi 6'], ['Warranty', '1 year']] }],
    ],
  },
  {
    category: 'gadgets', sub: 'audio', items: [
      ['Logitech Z313 Speaker System', 1890, 'Logitech', { specs: [['Type', '2.1 desktop speakers'], ['Output', '25W RMS'], ['Subwoofer', 'Yes'], ['Connection', '3.5mm'], ['Controls', 'Wired control pod'], ['Warranty', '1 year']] }],
      ['JBL Go 4 Portable Speaker', 2990, 'JBL', { specs: [['Type', 'Portable Bluetooth speaker'], ['Output', '4.2W'], ['Battery', 'Up to 7 hours'], ['Waterproof', 'IP67'], ['Connection', 'Bluetooth 5.3'], ['Warranty', '1 year']] }],
    ],
  },
  {
    category: 'gadgets', sub: 'ups', items: [
      ['Secure UPS 1000VA', 2900, 'Secure', { specs: [['Capacity', '1000VA / 600W'], ['Type', 'Line interactive'], ['Outlets', '4 universal'], ['Backup Time', '15-30 minutes'], ['Protection', 'Surge, overload'], ['Warranty', '1 year']] }],
      ['APC Back-UPS 650VA', 3450, 'APC', { specs: [['Capacity', '650VA / 390W'], ['Type', 'Line interactive'], ['Outlets', '4 universal'], ['Backup Time', '15-25 minutes'], ['Protection', 'Surge, overload'], ['Warranty', '2 years']] }],
    ],
  },
];

const allItems = groups.flatMap((group) =>
  group.items.map(([name, price, brand, meta = {}]) => ({
    name, price, brand, meta, category: group.category, sub: group.sub,
  })),
);

const dealIds = new Set([
  'amd-ryzen-5-5600', 'gigabyte-b550m-k', 'gigabyte-rtx-5060-eagle-oc-8gb',
  'kingston-fury-beast-16gb-ddr5-6000', 'samsung-990-pro-2tb-nvme',
  'tecware-timber-atx-case', 'nvision-24-144hz-gaming-monitor',
  'redragon-k611-rgb-mechanical-keyboard', 'tp-link-archer-ax55-wifi-6-router',
  'epson-l3310-all-in-one-printer', 'secure-ups-1000va',
  'asus-tuf-gaming-a15-ryzen-5-7535hs-rtx-4050',
].map((s) => s));

const seen = new Set();
export const products = allItems.map((item, index) => {
  let id = slugify(item.name);
  if (seen.has(id)) id = `${id}-${index}`;
  seen.add(id);
  const parsedPrice = item.price;
  const isDeal = dealIds.has(id) || item.meta.deal;
  const stock = item.meta.stock || (index % 5 === 4 ? 'order' : 'in');
  const oldPrice = isDeal ? Math.round(parsedPrice * (1.1 + ((index % 4) * 0.04)) / 10) * 10 : null;
  const ratings = [4.5, 4.6, 4.7, 4.8, 4.9, 4.4];
  return {
    id,
    name: item.name,
    brand: item.brand,
    category: item.category,
    sub: item.sub,
    price: parsedPrice,
    oldPrice,
    stock,
    socket: item.meta.socket || null,
    memoryType: item.meta.memoryType || null,
    wattage: item.meta.wattage || null,
    tdp: item.meta.tdp || null,
    specs: item.meta.specs || [],
    rating: ratings[index % ratings.length],
    reviews: 12 + ((index * 17) % 148),
    sold: 20 + ((index * 29) % 400),
    deal: isDeal,
    featured: index < 8 || isDeal,
    badge: item.meta.badge || null,
    branchStock: {
      balanga: stock === 'in',
      pilar: stock === 'in' && index % 3 !== 0,
      dinalupihan: stock === 'in' && index % 4 !== 1,
    },
  };
});

export const services = [
  { id: 'os-installation', name: 'OS Installation & Setup', price: 1000, duration: '1–2 hours', description: 'Windows or Linux install, drivers, essential apps and updates.', icon: 'Laptop' },
  { id: 'pc-cleaning', name: 'PC / Laptop Deep Cleaning', price: 800, duration: '2–3 hours', description: 'Full dust removal, fan servicing and thermal repaste.', icon: 'Sparkles' },
  { id: 'diagnostics', name: 'Repair & Diagnostics', price: 500, duration: 'Same day', description: 'Hardware diagnosis with transparent repair quote. Waived if repaired.', icon: 'Wrench' },
  { id: 'data-backup', name: 'Data Backup & Migration', price: 1200, duration: '2–4 hours', description: 'Clone or back up your drive safely before service or upgrade.', icon: 'DatabaseBackup' },
  { id: 'custom-build', name: 'Custom PC Assembly', price: 1500, duration: 'Same day', description: 'Professional cable-managed build, stress test and BIOS tuning.', icon: 'Cpu' },
  { id: 'virus-removal', name: 'Virus Removal & Tune-up', price: 900, duration: '1–2 hours', description: 'Malware cleanup, startup optimization and security setup.', icon: 'ShieldCheck' },
];

export const blogPosts = [
  {
    slug: 'budget-gaming-pc-2026',
    title: 'Build a 1080p gaming PC for under ₱40,000 in 2026',
    excerpt: 'Our Balanga build team breaks down the parts that matter most — and where you can safely save.',
    date: 'October 18, 2026',
    readTime: '6 min read',
    category: 'Build Guides',
    icon: 'Cpu',
    body: [
      'A great 1080p gaming build does not require the most expensive parts. The goal is balance: a capable six-core processor, a modern 8GB graphics card, 16GB of dual-channel memory and a fast NVMe drive.',
      'For this build we recommend the Ryzen 5 5600 paired with a B550 motherboard. It keeps platform costs low while leaving room for a GPU upgrade later. Pair it with an RTX 4060 or RX 7600 and you can comfortably hit high frame rates in esports titles and 60+ FPS in modern AAA games.',
      'Do not overspend on a case, but do not ignore airflow. Two intake fans and one exhaust fan are enough for this class of hardware. A quality 650W 80+ Bronze power supply protects your investment.',
      'Every part in this guide is available at TNC Tech Hub Balanga. Our technicians can assemble, cable-manage and stress-test your build in-store the same day.',
    ],
  },
  {
    slug: 'hydrate-your-laptop',
    title: '5 signs your laptop needs a thermal repaste',
    excerpt: 'High temps, fan noise and sudden throttling usually point to one maintenance item.',
    date: 'September 26, 2026',
    readTime: '4 min read',
    category: 'Maintenance',
    icon: 'Fan',
    body: [
      'Laptop cooling systems degrade over time. Dust clogs the fins and factory thermal paste dries out, especially in warm climates like Bataan.',
      'Signs to watch for include fans running at full speed during light tasks, performance drops after a few minutes of gaming, and surface temperatures that feel uncomfortable to touch.',
      'A professional cleaning and repaste takes our technicians around two hours. We test before and after temperatures so you can see the difference.',
      'Book a cleaning at our Balanga Main branch. Walk-ins are welcome daily from 10:00 AM to 6:30 PM.',
    ],
  },
  {
    slug: 'home-credit-guide',
    title: 'Home Credit for your next upgrade: what to prepare',
    excerpt: 'A practical checklist so your in-store application is quick and hassle-free.',
    date: 'September 8, 2026',
    readTime: '3 min read',
    category: 'Buying Guide',
    icon: 'WalletCards',
    body: [
      'Home Credit lets you spread the cost of a new laptop, GPU or pre-built PC over 6 to 24 months. Approval and terms depend on the lender.',
      'Bring at least two valid government IDs, proof of income or employment, and your contact details. Students may apply with a co-borrower.',
      'Use our online installment calculator for an estimate, then visit the branch for the official quote. Down payments start at 10% and promo rates change monthly.',
      'Our staff can walk you through the application at any TNC Tech Hub branch. No online application is required for this prototype.',
    ],
  },
];

export const getProduct = (id) => products.find((product) => product.id === id);
export const getCategory = (id) => categories.find((category) => category.id === id);
export const getSubcategory = (catId, subId) => {
  const cat = getCategory(catId);
  return cat?.subs.find((sub) => sub.id === subId);
};
export const getBrandCount = (brand) => products.filter((p) => p.brand === brand).length;
export const brandsWithCounts = [...new Set(products.map((p) => p.brand))]
  .sort()
  .map((name) => ({ name, count: getBrandCount(name) }));

export const featuredProductIds = [
  'asus-tuf-gaming-a15-ryzen-5-7535hs-rtx-4050',
  'gigabyte-rtx-5060-eagle-oc-8gb',
  'amd-ryzen-7-7800x3d',
  'nvision-24-144hz-gaming-monitor',
  'corsair-cx650-80-bronze',
  'tecware-timber-atx-case',
];

export const dealProducts = products.filter((p) => p.deal);
export const pcBuilderParts = {
  cpu: products.filter((p) => p.sub === 'cpu'),
  motherboard: products.filter((p) => p.sub === 'motherboard'),
  memory: products.filter((p) => p.sub === 'memory'),
  gpu: products.filter((p) => p.sub === 'gpu'),
  storage: products.filter((p) => p.sub === 'storage'),
  psu: products.filter((p) => p.sub === 'psu'),
  case: products.filter((p) => p.sub === 'case'),
  cooler: products.filter((p) => p.sub === 'cooler'),
};
