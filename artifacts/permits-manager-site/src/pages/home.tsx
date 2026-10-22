import { Link } from 'wouter';
import { Eye, Link2, Users, ArrowUpRight, ClipboardList, FolderOpen, UserCheck, Receipt } from 'lucide-react';
import { Seo } from '@/components/seo';
import { Shell } from '@/components/layout';
import { Cta, Eyebrow, H2, Reveal, Section } from '@/components/bits';
import { DashboardMock } from '@/components/product-ui';
import { groups, steps } from '@/lib/content';

const benefits = [
  { i: Eye, t: 'See where work stands', d: 'Projects, permits and inspections in one view, so status is a lookup instead of a round of emails.' },
  { i: Link2, t: 'Keep documents and responsibilities connected', d: 'Files live with the permit they belong to, and every task has an owner attached.' },
  { i: Users, t: 'Coordinate follow-up across the team', d: 'Assign the next step, see who has it, and keep inspections and corrections moving.' },
];
const icons = [ClipboardList, FolderOpen, UserCheck, Receipt];

export default function Home() {
  return (
    <Shell>
      <Seo title="Permits Manager | Permitting operations software" description="Manage projects, permits, inspections, documents and team responsibilities in one workspace. Built by permit expediters for contractors and expediting firms." />
      <section className="grid-paper border-b border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8 pt-14 pb-16 md:pt-24 md:pb-28 grid lg:grid-cols-[1fr_1.15fr] gap-12 items-center">
          <div>
            <Reveal><Eyebrow>Permitting operations platform</Eyebrow></Reveal>
            <Reveal delay={0.05}><h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.98]">Take control of your <span className="text-primary">permitting</span> operation.</h1></Reveal>
            <Reveal delay={0.12}><p className="mt-6 text-lg max-w-xl text-foreground/85">Manage projects, permits, inspections, documents, and team responsibilities in one workspace. Built by permit expediters for contractors managing permitting in-house and the professionals who manage it for others.</p></Reveal>
            <Reveal delay={0.18}><div className="mt-8 flex flex-wrap gap-4"><Cta href="/signup" id="hero-get-started" arrow>Get Started</Cta><Cta href="/demo" variant="ghost" id="hero-demo">Request a Demo</Cta></div></Reveal>
          </div>
          <Reveal delay={0.2} className="lg:-mr-24"><DashboardMock /></Reveal>
        </div>
      </section>

      <Section>
        <Reveal><Eyebrow>Choose your path</Eyebrow><H2>Two ways to work permits. One product.</H2></Reveal>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {[
            { h: '/solutions/contractors', t: 'Manage Permitting In-House', d: 'For permit coordinators, office managers, operations and project managers at specialty and general contractors.', c: 'bg-card' },
            { h: '/solutions/permit-expediters', t: 'Run a Permit Expediting Business', d: 'For owners, expediters, coordinators and accounting staff managing permits for multiple contractor clients.', c: 'bg-primary text-primary-foreground' },
          ].map((a, i) => (
            <Reveal key={a.h} delay={i * 0.08}>
              <Link href={a.h} data-testid={`card-audience-${i}`} className={`group block h-full border-2 border-foreground p-7 md:p-10 shadow-[6px_6px_0_0_hsl(var(--foreground))] transition-transform hover:-translate-y-1 ${a.c}`}>
                <ArrowUpRight className="h-8 w-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
                <h3 className="font-display text-3xl font-bold mt-10">{a.t}</h3>
                <p className={`mt-3 ${i ? 'text-primary-foreground/90' : 'text-foreground/80'}`}>{a.d}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section dark>
        <Reveal><Eyebrow dark>Core benefits</Eyebrow><H2 dark>Less chasing. More clarity on every permit.</H2></Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-px bg-background/20">
          {benefits.map((b, i) => (
            <Reveal key={b.t} delay={i * 0.08} className="bg-[hsl(236_55%_10%)] p-7">
              <b.i className="h-7 w-7 text-accent" aria-hidden />
              <h3 className="font-display text-xl font-bold mt-6">{b.t}</h3>
              <p className="mt-2 text-background/75">{b.d}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal><Eyebrow>Product capabilities</Eyebrow><H2>Four groups of tools for the work behind every permit.</H2></Reveal>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {groups.map((g, i) => {
            const Ic = icons[i];
            return (
              <Reveal key={g.t} delay={(i % 2) * 0.08}>
                <div className="h-full border-2 border-border bg-card p-7">
                  <Ic className="h-7 w-7 text-primary" aria-hidden />
                  <h3 className="font-display text-2xl font-bold mt-4">{g.t}</h3>
                  <p className="mt-2 text-foreground/80">{g.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-8"><Cta href="/features" variant="ghost" id="home-features" arrow>Explore all features</Cta></div>
      </Section>

      <Section className="bg-muted">
        <Reveal><Eyebrow>Workflow</Eyebrow><H2>From new project to final report.</H2></Reveal>
        <ol className="mt-12 grid gap-0 md:grid-cols-3 lg:grid-cols-6 border-t-2 border-foreground">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.05}>
              <li className="list-none p-5 border-b md:border-b-0 md:border-r border-foreground/30 h-full">
                <span className="font-mono text-sm text-accent font-semibold">0{i + 1}</span>
                <h3 className="font-display text-xl font-bold mt-2">{s.t}</h3>
                <p className="text-sm mt-2 text-foreground/80">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="mt-8"><Cta href="/how-it-works" variant="ghost" id="home-how" arrow>See the full walkthrough</Cta></div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <Eyebrow>Built from real permitting experience</Eyebrow>
            <H2>Designed by people who have expedited permits for a living.</H2>
            <p className="mt-6 text-lg text-foreground/85 max-w-xl">Permits Manager grew out of permit expediting work: juggling jurisdictions, missing documents, inspection windows and client requests. The product reflects that daily reality, for in-house teams and expediting firms alike.</p>
            <div className="mt-8"><Cta href="/about" variant="ghost" id="home-about" arrow>Read the story</Cta></div>
          </Reveal>
          <Reveal delay={0.1}><DashboardMock label /></Reveal>
        </div>
      </Section>

      <FinalCta />
    </Shell>
  );
}

export function FinalCta({ title = 'Bring your permitting operation into one workspace.' }: { title?: string }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-[1] max-w-4xl">{title}</h2>
          <div className="mt-10 flex flex-wrap gap-4"><Cta href="/signup" variant="light" id="final-get-started" arrow>Get Started</Cta><Cta href="/demo" variant="line" id="final-demo">Request a Demo</Cta></div>
        </Reveal>
      </div>
    </section>
  );
}
