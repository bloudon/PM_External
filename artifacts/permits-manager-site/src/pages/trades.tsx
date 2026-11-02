import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { Seo } from '@/components/seo';
import { Shell } from '@/components/layout';
import { Cta, Eyebrow, H2, Reveal, Section } from '@/components/bits';
import { mocks } from '@/components/product-ui';
import { JobsitePhoto } from '@/components/jobsite-photo';
import { FinalCta } from '@/pages/home';

type Mk = keyof typeof mocks;
export type TradeSlug = 'roofing' | 'windows-and-doors' | 'hvac';

interface Trade {
  slug: TradeSlug; label: string; title: string; desc: string;
  h1: string; lead: string; tag: string;
  situations: { t: string; d: string }[];
  job: { name: string; steps: { k: string; t: string; d: string }[] };
  pairs: { user: string; owner: string }[];
  shots: { m: Mk; t: string; d: string }[];
  photo?: { trade: 'roofing' | 'windows'; alt: string; caption: string };
  faqs: { q: string; a: string }[];
  cta: string;
}

const fill = 'Automatic application filling is available for supported saved jurisdictions, and coverage is growing. For other jurisdictions, the application still lives with the job and permit.';
const pdf = 'Your team can mark up permit PDFs, add signatures, then save and share the updated files inside the application. Your team or expediter handles submission to the jurisdiction.';

