import { useState, useEffect, type ReactNode } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { ChevronDown, Menu, X, LogIn } from 'lucide-react';
import { APP_URL, LOGO } from '@/lib/config';
import { useMarketingEvent } from '@/lib/marketing';
import { Cta } from '@/components/bits';
import { audienceQuery } from '@/lib/audience';

const SHOW_PRICING = false; // enable once pricing and packaging are approved
const solutions = [
  { href: '/solutions/contractors', t: 'For Contractors', d: 'Run permitting in-house' },
  { href: '/solutions/permit-expediters', t: 'For Permit Expediters', d: 'Manage many clients' },
];
const nav = [
  { href: '/features', t: 'Features' },
  { href: '/how-it-works', t: 'How It Works' },
  { href: '/about', t: 'About' },
];

function SignIn({ className = '' }: { className?: string }) {
  const sendEvent = useMarketingEvent();
  return (
    <a href={APP_URL} onClick={() => sendEvent('cta_sign_in')} data-testid="link-sign-in"
      className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-md border border-foreground/30 hover:bg-secondary ${className}`}>
      <LogIn className="h-4 w-4" aria-hidden /> Sign In
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [sol, setSol] = useState(false);
  const [loc] = useLocation();
  const q = audienceQuery(loc, useSearch());
  useEffect(() => { setOpen(false); setSol(false); }, [loc]);
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:bg-card focus:p-2">Skip to content</a>
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 flex items-center gap-6">
        <Link href="/" aria-label="Permits Manager home" data-testid="link-home" className="shrink-0">
          <img src={LOGO} alt="Permits Manager" className="h-11 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center gap-1 ml-4" aria-label="Main">
          <div className="relative" onMouseLeave={() => setSol(false)}>
            <button aria-expanded={sol} aria-haspopup="true" onClick={() => setSol(!sol)} onMouseEnter={() => setSol(true)}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary" data-testid="button-solutions">
              Solutions <ChevronDown className={`h-4 w-4 transition-transform ${sol ? 'rotate-180' : ''}`} aria-hidden />
            </button>
            {sol && (
              <div className="absolute left-0 top-full pt-1 w-72">
                <div className="bg-card border-2 border-foreground p-2 shadow-[5px_5px_0_0_hsl(var(--foreground))]">
                  {solutions.map((s) => (
                    <Link key={s.href} href={s.href} className="block p-3 hover:bg-secondary" data-testid={`link-nav-${s.href.split('/').pop()}`}>
                      <span className="block font-semibold text-sm">{s.t}</span>
                      <span className="block text-xs text-muted-foreground">{s.d}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} data-testid={`link-nav-${n.href.slice(1)}`}
              className={`px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary ${loc === n.href ? 'text-primary' : ''}`}>{n.t}</Link>
          ))}
          {SHOW_PRICING && <Link href="/pricing" className="px-3 py-2 text-sm font-medium">Pricing</Link>}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SignIn />
          <div className="hidden sm:flex items-center gap-2"><Cta href={`/signup${q}`} variant="ghost" id="header-get-started">Get Started</Cta><Cta href={`/demo${q}`} id="header-demo">Request a Demo</Cta></div>
          <button className="lg:hidden p-2 border border-foreground/30 rounded-md" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
            onClick={() => setOpen(!open)} data-testid="button-menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden border-t border-border bg-background px-5 py-4 grid gap-1" aria-label="Mobile">
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground pt-1">Solutions</p>
          {solutions.map((s) => <Link key={s.href} href={s.href} className="py-2 font-semibold">{s.t}</Link>)}
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground pt-2">Explore</p>
          {nav.map((n) => <Link key={n.href} href={n.href} className="py-2 font-semibold">{n.t}</Link>)}
          <div className="pt-3 flex flex-wrap gap-3"><Cta href={`/demo${q}`} id="mobile-demo">Request a Demo</Cta><Cta href={`/signup${q}`} variant="ghost" id="mobile-get-started">Get Started</Cta></div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const sendEvent = useMarketingEvent();
  const [loc] = useLocation();
  const q = audienceQuery(loc, useSearch());
  const col = 'grid gap-2 text-sm';
  const h = 'font-mono text-[11px] uppercase tracking-widest text-[hsl(200_88%_62%)] mb-3';
  return (
    <footer className="ink-dark">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="inline-block bg-background p-2 rounded-md"><img src={LOGO} alt="Permits Manager" className="h-14 w-auto" /></div>
          <p className="mt-4 text-sm max-w-xs text-background/75">Permitting operations software, built from permit expediting experience.</p>
        </div>
        <div><p className={h}>Product</p><div className={col}>
          <Link href="/features">Features</Link><Link href="/how-it-works">How It Works</Link><Link href="/about">About</Link></div></div>
        <div><p className={h}>Solutions</p><div className={col}>
          <Link href="/solutions/contractors">For Contractors</Link><Link href="/solutions/permit-expediters">For Permit Expediters</Link>
          <Link href={`/demo${q}`} data-testid="link-footer-demo">Request a Demo</Link><Link href={`/signup${q}`}>Get Started</Link></div></div>
        <div><p className={h}>Company</p><div className={col}>
          <a href={APP_URL} onClick={() => sendEvent('cta_sign_in')}>Sign In</a><Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
      </div>
      <div className="border-t border-background/15 py-5 text-center text-xs text-background/60">Permits Manager</div>
    </footer>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
