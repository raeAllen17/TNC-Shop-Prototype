import { useStore } from '../../context/StoreContext';
import { Modal } from '../ui/Overlays';
import { branches } from '../../data/products';
import { Check, Clock3, MapPin, Navigation } from 'lucide-react';

export default function BranchModal() {
  const { branchModalOpen, setBranchModalOpen, branchId, setBranch } = useStore();

  return (
    <Modal
      open={branchModalOpen}
      onClose={() => setBranchModalOpen(false)}
      title="Choose your home branch"
      size="lg"
      footer={
        <p className="flex items-start gap-2 text-[11px] leading-5 text-muted">
          <Navigation size={14} className="mt-0.5 shrink-0 text-primary" />
          We use your branch to show accurate stock availability and pickup options. You can change it anytime from the header.
        </p>
      }
    >
      <p className="-mt-1 mb-4 text-sm leading-6 text-muted">
        TNC Tech Hub has three branches across Bataan. Pick the one nearest you — we&apos;ll remember it on this device.
      </p>
      <div className="space-y-2.5">
        {branches.map((branch) => {
          const selected = branchId === branch.id;
          return (
            <button
              key={branch.id}
              type="button"
              onClick={() => setBranch(branch.id)}
              className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                selected
                  ? 'border-primary bg-primary-soft shadow-glow'
                  : 'border-line bg-surface-2 hover:border-primary/50'
              }`}
            >
              <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${selected ? 'bg-primary text-white' : 'bg-surface text-primary'}`}>
                {selected ? <Check size={17} /> : <MapPin size={17} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold text-ink">{branch.name}</span>
                  {branch.id === 'balanga' && (
                    <span className="rounded-md bg-primary-soft px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary">Main</span>
                  )}
                </span>
                <span className="mt-1 block text-xs leading-5 text-muted">{branch.address}</span>
                <span className="mt-1 flex items-center gap-1 text-[10px] text-muted">
                  <Clock3 size={11} /> {branch.hours}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      {!branchId && (
        <button
          type="button"
          onClick={() => setBranchModalOpen(false)}
          className="mt-4 w-full text-center text-xs font-semibold text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          I&apos;ll choose later
        </button>
      )}
    </Modal>
  );
}