export const trades: Record<TradeSlug, Trade> = {
  roofing: {
    slug: 'roofing', label: 'Roofing',
    title: 'Permit management for roofing contractors | Permits Manager',
    desc: 'For roofing offices pulling permits on many jobs at once. Track approvals, corrections and inspections across jurisdictions so crews are not held up.',
    tag: 'High job volume', h1: 'Roofing permits at volume, without losing the correction that holds up a crew.',
    lead: 'When the office pulls permits for dozens of reroofs a week, the hard part is not the application. It is knowing which jobs are approved, which came back with a correction, and which are still sitting with the jurisdiction before the crew is scheduled.',
    situations: [
      { t: 'The schedule depends on approvals nobody has checked today', d: 'Crews are booked for next week, and the office is working through a spreadsheet to confirm which permits actually came through.' },
      { t: 'A correction comes back and sits in one inbox', d: 'The jurisdiction asks for a revised detail or missing document, and the person who saw it is out on an estimate.' },
      { t: 'The same five jurisdictions, many slightly different ways', d: 'Each city handles reroof permits a little differently, and that knowledge lives in one coordinator’s head.' },
    ],
    job: { name: 'Illustrative job: a residential tear-off and reroof', steps: [
      { k: '01', t: 'Project and permit created', d: 'Office adds the job, records the jurisdiction, and attaches the application and supporting documents.' },
      { k: '02', t: 'Correction requested', d: 'The permit status is updated and the response is assigned to the coordinator, so it shows up on the dashboard.' },
      { k: '03', t: 'Approval recorded', d: 'Once the jurisdiction approves, the project manager sees the status in the permits list before scheduling crews.' },
      { k: '04', t: 'Final inspection tracked', d: 'The inspection is recorded with its result and any remaining follow-up.' },
    ] },
    pairs: [
      { user: 'Open one list each morning and see which roofs are waiting on approval or a correction.', owner: 'See permit workload across every active job without asking for a status round-up.' },
      { user: 'Know exactly who owns each correction response.', owner: 'Keep crews from being scheduled against permits that are not ready.' },
      { user: 'Find the application and approval for a job in seconds.', owner: 'Keep jurisdiction knowledge with the business, not one person.' },
    ],
    shots: [
      { m: 'permits', t: 'Status and jurisdiction, job by job', d: 'The permits list shows every permit with its status and jurisdiction together.' },
      { m: 'dashboard', t: 'Corrections surface on their own', d: 'Dashboard alerts highlight pending paperwork, corrections and expired permits.' },
    ],
    photo: { trade: 'roofing', alt: 'A worker fastening shingles on a residential roof.', caption: 'Illustrative roofing work, not a Permits Manager customer project. Photo: Pexels.' },
    faqs: [
      { q: 'We pull a lot of small reroof permits. Is this overkill?', a: 'Volume is where it helps most. Each job keeps its permit, status, documents and owner together, so the list stays readable at fifty open jobs as well as five.' },
      { q: 'Can it fill out our reroof applications?', a: fill },
      { q: 'Can we sign and mark up permit PDFs?', a: pdf },
      { q: 'Does it submit permits or guarantee approvals?', a: 'No. Permits Manager is software for organizing and tracking your permitting work. Your team or your expediter still submits, and the jurisdiction still decides.' },
    ],
    cta: 'Get every roofing permit and correction in one list.',
  },
  'windows-and-doors': {
    slug: 'windows-and-doors', label: 'Windows and Doors',
    title: 'Permit management for window and door installers | Permits Manager',
    desc: 'For window and door installers preparing applications with product specs, measurements and supporting documents. Keep every file with the job and permit.',
    tag: 'Supporting documents', h1: 'Window and door permits start with the right documents attached.',
    lead: 'Replacement jobs often hinge on paperwork: product approvals, specs, measurements, energy forms, and owner signatures. Keep every supporting document with the job and the permit so the application is ready before anyone asks.',
    situations: [
      { t: 'The product approval is somewhere in email', d: 'The application is nearly done, but the spec sheet or product approval for that window line has to be found again.' },
      { t: 'The homeowner signature is the last missing piece', d: 'A form needs a signature, and the job waits while a PDF is printed, signed, scanned and resent.' },
      { t: 'Every job looks like the last one, until it does not', d: 'Different openings, products and jurisdictions mean a slightly different package each time.' },
    ],
    job: { name: 'Illustrative job: replacing eight windows and a patio door', steps: [
      { k: '01', t: 'Job and documents gathered', d: 'Office creates the project and attaches product documents, measurements and photos to the permit.' },
      { k: '02', t: 'Application prepared', d: 'For a supported saved jurisdiction, project data fills the application, which is saved with the project.' },
      { k: '03', t: 'Marked up and signed', d: 'The PDF is annotated and signed in the application, then saved and shared.' },
      { k: '04', t: 'Status and inspection followed', d: 'The permit status and the inspection are tracked until the job is closed out.' },
    ] },
    pairs: [
      { user: 'Build the application package with everything already attached to the job.', owner: 'Reduce back-and-forth caused by a missing document.' },
      { user: 'Mark up and sign PDFs without leaving the application.', owner: 'Keep finished, signed files with the permit for later reference.' },
      { user: 'See which jobs are still waiting on paperwork.', owner: 'Know where install dates depend on permits.' },
    ],
    shots: [
      { m: 'documents', t: 'Supporting documents stay with the job', d: 'The Documents section groups attached job files by submission. This view shows document organization, not the annotation editor.' },
      { m: 'permits', t: 'Each permit with its jurisdiction', d: 'Statuses and jurisdictions in one list as applications move forward.' },
    ],
    photo: { trade: 'windows', alt: 'Window installer working on a frame from inside a building.', caption: 'Illustrative window installation, not a Permits Manager customer project. Photo: Pexels.' },
    faqs: [
      { q: 'Can we store product approvals and spec sheets with the permit?', a: 'Yes. Documents are attached to the project and permit they belong to, so the package is in one place when the application is prepared.' },
      { q: 'Will it fill out the application for us?', a: fill },
      { q: 'Can our team mark up and sign forms?', a: pdf },
      { q: 'Do you work with installers who also do siding or doors only?', a: 'Yes. The workflow is the same for any job that needs a permit with supporting documents. Tell us about your mix of work when you request a demo.' },
    ],
    cta: 'Keep every window and door permit package with the job.',
  },
  hvac: {
    slug: 'hvac', label: 'HVAC',
    title: 'Permit and inspection tracking for HVAC contractors | Permits Manager',
    desc: 'For HVAC offices juggling mechanical permits, inspections and service scheduling. See which installs are permitted, inspected or still waiting on follow-up.',
    tag: 'Trade permits and inspections', h1: 'HVAC permits close when the inspection does. Track both.',
    lead: 'Changeouts and new installs move fast, but the mechanical permit is not finished until the inspection passes. Give dispatch and the office one place to see which jobs are permitted, which inspections are scheduled, and which ones need another visit.',
    situations: [
      { t: 'The install is done, the permit is still open', d: 'Equipment is running, but the inspection has not been scheduled and nobody owns making it happen.' },
      { t: 'An inspection fails and the next step goes quiet', d: 'The tech knows what the inspector said. The office does not, and the follow-up sits.' },
      { t: 'Scheduling and permitting live in separate worlds', d: 'Dispatch books the crew, the office tracks permits, and the two lists drift apart.' },
    ],
    job: { name: 'Illustrative job: a furnace and condenser changeout', steps: [
      { k: '01', t: 'Mechanical permit recorded', d: 'The office adds the trade permit to the project with its jurisdiction and application.' },
      { k: '02', t: 'Install completed', d: 'The permit stays open in the list, so the remaining inspection is visible.' },
      { k: '03', t: 'Inspection scheduled and tracked', d: 'The inspection, its date and type sit with the permit in the inspections view.' },
      { k: '04', t: 'Result and follow-up assigned', d: 'If something needs correcting, the next step is assigned to a person before the job is closed.' },
    ] },
    pairs: [
      { user: 'See upcoming inspections and which installs still need one.', owner: 'Stop leaving permits open long after the equipment is running.' },
      { user: 'Assign the re-inspection follow-up the same day.', owner: 'Know that failed inspections have a clear owner.' },
      { user: 'Keep the permit, documents and inspection history together.', owner: 'See permitting and inspection workload across the team.' },
    ],
    shots: [
      { m: 'inspections', t: 'Inspections with dates and types', d: 'The inspections view shows statuses, scheduled dates and inspection types.' },
      { m: 'permits', t: 'Which trade permits are still open', d: 'Permit statuses and jurisdictions in one list.' },
    ],
    faqs: [
      { q: 'Does it replace our dispatch or field service software?', a: 'No. Permits Manager tracks permits, inspections, documents and assignments. Keep your existing crew-scheduling tools and use this workspace for permit and inspection follow-up.' },
      { q: 'Can we track re-inspections?', a: 'Yes. Inspections are tracked with their status and the work that remains after each one, with the follow-up assigned to someone on the team.' },
      { q: 'Can it fill out mechanical permit applications?', a: fill },
      { q: 'Can we mark up and sign permit documents?', a: pdf },
    ],
    cta: 'See every HVAC permit through to a passed inspection.',
  },
};

