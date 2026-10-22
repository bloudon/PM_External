import { type ReactNode } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useMarketingEvent, type MarketingEventName } from '@/lib/marketing';

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.55, delay, ease: [0.2, 0.7, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

const base = 'inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0';
const variants = {
  primary: 'bg-primary text-primary-foreground shadow-[4px_4px_0_0_hsl(var(--foreground))] hover:shadow-[6px_6px_0_0_hsl(var(--foreground))]',
  ghost: 'border-2 border-foreground text-foreground bg-card hover:bg-secondary',
  light: 'bg-background text-foreground hover:bg-card',
  line: 'border-2 border-background/60 text-background hover:bg-background/10',
};
export function Cta({ href, children, variant = 'primary', arrow, id }: { href: string; children: ReactNode; variant?: keyof typeof variants; arrow?: boolean; id: string }) {
  const sendEvent = useMarketingEvent();
  const eventName: MarketingEventName | undefined =
    href === '/signup' ? 'cta_get_started' : href === '/demo' ? 'cta_request_demo' : undefined;
  return (
    <Link href={href} onClick={() => eventName && sendEvent(eventName)} className={`${base} ${variants[variant]}`} data-testid={`link-${id}`}>
      {children}
      {arrow && <ArrowRight className="h-4 w-4" aria-hidden />}
    </Link>
  );
}

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`font-mono text-xs uppercase tracking-[0.18em] mb-4 flex items-center gap-2 ${dark ? 'text-[hsl(200_88%_62%)]' : 'text-primary'}`}>
      <span className="h-2 w-2 bg-accent inline-block" aria-hidden />
      {children}
    </p>
  );
}

export function Section({ children, className = '', dark, id }: { children: ReactNode; className?: string; dark?: boolean; id?: string }) {
  return (
    <section id={id} className={`${dark ? 'ink-dark' : ''} ${className}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24">{children}</div>
    </section>
  );
}

export function H2({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return <h2 className={`font-display text-3xl md:text-5xl font-bold leading-[1.05] max-w-3xl ${dark ? 'text-background' : ''}`}>{children}</h2>;
}
