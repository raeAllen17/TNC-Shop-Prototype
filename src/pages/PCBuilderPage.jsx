import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, Cpu,
  RotateCcw, ShoppingCart, Sparkles, Zap,
} from 'lucide-react';
import ProductVisual from '../components/ProductVisual';
import Button from '../components/ui/Button';
import { Badge } from '../components/ui/primitives';
import { useStore } from '../context/StoreContext';
import { getProduct, pcBuilderParts } from '../data/products';
import { formatPeso, getProductStock } from '../lib/format';
import Icon from '../components/Icon';

const steps = [
  { key: 'cpu', label: 'CPU', icon: 'Cpu', hint: 'The brain of your build' },
  { key: 'motherboard', label: 'Motherboard', icon: 'CircuitBoard', hint: 'The platform that connects it all' },
  { key: 'memory', label: 'RAM', icon: 'MemoryStick', hint: 'Memory for gaming and multitasking' },
  { key: 'gpu', label: 'GPU', icon: 'Gpu', hint: 'Graphics for gaming and creation' },
  { key: 'storage', label: 'Storage', icon: 'HardDrive', hint: 'Fast storage for Windows and games' },
  { key: 'psu', label: 'Power Supply', icon: 'PlugZap', hint: 'Clean, reliable power' },
  { key: 'case', label: 'Case', icon: 'Box', hint: 'Airflow and space for your parts' },
  { key: 'cooler', label: 'Cooler', icon: 'Fan', hint: 'Keep temperatures in check' },
];

const defaultBuild = {};

const readBuild = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('tnc-build') || '{}');
    return { ...defaultBuild, ...saved };
  } catch {
    return defaultBuild;
  }
};

const boardMemoryType = (board) => {
  const text = board?.specs.flat().join(' ') || '';
  if (text.includes('DDR5')) return 'DDR5';
  if (text.includes('DDR4')) return 'DDR4';
  return null;
};

const coolerSupports = (cooler, socket) => {
  if (!cooler || !socket) return true;
  return cooler.specs.flat().join(' ').includes(socket);
};

