import { Link, useLocation } from 'react-router-dom';
import { Presentation, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export default function PitchFab() {
  const { pitchMode, setPitchMode, showToast } = useStore();
  const { pathname } = useLocation();
  const onProduct = pathname.startsWith('/product/');

  const toggle = () => {
    setPitchMode(!pitchMode);
    showToast(pitchMode ? 'Pitch highlights hidden.' : 'Pitch highlights enabled — numbered pins show what changed.', 'info');
  };

  return (
    <div className={`${onProduct ? 'hidden md:flex' : 'flex'} fixed bottom-[78px] left-4 z-[78] items-center rounded-xl border border-primary/30 bg-surface/95 p-1 shadow-float backdrop-blur-xl md:bottom-6 md:left-6`}>
      <Link
        to="/pitch"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-ink transition hover:bg-primary-soft hover:text-primary"
        aria-label="Open the client pitch deck"
      >
        <Presentation size={15} className="text-primary" />
        Pitch
      </Link>
      <div className="mx-0.5 h-5 w-px bg-line" />
      <button
        type="button"
        onClick={toggle}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[10px] font-bold transition ${
          pitchMode ? 'bg-primary text-white' : 'text-muted hover:bg-surface-2 hover:text-ink'
        }`}
        aria-pressed={pitchMode}
        aria-label={pitchMode ? 'Hide pitch highlights' : 'Show pitch highlights'}
      >
        <Sparkles size={13} />
        <span className="hidden sm:inline">{pitchMode ? 'On' : 'Highlights'}</span>
      </button>
    </div>
  );
}