export const tradeList = Object.values(trades);
export const tradeQuery = (slug: TradeSlug) => `?businessType=contractor&industry=${slug}`;

const offer = '30-day trial. Free standard setup and onboarding training. No credit card required.';

function TradePage({ t }: { t: Trade }) {
  const q = tradeQuery(t.slug);
  const Hero = mocks[t.shots[0].m];
  const others = tradeList.filter((x) => x.slug !== t.slug);
  return (
    <Shell>
      <Seo title={t.title} description={t.desc} />
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-5 font-mono text-xs uppercase tracking-[0.14em] text-foreground/70">
                <Link href="/solutions/contractors" data-testid="link-breadcrumb-contractors" className="underline underline-offset-4 hover:text-primary">For Contractors</Link>
                <span className="mx-2" aria-hidden>/</span><span className="text-foreground">{t.label}</span>
              </nav>
              <Eyebrow>{t.label} contractors &middot; {t.tag}</Eyebrow>
              <h1 data-testid="text-trade-title" className="font-display text-4xl md:text-[3.4rem] font-extrabold leading-[1.03]">{t.h1}</h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-lg max-w-xl text-foreground/85">{t.lead}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Cta href={`/demo${q}`} id="trade-demo" arrow>Request a Demo / Free Trial</Cta>
                <Cta href={`/signup${q}`} variant="ghost" id="trade-access">Request Trial Setup</Cta>
              </div>
              <p data-testid="text-trade-offer" className="mt-4 text-sm font-semibold">{offer}</p>
              <p className="mt-1 text-xs text-foreground/70">Send a request and we follow up to arrange your demo or trial setup.</p>
            </Reveal>
          </div>
          <Reveal delay={0.12}><Hero /></Reveal>
        </div>
      </section>

      <Section>
        <Reveal><Eyebrow>Sound familiar?</Eyebrow><H2>Three situations from a {t.label.toLowerCase()} office.</H2></Reveal>
        <ol className="mt-10 grid md:grid-cols-3 gap-8">
          {t.situations.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.06}>
              <li data-testid={`text-situation-${i}`} className="list-none border-t-4 border-foreground pt-5 h-full">
                <span className="font-mono text-sm font-semibold text-primary">0{i + 1}</span>
                <h3 className="font-display text-xl md:text-2xl font-bold mt-2 leading-tight">{s.t}</h3>
                <p className="mt-3 text-foreground/80">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section dark>
        <div className={`grid gap-12 ${t.photo ? 'lg:grid-cols-[1.25fr_1fr]' : ''} items-start`}>
          <div>
            <Reveal><Eyebrow dark>Job workflow</Eyebrow><H2 dark>{t.job.name}</H2>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-background/70">Illustrative example. Not a customer story.</p></Reveal>
            <ol className="mt-10 border-l-2 border-background/30">
              {t.job.steps.map((s, i) => (
                <Reveal key={s.t} delay={i * 0.06}>
                  <li data-testid={`row-job-step-${i}`} className="list-none relative pl-8 pb-8 last:pb-0">
                    <span className="absolute -left-[7px] top-1.5 h-3 w-3 bg-primary" aria-hidden />
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-[hsl(200_88%_62%)]">{s.k}</span>
                    <h3 className="font-display text-xl font-bold mt-1">{s.t}</h3>
                    <p className="mt-1 text-background/75 max-w-lg">{s.d}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
          {t.photo && (
            <Reveal delay={0.1}>
              <figure className="m-0 border border-background/30 overflow-hidden">
                <JobsitePhoto trade={t.photo.trade} alt={t.photo.alt} sizes="(min-width: 1024px) 500px, 100vw" />
                <figcaption className="p-4 font-mono text-[11px] text-background/70">{t.photo.caption}</figcaption>
              </figure>
            </Reveal>
          )}
        </div>
      </Section>

      <Section className="bg-card border-b border-border">
        <Reveal><Eyebrow>For the team and the business</Eyebrow><H2>What changes for the coordinator, and for the owner.</H2></Reveal>
        <div className="mt-10 border-2 border-foreground">
          <div className="hidden md:grid grid-cols-2 bg-foreground text-background font-mono text-xs uppercase tracking-[0.14em]">
            <p className="p-4">Permit coordinator and office</p><p className="p-4 border-l border-background/30">Owner and operations</p>
          </div>
          {t.pairs.map((x, i) => (
            <div key={x.user} data-testid={`row-benefit-pair-${i}`} className="grid md:grid-cols-2 border-t border-foreground/30 first:border-t-0">
              <div className="p-5"><p className="md:hidden font-mono text-[11px] uppercase tracking-[0.14em] text-primary mb-1">Coordinator</p><p className="font-display text-lg font-bold">{x.user}</p></div>
              <div className="p-5 bg-secondary md:border-l border-foreground/30"><p className="md:hidden font-mono text-[11px] uppercase tracking-[0.14em] text-primary mb-1">Owner</p><p className="font-display text-lg font-bold">{x.owner}</p></div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Reveal><Eyebrow>In the application</Eyebrow><H2>The screens your office would use for this.</H2></Reveal>
        <div className="mt-12 grid lg:grid-cols-2 gap-12">
          {t.shots.map((s, i) => {
            const M = mocks[s.m];
            return (
              <Reveal key={s.t} delay={i * 0.08}>
                <h3 className="font-display text-2xl font-bold">{s.t}</h3>
                <p className="mt-2 mb-6 text-foreground/80">{s.d}</p>
                <M />
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section className="bg-muted">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
          <Reveal><Eyebrow>{t.label} FAQ</Eyebrow><H2>Straight answers.</H2>
            <div className="mt-8 border-2 border-foreground bg-card p-5 shadow-[6px_6px_0_0_hsl(var(--foreground))]">
              <p className="font-display text-lg font-bold">{offer}</p>
              <p className="mt-2 text-sm text-foreground/80">Request a demo or trial setup and we will follow up to arrange it with your team.</p>
              <div className="mt-4"><Cta href={`/demo${q}`} id="faq-trade-demo" arrow>Request a Demo / Free Trial</Cta></div>
            </div>
          </Reveal>
          <dl>
            {t.faqs.map((f, i) => (
              <div key={f.q} data-testid={`faq-trade-${i}`} className="border-t-2 border-foreground py-5">
                <dt className="font-display text-xl font-bold">{f.q}</dt>
                <dd className="mt-2 text-foreground/80">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-foreground/70">Other trades</p>
          {others.map((o) => (
            <Link key={o.slug} href={`/solutions/contractors/${o.slug}`} data-testid={`link-trade-${o.slug}`} className="inline-flex items-center gap-1 font-semibold hover:text-primary">{o.label} <ArrowUpRight className="h-4 w-4" aria-hidden /></Link>
          ))}
          <Link href="/solutions/contractors" data-testid="link-trade-all-contractors" className="inline-flex items-center gap-1 font-semibold hover:text-primary">All contractors <ArrowUpRight className="h-4 w-4" aria-hidden /></Link>
          <Link href="/solutions/permit-expediters" data-testid="link-trade-expediters" className="inline-flex items-center gap-1 font-semibold hover:text-primary">Permit expediters <ArrowUpRight className="h-4 w-4" aria-hidden /></Link>
        </div>
      </section>

      <FinalCta title={t.cta} q={q} />
    </Shell>
  );
}

export const RoofingPage = () => <TradePage t={trades.roofing} />;
export const WindowsDoorsPage = () => <TradePage t={trades['windows-and-doors']} />;
export const HvacPage = () => <TradePage t={trades.hvac} />;