export default function PCBuilderPage() {
  const [selection, setSelection] = useState(readBuild);
  const [stepIndex, setStepIndex] = useState(0);
  const { addManyToCart, setCartOpen, branch, setBranchModalOpen } = useStore();

  useEffect(() => {
    try { localStorage.setItem('tnc-build', JSON.stringify(selection)); } catch { /* in-memory only */ }
  }, [selection]);

  const step = steps[stepIndex];
  const selectedProducts = useMemo(
    () => Object.fromEntries(
      Object.entries(selection).map(([key, id]) => [key, getProduct(id)]).filter(([, value]) => value),
    ),
    [selection],
  );
  const selectedList = Object.values(selectedProducts);
  const total = selectedList.reduce((sum, product) => sum + product.price, 0);
  const selectedCount = selectedList.length;

  const cpu = selectedProducts.cpu;
  const motherboard = selectedProducts.motherboard;
  const memory = selectedProducts.memory;
  const gpu = selectedProducts.gpu;
  const psu = selectedProducts.psu;
  const cooler = selectedProducts.cooler;

  const warnings = useMemo(() => {
    const list = [];
    if (cpu && motherboard && cpu.socket !== motherboard.socket) {
      list.push({ type: 'error', text: `${cpu.name} is ${cpu.socket}; ${motherboard.name} is ${motherboard.socket}. Choose a matching motherboard.` });
    }
    const boardMemory = boardMemoryType(motherboard);
    if (memory && boardMemory && memory.memoryType !== boardMemory) {
      list.push({ type: 'error', text: `${memory.name} is ${memory.memoryType}, but this board uses ${boardMemory}.` });
    }
    if (cpu && cooler && !coolerSupports(cooler, cpu.socket)) {
      list.push({ type: 'error', text: `${cooler.name} does not list ${cpu.socket} support. Choose a compatible cooler.` });
    }
    return list;
  }, [cpu, motherboard, memory, cooler]);

  const estimatedWatts = (cpu?.tdp || 0) + (gpu?.wattage || 0) + (selectedCount ? 70 : 0) + (selectedProducts.storage ? 8 : 0) + (selectedProducts.case ? 10 : 0);
  const recommendedPsu = Math.max(450, Math.ceil((estimatedWatts + 160) / 50) * 50);
  const psuWarning = psu && psu.wattage < estimatedWatts + 100;

  const compatibilityOk = warnings.length === 0;
  const missingCore = ['cpu', 'motherboard', 'memory'].filter((key) => !selectedProducts[key]).length;

  const choose = (key, productId) => {
    setSelection((current) => {
      if (current[key] === productId) {
        const next = { ...current };
        delete next[key];
        return next;
      }
      return { ...current, [key]: productId };
    });
  };

  const optionProducts = useMemo(() => {
    const list = pcBuilderParts[step.key] || [];
    if (step.key === 'motherboard' && cpu) {
      return [...list].sort((a, b) => Number(b.socket === cpu.socket) - Number(a.socket === cpu.socket) || a.price - b.price);
    }
    if (step.key === 'memory' && motherboard) {
      const boardMemory = boardMemoryType(motherboard);
      return [...list].sort((a, b) => Number(b.memoryType === boardMemory) - Number(a.memoryType === boardMemory) || a.price - b.price);
    }
    if (step.key === 'psu') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    return list;
  }, [step.key, cpu, motherboard]);

  const handleAddAll = () => {
    if (!selectedList.length) return;
    addManyToCart(selectedList.map((product) => product.id));
    setCartOpen(true);
  };

  return (
    <>
      <section className="relative overflow-hidden border-b">
        <div className="hero-mesh absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="container-page relative py-8 sm:py-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <nav className="mb-3 flex items-center gap-1 text-[10px] text-muted" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-primary">Home</Link>
                <ChevronRight size={10} />
                <span className="font-semibold text-ink">PC Builder</span>
              </nav>
              <span className="chip border-primary/30 bg-primary-soft text-primary"><Cpu size={12} /> Guided compatibility build</span>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">Build your PC.</h1>
              <p className="mt-2 max-w-lg text-sm leading-6 text-muted">
                Pick each component with live prices, socket checks and a wattage estimate. Our team can assemble it for you.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[10px]">
              <span className="chip border-success/30 bg-success/10 text-success"><CheckCircle2 size={12} /> {selectedCount}/8 selected</span>
              <span className={`chip ${compatibilityOk ? 'border-success/30 bg-success/10 text-success' : 'border-warning/30 bg-warning/10 text-warning'}`}>
                {compatibilityOk ? 'Compatibility clear' : `${warnings.length} warning${warnings.length === 1 ? '' : 's'}`}
              </span>
              {branch && <button type="button" onClick={() => setBranchModalOpen(true)} className="chip border-line bg-surface text-muted hover:border-primary hover:text-primary">{branch.short} stock</button>}
            </div>
          </div>
        </div>
      </section>

      <div className="container-page py-6 sm:py-8">
        <div className="mb-6 overflow-x-auto no-scrollbar">
          <ol className="flex min-w-[760px] items-center gap-1" aria-label="Build steps">
            {steps.map((item, index) => {
              const active = index === stepIndex;
              const done = Boolean(selectedProducts[item.key]);
              return (
                <li key={item.key} className="flex flex-1 items-center">
                  <button
                    type="button"
                    onClick={() => setStepIndex(index)}
                    className={`flex w-full items-center gap-1.5 rounded-lg border px-2 py-2 text-left transition ${
                      active
                        ? 'border-primary bg-primary-soft'
                        : done
                          ? 'border-success/25 bg-success/5'
                          : 'border-line bg-surface'
                    }`}
                    aria-current={active ? 'step' : undefined}
                  >
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                      active ? 'bg-primary text-white' : done ? 'bg-success text-[#07130c]' : 'bg-surface-2 text-muted'
                    }`}>
                      {done && !active ? <Check size={10} strokeWidth={3} /> : index + 1}
                    </span>
                    <span className={`truncate text-[10px] font-bold ${active ? 'text-primary' : 'text-ink'}`}>{item.label}</span>
                  </button>
                  {index < steps.length - 1 && <ChevronRight size={12} className="mx-0.5 shrink-0 text-muted" />}
                </li>
              );
            })}
          </ol>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_370px]">
          <div className="min-w-0">
            <div className="card overflow-hidden">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary"><Icon name={step.icon} size={20} /></span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">Step {stepIndex + 1} of {steps.length}</p>
                    <h2 className="font-display text-lg font-bold text-ink">{step.label}</h2>
                    <p className="mt-0.5 text-[11px] text-muted">{step.hint}</p>
                  </div>
                </div>
                {selectedProducts[step.key] && (
                  <button type="button" onClick={() => choose(step.key, selectedProducts[step.key].id)} className="text-[10px] font-semibold text-muted hover:text-primary">
                    Clear selection
                  </button>
                )}
              </div>

              {step.key === 'motherboard' && cpu && (
                <div className={`flex items-center gap-2 border-b px-5 py-2.5 text-[10px] ${warnings.length ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}`}>
                  {warnings.length ? <AlertTriangle size={13} /> : <CheckCircle2 size={13} />}
                  {warnings.length ? 'Some options do not match your selected CPU. Look for the socket badge.' : `Showing boards compatible with your ${cpu.socket} CPU first.`}
                </div>
              )}

              <div className="grid gap-2.5 p-4 sm:grid-cols-2 xl:grid-cols-3">
                {optionProducts.map((product) => {
                  const active = selection[step.key] === product.id;
                  const stock = getProductStock(product, branch?.id);
                  const boardSocketMismatch = step.key === 'motherboard' && cpu && product.socket !== cpu.socket;
                  const memoryMismatch = step.key === 'memory' && motherboard && product.memoryType !== boardMemoryType(motherboard);
                  const psuUnder = step.key === 'psu' && product.wattage < estimatedWatts + 100;
                  const mismatched = boardSocketMismatch || memoryMismatch || psuUnder;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => choose(step.key, product.id)}
                      className={`group relative flex flex-col overflow-hidden rounded-xl border text-left transition ${
                        active
                          ? 'border-primary bg-primary-soft shadow-glow'
                          : mismatched
                            ? 'border-warning/30 bg-surface opacity-80 hover:border-warning'
                            : 'border-line bg-surface hover:border-primary/50'
                      }`}
                      aria-pressed={active}
                    >
                      <div className="relative">
                        <ProductVisual product={product} className="aspect-[16/9] w-full" showMeta={false} />
                        <span className="absolute left-2 top-2">
                          <Badge variant={stock.available ? 'success' : 'warning'} dot className="!px-1.5 !py-0.5 !text-[8px]">
                            {stock.available ? 'In stock' : 'Order basis'}
                          </Badge>
                        </span>
                        {active && (
                          <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                            <Check size={11} strokeWidth={3} />
                          </span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-2.5">
                        <p className="text-[8px] font-bold uppercase tracking-wide text-muted">{product.brand}</p>
                        <p className="mt-0.5 line-clamp-2 min-h-[30px] text-[11px] font-semibold leading-[15px] text-ink">{product.name}</p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-1">
                          {product.socket && <span className={boardSocketMismatch ? 'rounded bg-warning/15 px-1 py-0.5 text-[8px] font-bold text-warning' : 'rounded bg-surface-2 px-1 py-0.5 text-[8px] font-bold text-muted'}>{product.socket}</span>}
                          {product.memoryType && <span className={memoryMismatch ? 'rounded bg-warning/15 px-1 py-0.5 text-[8px] font-bold text-warning' : 'rounded bg-surface-2 px-1 py-0.5 text-[8px] font-bold text-muted'}>{product.memoryType}</span>}
                          {product.wattage && <span className={psuUnder ? 'rounded bg-warning/15 px-1 py-0.5 text-[8px] font-bold text-warning' : 'rounded bg-surface-2 px-1 py-0.5 text-[8px] font-bold text-muted'}>{product.wattage}W</span>}
                          {mismatched && <span className="text-[8px] font-bold text-warning">Check fit</span>}
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-1 pt-2">
                          <span className="text-[11px] font-bold text-primary">{formatPeso(product.price)}</span>
                          <span className="text-[8px] text-muted">{product.rating.toFixed(1)} ★</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-2 border-t p-4">
                <Button variant="secondary" size="sm" disabled={stepIndex === 0} onClick={() => setStepIndex((index) => Math.max(0, index - 1))}>
                  <ArrowLeft size={14} /> Back
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setStepIndex((index) => Math.min(steps.length - 1, index + 1))}>Skip</Button>
                  <Button size="sm" disabled={stepIndex === steps.length - 1} onClick={() => setStepIndex((index) => Math.min(steps.length - 1, index + 1))}>
                    Next step <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="card mt-4 flex flex-col items-start justify-between gap-3 p-4 sm:flex-row sm:items-center">
              <p className="flex items-start gap-2 text-[11px] leading-5 text-muted">
                <Sparkles size={15} className="mt-0.5 shrink-0 text-primary" />
                Not sure? Our technicians can finalize parts, assemble and stress-test the build for {formatPeso(1500)}.
              </p>
              <Button to="/contact" variant="secondary" size="sm" className="shrink-0">Ask for help</Button>
            </div>
          </div>

          <aside className="lg:sticky lg:top-[128px] lg:self-start">
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between border-b p-4">
                <div>
                  <h2 className="font-display text-base font-bold text-ink">Your build</h2>
                  <p className="text-[10px] text-muted">{selectedCount} of 8 components</p>
                </div>
                {selectedCount > 0 && (
                  <button type="button" onClick={() => setSelection({})} className="flex items-center gap-1 text-[10px] font-semibold text-muted hover:text-primary">
                    <RotateCcw size={11} /> Reset
                  </button>
                )}
              </div>

              <ul className="divide-y">
                {steps.map((item, index) => {
                  const product = selectedProducts[item.key];
                  return (
                    <li key={item.key}>
                      <button
                        type="button"
                        onClick={() => setStepIndex(index)}
                        className="flex w-full items-center gap-2 p-3 text-left transition hover:bg-surface-2/60"
                      >
                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${product ? 'bg-primary-soft text-primary' : 'bg-surface-2 text-muted'}`}>
                          {product ? <Check size={12} /> : <Icon name={item.icon} size={13} />}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[9px] font-bold uppercase tracking-wide text-muted">{item.label}</span>
                          <span className={`block truncate text-[10px] ${product ? 'font-semibold text-ink' : 'text-muted'}`}>
                            {product ? product.name : 'Choose a component'}
                          </span>
                        </span>
                        <span className="shrink-0 text-[10px] font-bold text-ink">{product ? formatPeso(product.price) : '—'}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-muted">Build total</span>
                  <span className="font-display text-xl font-bold text-ink">{formatPeso(total)}</span>
                </div>

                <div className="mb-3 rounded-lg bg-surface-2 p-3">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1 text-muted"><Zap size={12} className="text-primary" /> Estimated draw</span>
                    <span className="font-bold text-ink">{estimatedWatts}W</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                    <div className={`h-full rounded-full transition-all ${psuWarning ? 'bg-warning' : 'bg-success'}`} style={{ width: `${Math.min(100, (estimatedWatts / (recommendedPsu || 1)) * 100)}%` }} />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[9px] text-muted">
                    <span>Recommended PSU</span>
                    <span>{recommendedPsu}W</span>
                  </div>
                </div>

                {warnings.length > 0 && (
                  <div className="mb-3 space-y-1.5">
                    {warnings.map((warning, index) => (
                      <div key={index} className="flex items-start gap-1.5 rounded-lg border border-warning/25 bg-warning/10 p-2 text-[9px] leading-4 text-warning">
                        <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                        {warning.text}
                      </div>
                    ))}
                  </div>
                )}

                {psuWarning && (
                  <div className="mb-3 flex items-start gap-1.5 rounded-lg border border-warning/25 bg-warning/10 p-2 text-[9px] leading-4 text-warning">
                    <AlertTriangle size={12} className="mt-0.5 shrink-0" />
                    {psu.name} may be too close to the estimated draw. We recommend at least {recommendedPsu}W.
                  </div>
                )}

                {missingCore > 0 && selectedCount > 0 && (
                  <p className="mb-2 text-[9px] leading-4 text-muted">
                    Add a CPU, motherboard and memory for a working core system.
                  </p>
                )}

                <Button onClick={handleAddAll} disabled={selectedCount === 0} className="w-full" size="lg">
                  <ShoppingCart size={16} /> Add all to cart
                </Button>
                {warnings.length > 0 && (
                  <p className="mt-2 text-center text-[9px] leading-4 text-warning">You can still add these parts — our team will verify compatibility.</p>
                )}
                <p className="mt-2 flex items-center justify-center gap-1 text-center text-[9px] text-muted">
                  <CheckCircle2 size={11} className="text-success" /> Local pickup or assembly available
                </p>
              </div>
            </div>

            {branch && (
              <p className="mt-3 rounded-lg border bg-surface px-3 py-2 text-[10px] text-muted">
                Showing stock for <strong className="text-ink">{branch.name}</strong>. Order-basis parts arrive in 2–5 business days.
              </p>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
