import { useRef } from 'react';
import { Link, useLocation, useSearch } from 'wouter';
import { IntroVideo } from '@/components/intro-video';
import { trackHeroEvent } from '@/lib/hero-analytics';
import { useMarketingEvent } from '@/lib/marketing';
import { audienceQuery } from '@/lib/audience';
import { Eye, Link2, Users, ArrowUpRight, ClipboardList, FolderOpen, UserCheck, Receipt, CheckSquare, ArrowRight } from 'lucide-react';
import { Seo } from '@/components/seo';
import { Shell } from '@/components/layout';
import { Cta, Eyebrow, H2, Reveal, Section } from '@/components/bits';
import { DashboardMock } from '@/components/product-ui';
import { PaperworkTimeSavers } from '@/components/paperwork-time-savers';
import { JobsitePhoto } from '@/components/jobsite-photo';
import { groups, steps } from '@/lib/content';

const benefits = [
  { i: Eye, t: 'See where work stands', d: 'Projects, permits and inspections in one view, so status is a lookup instead of a round of emails.' },
  { i: Link2, t: 'Keep documents and responsibilities connected', d: 'Files live with the permit they belong to, and every task has an owner attached.' },
  { i: Users, t: 'Coordinate follow-up across the team', d: 'Assign the next step, see who has it, and keep inspections and corrections moving.' },
];
const faqs = [
  { q: 'Is Permits Manager software or a filing service?', a: 'It is software. Your team, or your expediting firm, uses it to manage projects, permits, inspections, documents and assignments. It does not file permits on your behalf.' },
  { q: 'Which jurisdictions does it support?', a: 'You record the jurisdiction on each project and permit, so you can track work in any jurisdiction you deal with. Automatic form filling is available for supported jurisdictions you have saved, and that list is growing.' },
  { q: 'Can we mark up and sign permit PDFs?', a: 'Yes. You can annotate permit PDFs and add signatures directly inside the app, then save the updated document and share it.' },
  { q: 'Can we bring in existing contractor records?', a: 'Yes, you can import your existing contractors.' },
  { q: 'How does setup work?', a: 'We offer a guided walkthrough to get you up and running fast. Send a demo, trial setup or access request, tell us about your company, and we will follow up to arrange setup and onboarding training.' },
  { q: 'What does the QuickBooks support cover?', a: 'QuickBooks can pull in your accounts and fees for a quick, painless setup. Supported QuickBooks Online exports are also available for billing information.' },
  { q: 'How do I get pricing?', a: 'Request a demo and ask for a pricing discussion. We will talk through your team and what you need.' },
];
const fit = [
  'Your team handles permitting regularly across multiple active jobs.',
  'Status updates, documents, and follow-up are spread across spreadsheets and inboxes.',
  'More than one person needs to know what is happening next.',
];
const industries = [
  { id: 'roofing', h: '/solutions/contractors/roofing', t: 'Roofing' },
  { id: 'windows-and-doors', h: '/solutions/contractors/windows-and-doors', t: 'Windows and Doors' },
  { id: 'hvac', h: '/solutions/contractors/hvac', t: 'HVAC' },
  { id: 'contractors', h: '/solutions/contractors', t: 'Other contractors' },
  { id: 'permit-expediters', h: '/solutions/permit-expediters', t: 'Permit expediters', alt: true },
];
const icons = [ClipboardList, FolderOpen, UserCheck, Receipt];

