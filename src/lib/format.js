export const formatPeso = (value) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

export const formatPesoShort = (value) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export const formatMonthly = (value) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export const calculateInstallment = (price, downPaymentPercent, months) => {
  const total = Number(price) || 0;
  const downPayment = Math.round(total * (clamp(downPaymentPercent, 10, 100) / 100));
  const principal = Math.max(total - downPayment, 0);
  const monthly = months > 0 ? principal / months : 0;
  return {
    total,
    downPayment,
    principal,
    monthly,
    months,
    downPaymentPercent,
  };
};

export const getProductStock = (product, branchId) => {
  if (!product) return { available: false, label: 'Unavailable' };
  if (product.stock === 'order') return { available: false, label: 'Order Basis', branchAvailable: false };
  if (!branchId) return { available: true, label: 'In Stock', branchAvailable: true };
  const available = Boolean(product.branchStock?.[branchId]);
  return {
    available,
    branchAvailable: available,
    label: available ? 'In Stock' : 'Order Basis',
  };
};

export const isNew = (id) => {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) hash = (hash * 31 + id.charCodeAt(i)) % 997;
  return hash % 9 === 0;
};

export const slugify = (value = '') =>
  value.toLowerCase().replace(/["']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const addDays = (date, days) => {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
};

export const formatDate = (value) =>
  new Intl.DateTimeFormat('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(value),
  );
