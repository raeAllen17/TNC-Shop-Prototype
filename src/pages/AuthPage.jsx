import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Check, Eye, EyeOff, Facebook, Heart, LockKeyhole, Mail, MapPin, ShieldCheck, User } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Button from '../components/ui/Button';
import { Badge } from '../components/ui/primitives';

export default function AuthPage() {
  const location = useLocation();
  const isRegisterRoute = location.pathname === '/register';
  const [mode, setMode] = useState(isRegisterRoute ? 'register' : 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [done, setDone] = useState(false);
  const { showToast } = useStore();

  useEffect(() => {
    setMode(location.pathname === '/register' ? 'register' : 'login');
    setDone(false);
  }, [location.pathname]);

  const setField = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    if (mode === 'register' && form.password !== form.confirm) {
      showToast('Passwords do not match.', 'error');
      return;
    }
    if (mode === 'register') {
      showToast('Account creation is coming soon. Guest checkout is ready now.', 'info', 4200);
      setDone(true);
      return;
    }
    showToast(`Demo sign-in successful for ${form.email}.`, 'success');
    setDone(true);
  };

  const social = (provider) => showToast(`${provider} sign-in is coming soon.`, 'info');

  return (
    <div className="container-page py-8 sm:py-14">
      <div className="mx-auto grid max-w-4xl overflow-hidden rounded-2xl border bg-surface shadow-card lg:grid-cols-[1fr_.85fr]">
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary"><LockKeyhole size={20} /></span>
            <h1 className="font-display text-2xl font-bold tracking-tight text-ink">
              {mode === 'login' ? 'Welcome back.' : 'Create your account.'}
            </h1>
            <p className="mt-1.5 text-xs leading-5 text-muted">
              {mode === 'login' ? 'Sign in to view orders and saved builds.' : 'Optional — guest checkout is always available.'}
            </p>
          </div>

          <div className="mb-5 flex rounded-xl border bg-surface-2 p-1" role="tablist" aria-label="Account access">
            {[['login', 'Sign in'], ['register', 'Register']].map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={mode === value}
                onClick={() => { setMode(value); setDone(false); }}
                className={`min-h-[36px] flex-1 rounded-lg text-xs font-bold transition ${mode === value ? 'bg-surface text-primary shadow-sm' : 'text-muted hover:text-ink'}`}
              >
                {label}
              </button>
            ))}
          </div>

          {done ? (
            <div className="rounded-xl border border-success/25 bg-success/10 p-5 text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-success text-[#07130c]"><Check size={22} strokeWidth={3} /></span>
              <h2 className="mt-3 font-display text-lg font-bold text-ink">
                {mode === 'login' ? 'Demo sign-in complete' : 'Account demo noted'}
              </h2>
              <p className="mx-auto mt-1.5 max-w-xs text-[11px] leading-5 text-muted">
                This prototype keeps accounts in demo mode. Your cart, wishlist and branch are already saved locally.
              </p>
              <Button to="/shop" className="mt-4" size="sm">Continue shopping <ArrowRight size={14} /></Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3.5">
              {mode === 'register' && (
                <div>
                  <label htmlFor="auth-name" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Full name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                    <input id="auth-name" required value={form.name} onChange={(event) => setField('name', event.target.value)} className="input pl-10" placeholder="Juan Dela Cruz" autoComplete="name" />
                  </div>
                </div>
              )}
              <div>
                <label htmlFor="auth-email" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Email address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input id="auth-email" type="email" required value={form.email} onChange={(event) => setField('email', event.target.value)} className="input pl-10" placeholder="you@email.com" autoComplete="email" />
                </div>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="auth-password" className="text-[10px] font-bold uppercase tracking-wide text-muted">Password</label>
                  {mode === 'login' && (
                    <button type="button" onClick={() => showToast('Password reset is coming soon. Contact the store for help.', 'info')} className="text-[10px] font-semibold text-primary hover:underline">Forgot?</button>
                  )}
                </div>
                <div className="relative">
                  <LockKeyhole size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                  <input id="auth-password" type={showPassword ? 'text' : 'password'} required minLength={6} value={form.password} onChange={(event) => setField('password', event.target.value)} className="input pl-10 pr-10" placeholder="At least 6 characters" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              {mode === 'register' && (
                <div>
                  <label htmlFor="auth-confirm" className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-muted">Confirm password</label>
                  <input id="auth-confirm" type={showPassword ? 'text' : 'password'} required value={form.confirm} onChange={(event) => setField('confirm', event.target.value)} className="input" placeholder="Repeat password" autoComplete="new-password" />
                </div>
              )}
              {mode === 'register' && (
                <label className="flex cursor-pointer items-start gap-2 text-[10px] leading-4 text-muted">
                  <input type="checkbox" required className="mt-0.5 h-3.5 w-3.5 accent-[var(--primary)]" />
                  I agree to the <Link to="/terms" className="font-semibold text-primary hover:underline">Terms</Link> and <Link to="/privacy" className="font-semibold text-primary hover:underline">Privacy Policy</Link>.
                </label>
              )}
              <Button type="submit" size="lg" className="w-full">
                {mode === 'login' ? 'Sign in' : 'Create account'} <ArrowRight size={15} />
              </Button>
            </form>
          )}

          {!done && (
            <>
              <div className="my-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-line" />
                <span className="text-[9px] font-semibold uppercase tracking-wide text-muted">or continue with</span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => social('Google')} className="btn-secondary !min-h-[38px] !text-[11px]">Google</button>
                <button type="button" onClick={() => social('Facebook')} className="btn-secondary !min-h-[38px] !text-[11px]"><Facebook size={14} /> Facebook</button>
              </div>
              <p className="mt-4 text-center text-[10px] text-muted">
                No password needed to buy. <Link to="/checkout" className="font-bold text-primary hover:underline">Continue as guest</Link>
              </p>
            </>
          )}
        </div>

        <div className="relative hidden overflow-hidden border-l bg-surface-2/60 p-8 lg:block">
          <div className="hero-mesh absolute inset-0 opacity-80" aria-hidden="true" />
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <Badge variant="primary"><Heart size={10} /> TNC account perks</Badge>
              <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-ink">Less friction.<br />More upgrades.</h2>
              <div className="mt-6 space-y-4">
                {[
                  [Heart, 'Save your wishlist and builds across visits.'],
                  [MapPin, 'Remember your branch for accurate local stock.'],
                  [ShieldCheck, 'Track reservations and warranty requests.'],
                ].map(([PerkIcon, copy]) => (
                  <div key={copy} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary"><PerkIcon size={15} /></span>
                    <p className="pt-1 text-[11px] leading-5 text-muted">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border bg-surface/80 p-4 backdrop-blur">
              <p className="text-[10px] leading-5 text-muted">
                <strong className="text-ink">Prototype note:</strong> authentication is intentionally stubbed. Cart, wishlist and branch storage are fully working without an account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