export default function Home() {
  const trialClicked = useRef(false);
  const sendEvent = useMarketingEvent();
  return (
    <Shell>
      <Seo title="Permits Manager | Permit management software for contractors and expediters" description="Manage projects, permits, inspections, documents and team responsibilities in one workspace. Built by permit expediters for contractors and expediting firms." />
      <section className="grid-paper border-b border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8 pt-6 pb-8 md:pt-10 md:pb-10 grid lg:grid-cols-[1fr_1.1fr] gap-x-10 gap-y-6 items-center">
          <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
            <Reveal><Eyebrow>Permit management software for contractors &amp; expediters</Eyebrow></Reveal>
            <Reveal delay={0.05}><h1 data-testid="text-hero-title" className="font-display text-[2.1rem] sm:text-4xl md:text-5xl xl:text-[3.5rem] font-extrabold leading-[1.03]">Keep every <span className="text-primary">permit</span> and every next step in view.</h1></Reveal>
            <Reveal delay={0.1}><p className="mt-4 text-base md:text-lg max-w-xl text-foreground/85">Manage permits across active jobs and jurisdictions with clear assignments, connected documents, and inspection follow-up. Built for contractors handling permitting in-house and firms managing it for their clients.</p></Reveal>
          </div>
          <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2"><Reveal delay={0.15}><IntroVideo /></Reveal></div>
          <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
            <Reveal delay={0.18}>
              <div className="flex flex-wrap gap-3">
                <Link href="/demo" onClick={() => { if (!trialClicked.current) { trialClicked.current = true; trackHeroEvent('hero_trial_click'); } sendEvent('cta_request_demo'); }} data-testid="link-hero-demo"
                  className="inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-semibold transition-transform duration-200 hover:-translate-y-0.5 bg-primary text-primary-foreground shadow-[4px_4px_0_0_hsl(var(--foreground))] hover:shadow-[6px_6px_0_0_hsl(var(--foreground))]">
                  Request a Demo / Free Trial <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Cta href="/features" variant="ghost" id="hero-features">Explore Features</Cta>
              </div>
              <p data-testid="text-hero-offer" className="mt-4 text-sm font-semibold text-foreground">30-day trial. Free standard setup and onboarding training. No credit card required.</p>
              <p data-testid="text-hero-clarify" className="mt-1 text-xs text-foreground/70">Send a request and we follow up to arrange your demo or trial setup.</p>
              <p data-testid="text-hero-origin" className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-foreground/70">Built from real permit-expediting experience.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="industry-heading" className="border-b-2 border-foreground bg-card">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 md:py-7 grid lg:grid-cols-[auto_1fr] gap-x-8 gap-y-4 items-center">
          <h2 id="industry-heading" className="font-display text-xl md:text-2xl font-bold leading-tight">Built for your permitting workflow</h2>
          <ul className="flex flex-wrap gap-2.5">
            {industries.map((x) => (
              <li key={x.h}>
                <Link href={x.h} data-testid={`link-industry-${x.id}`}
                  className={`group inline-flex items-center gap-1.5 border-2 border-foreground px-3.5 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${x.alt ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-secondary'}`}>
                  {x.t} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PaperworkTimeSavers ctaHref="/features#g1" ctaLabel="See document features" id="home-paperwork" />

      <section className="border-b border-border bg-muted">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-16 grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
          <Reveal><Eyebrow>Inside the workspace</Eyebrow><H2>Every project, permit and inspection on one screen.</H2>
            <p className="mt-5 text-foreground/80 max-w-md">The dashboard your team opens each morning: what is open, what is waiting on the jurisdiction, and who owns the next step.</p></Reveal>
          <Reveal delay={0.1}><DashboardMock /></Reveal>
        </div>
      </section>

      <Section dark>
        <Reveal><Eyebrow dark>Core benefits</Eyebrow><H2 dark>Less chasing. More clarity on every permit.</H2></Reveal>
        <div className="mt-12 grid md:grid-cols-3 gap-px bg-background/20">
          {benefits.map((b, i) => (
            <Reveal key={b.t} delay={i * 0.08} className="bg-[hsl(236_55%_10%)] p-7">
              <b.i className="h-7 w-7 text-primary" aria-hidden />
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
          <Reveal delay={0.1}>
            <figure className="m-0">
              <div className="overflow-hidden border border-foreground/20 shadow-[8px_8px_0_0_hsl(var(--primary))]">
                <JobsitePhoto
                  trade="roofing"
                  alt="A worker fastening shingles on a residential roof."
                  sizes="(min-width: 1024px) 600px, 100vw"
                />
              </div>
              <figcaption className="mt-4 font-mono text-[11px] text-muted-foreground">
                Illustrative roofing work. Photo: Pexels.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <Section id="fit">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
          <Reveal><Eyebrow>Is this a fit?</Eyebrow><H2>You will likely recognize at least one of these.</H2>
            <p className="mt-5 text-foreground/80 max-w-md">If these situations sound familiar, request a demo to see how Permits Manager fits your team’s recurring permitting work.</p></Reveal>
          <ul className="border-t-2 border-foreground">
            {fit.map((f, i) => (
              <Reveal key={f} delay={i * 0.06}>
                <li data-testid={`text-fit-${i}`} className="list-none flex gap-5 items-baseline border-b border-foreground/30 py-5">
                  <CheckSquare className="h-5 w-5 shrink-0 text-primary translate-y-0.5" aria-hidden />
                  <span className="font-display text-xl md:text-2xl font-bold">{f}</span>
                </li>
              </Reveal>
            ))}
            <Reveal><div className="pt-6"><Cta href="/demo" id="fit-demo" arrow>Request a Demo / Free Trial</Cta></div></Reveal>
          </ul>
        </div>
      </Section>

      <Section className="bg-muted" id="faq">
        <Reveal><Eyebrow>FAQ</Eyebrow><H2>Questions buyers ask first.</H2></Reveal>
        <dl className="mt-10 grid md:grid-cols-2 gap-x-12">
          {faqs.map((f) => (
            <div key={f.q} className="border-t-2 border-foreground py-5" data-testid="faq-item">
              <dt className="font-display text-xl font-bold">{f.q}</dt>
              <dd className="mt-2 text-foreground/80">{f.a}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6"><Cta href="/demo" id="faq-demo" arrow>Request a Demo / Free Trial</Cta></div>
      </Section>

      <FinalCta />
    </Shell>
  );
}

export function FinalCta({ title = 'Bring your permitting operation into one workspace.', bt, q: fixedQ }: { title?: string; bt?: string; q?: string }) {
  const [loc] = useLocation();
  const search = useSearch();
  const q = fixedQ ?? (audienceQuery(loc, search) || (bt ? `?businessType=${bt}` : ''));
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-[1] max-w-4xl">{title}</h2>
          <div className="mt-10 flex flex-wrap gap-4"><Cta href={`/demo${q}`} variant="light" id="final-demo" arrow>Request a Demo / Free Trial</Cta><Cta href={`/signup${q}`} variant="line" id="final-get-started">Request Trial Setup</Cta></div>
          <p className="mt-5 text-sm text-primary-foreground/85">30-day trial. Free standard setup and onboarding training. No credit card required. We follow up on every request.</p>
        </Reveal>
      </div>
    </section>
  );
}
