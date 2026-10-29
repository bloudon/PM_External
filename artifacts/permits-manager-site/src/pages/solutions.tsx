import { Seo } from '@/components/seo';
import { Shell } from '@/components/layout';
import { Cta, Eyebrow, H2, Reveal, Section } from '@/components/bits';
import { mocks } from '@/components/product-ui';
import { JobsitePhoto } from '@/components/jobsite-photo';
import { FinalCta } from '@/pages/home';

type Mk = keyof typeof mocks;
interface Cfg {
  title: string; desc: string; eyebrow: string; h1: string; lead: string; qualifier?: string; who: string[];
  pairs?: { user: string; owner: string }[]; quick?: { t: string; d: string }[];
  challenges: { t: string; d: string }[]; caps: { t: string; d: string }[];
  walk: { t: string; d: string; m?: Mk }[];
  examples?: { t: string; d: string; flow: string; photo: 'roofing' | 'windows' | 'electrical' | 'fire-protection' | 'plumbing'; alt: string }[];
  hero: Mk; cta: string; bt: 'contractor' | 'permit_expeditor';
}

const contractors: Cfg = {
  title: 'Permitting software for contractors | Permits Manager',
  desc: 'Give permit coordinators, office and project managers one workspace for permit status, assignments, documents, jurisdictions and inspections.',
  eyebrow: 'For Contractors', h1: 'Manage permitting in-house without the spreadsheet sprawl.',
  lead: 'For contractor teams managing permits across multiple jobs and jurisdictions. Give your permit coordinator, office staff, and project managers one place to see status, organize documents, and coordinate inspection follow-up.',
  pairs: [
    { user: 'Know which permits need attention today.', owner: 'See the workload without asking for individual updates.' },
    { user: 'Find the documents connected to the job.', owner: 'Keep permitting knowledge available across the team.' },
    { user: 'See assigned work and follow-up.', owner: 'Maintain clear responsibility as the business grows.' },
  ],
  who: ['Permit coordinators', 'Office managers', 'Operations managers', 'Project managers'],
  challenges: [
    { t: 'Nobody can see status without asking', d: 'Project managers chase the office, and the office chases jurisdictions.' },
    { t: 'Documents live in too many places', d: 'Applications, approvals and inspection records scatter across inboxes and drives.' },
    { t: 'Responsibility gets fuzzy', d: 'When a correction comes back, who owns the response is not always clear.' },
    { t: 'Inspection follow-up slips', d: 'Scheduled, failed and pending inspections need a visible next step.' },
  ],
  caps: [
    { t: 'Project visibility', d: 'See every project with its permits and status together.' },
    { t: 'Assignments', d: 'Assign permit tasks and follow-ups to the right person.' },
    { t: 'PDF markup and signatures', d: 'Annotate permit PDFs, add signatures, then save and share them directly in the application.' },
    { t: 'Automatic application filling', d: 'Use project data to fill application forms for supported saved jurisdictions, then save them with the project. Coverage is growing.' },
    { t: 'Inspection follow-up', d: 'Track inspections and the work that remains after each one.' },
  ],
  examples: [
    { t: 'Roofing, windows, and other repeat-job contractors', d: 'Recurring permit workflows across many customer jobs.', flow: 'A coordinator opens the permits list each morning, sees which jobs are waiting on approval or need a correction, and assigns the follow-up before crews are scheduled.', photo: 'roofing', alt: 'A worker fastening shingles on a residential roof.' },
    { t: 'HVAC, electrical, plumbing, and fire-protection contractors', d: 'Trade permits, supporting documents, and inspections.', flow: 'Office staff attach the application and supporting documents to the trade permit, then track the inspection and the next step once a result comes back.', photo: 'electrical', alt: 'Technician working inside an electrical control panel.' },
    { t: 'General contractors and remodelers', d: 'Multiple permits and responsibilities within and across projects.', flow: 'A project manager reviews one project with its building and trade permits together, sees who owns each open item, and checks what is holding up the next inspection.', photo: 'windows', alt: 'Window installer working on a frame from inside a building.' },
  ],
  walk: [
    { t: 'See what needs attention', d: 'Dashboard alerts highlight pending paperwork, corrections and expired permits alongside active project totals.', m: 'dashboard' },
    { t: 'Track permit status by jurisdiction', d: 'Permit statuses and the jurisdictions they sit in, in one list.', m: 'permits' },
    { t: 'Follow every inspection', d: 'Upcoming inspections and what needs attention.', m: 'inspections' },
  ],
  bt: 'contractor', hero: 'dashboard', cta: 'Bring your permitting operation into one workspace.',
};

const expediters: Cfg = {
  title: 'Software for permit expediting companies | Permits Manager',
  desc: 'Manage contractor clients, requests, assignments, pricing and invoicing. Import existing contractors and bring in accounts and fees from QuickBooks.',
  eyebrow: 'For Permit Expediters', h1: 'Run your permit expediting business from client request to invoice.',
  lead: 'Manage contractor clients, assign permitting work, organize documents, and track service fees and reimbursable expenses in one workspace.',
  qualifier: 'Built for firms coordinating multiple clients, jurisdictions, and staff.',
  quick: [
    { t: 'Keep client requests connected to the work.', d: 'Contractor requests stay tied to the projects and permits they affect, so nothing lives only in an inbox.' },
    { t: 'Make staff responsibilities visible across clients.', d: 'Assign work and see who has the next step for every contractor client.' },
    { t: 'Review billable fees and expenses before invoicing.', d: 'Service fees, reimbursable expenses and contractor-specific pricing are recorded with the work, ready to check before an invoice goes out.' },
  ],
  who: ['Business owners', 'Expediters', 'Coordinators', 'Accounting staff'],
  challenges: [
    { t: 'Many clients, one team', d: 'Each contractor has different projects, expectations and pricing.' },
    { t: 'Requests arrive from everywhere', d: 'Contractor requests need to land somewhere the team can act on them.' },
    { t: 'Who is working what', d: 'Staff responsibilities need to be visible across every client.' },
    { t: 'Billing is its own project', d: 'Fees, reimbursable expenses and client-specific rates have to reach an invoice accurately.' },
  ],
  caps: [
    { t: 'Multiple clients', d: 'Import your existing contractors and manage their projects and permits together.' },
    { t: 'PDF markup and signatures', d: 'Mark up and annotate permit PDFs, add signatures, and save and share the updated files without leaving the application.' },
    { t: 'Automatic application filling', d: 'Fill supported saved-jurisdiction application forms with project data and save them with the project. The supported list is growing.' },
    { t: 'Contractor requests', d: 'Keep client requests tied to the work they affect.' },
    { t: 'Staff responsibilities', d: 'Assign work and see who has the next step.' },
    { t: 'Contractor-specific pricing', d: 'Apply the pricing that fits each contractor.' },
    { t: 'Reimbursable expenses and invoicing', d: 'Record expenses and carry them through to client invoices.' },
    { t: 'QuickBooks setup and exports', d: 'QuickBooks can pull in your accounts and fees for a quick, painless setup. Supported QuickBooks Online exports are also available for billing information.' },
  ],
  walk: [
    { t: 'Review the work needing attention', d: 'Dashboard alerts and totals help you see active work and outstanding follow-up.', m: 'dashboard' },
    { t: 'Assign your staff', d: 'Clear owners for each follow-up.' },
    { t: 'Bill from the same record', d: 'Bring in your accounts and fees from QuickBooks for a quick, painless setup. Record fees and reimbursable expenses, apply contractor-specific pricing and use supported QuickBooks Online exports for billing information.' },
  ],
  bt: 'permit_expeditor', hero: 'dashboard', cta: 'Bring your expediting operation into one workspace.',
};

function SolutionPage({ c }: { c: Cfg }) {
  const Hero = mocks[c.hero];
  return (
    <Shell>
      <Seo title={c.title} description={c.desc} />
      <section className="grid-paper border-b border-border">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-20 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <Reveal><Eyebrow>{c.eyebrow}</Eyebrow><h1 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.02]">{c.h1}</h1></Reveal>
            <Reveal delay={0.08}><p className="mt-5 text-lg max-w-xl text-foreground/85">{c.lead}</p>
              {c.qualifier && <p data-testid="text-qualifier" className="mt-3 font-semibold">{c.qualifier}</p>}
              <ul className="mt-5 flex flex-wrap gap-2">{c.who.map((w) => <li key={w} className="border border-foreground/40 bg-card px-3 py-1 text-sm font-medium">{w}</li>)}</ul>
              <div className="mt-8 flex flex-wrap gap-4"><Cta href={`/demo?businessType=${c.bt}`} id="solution-demo" arrow>Request a Demo</Cta><Cta href={`/signup?businessType=${c.bt}`} variant="ghost" id="solution-get-started">Get Started</Cta></div></Reveal>
          </div>
          <Reveal delay={0.12}><Hero /></Reveal>
        </div>
      </section>
      {c.quick && (
        <section className="border-b border-border bg-card">
          <ol className="mx-auto max-w-7xl px-5 md:px-8 py-10 md:py-12 grid md:grid-cols-3 gap-8">
            {c.quick.map((q, i) => (
              <Reveal key={q.t} delay={i * 0.06}>
                <li data-testid={`text-benefit-${i}`} className="list-none border-t-2 border-primary pt-4">
                  <span className="font-mono text-sm text-primary font-semibold">0{i + 1}</span>
                  <h2 className="font-display text-xl md:text-2xl font-bold mt-2 leading-tight">{q.t}</h2>
                  <p className="mt-2 text-foreground/80">{q.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>
      )}
      {c.pairs && (
        <Section className="bg-card border-b border-border">
          <Reveal><Eyebrow>For the team and the business</Eyebrow><H2>Useful to the person doing the work, and the person running the company.</H2></Reveal>
          <div className="mt-10 border-2 border-foreground">
            <div className="hidden md:grid grid-cols-2 bg-foreground text-background font-mono text-xs uppercase tracking-[0.14em]">
              <p className="p-4">Coordinators and office staff</p><p className="p-4 border-l border-background/30">Owners and operations managers</p>
            </div>
            {c.pairs.map((x, i) => (
              <Reveal key={x.user} delay={i * 0.05}>
                <div data-testid={`row-benefit-pair-${i}`} className="grid md:grid-cols-2 border-t border-foreground/30 first:border-t-0 md:first:border-t-0">
                  <div className="p-5"><p className="md:hidden font-mono text-[11px] uppercase tracking-[0.14em] text-primary mb-1">Daily user</p><p className="font-display text-lg md:text-xl font-bold">{x.user}</p></div>
                  <div className="p-5 bg-secondary md:border-l border-foreground/30"><p className="md:hidden font-mono text-[11px] uppercase tracking-[0.14em] text-primary mb-1">Owner or ops manager</p><p className="font-display text-lg md:text-xl font-bold">{x.owner}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}
      <Section>
        <Reveal><Eyebrow>Operational challenges</Eyebrow><H2>The friction you already know.</H2></Reveal>
        <div className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-2">
          {c.challenges.map((x, i) => (
            <Reveal key={x.t} delay={i * 0.05}><div className="border-t-2 border-foreground py-5"><h3 className="font-display text-xl font-bold">{x.t}</h3><p className="mt-1 text-foreground/80">{x.d}</p></div></Reveal>
          ))}
        </div>
      </Section>
      <Section dark>
        <Reveal><Eyebrow dark>Relevant capabilities</Eyebrow><H2 dark>What the workspace does for you.</H2></Reveal>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-background/20">
          {c.caps.map((x, i) => (
            <Reveal key={x.t} delay={i * 0.04} className="bg-[hsl(236_55%_10%)] p-6">
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <h3 className="font-display text-xl font-bold mt-2">{x.t}</h3><p className="mt-2 text-background/75">{x.d}</p>
            </Reveal>
          ))}
        </div>
        {c.examples && (
          <div className="mt-12">
            <p className="font-mono text-xs uppercase tracking-widest text-[hsl(200_88%_62%)]">Who it fits, by workflow</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {c.examples.map((x) => (
                <Reveal key={x.t} className="h-full">
                  <figure className="m-0 h-full overflow-hidden border border-background/30 bg-[hsl(236_55%_10%)]">
                    <JobsitePhoto trade={x.photo} alt={x.alt} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
                    <figcaption className="p-5">
                      <h3 className="font-display text-xl font-bold">{x.t}</h3>
                      <p className="mt-1 text-sm font-semibold text-background/90">{x.d}</p>
                      <p className="mt-3 border-l-2 border-primary pl-3 text-sm text-background/75"><span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(200_88%_62%)] block mb-1">Workflow example</span>{x.flow}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <p className="mt-4 text-xs text-background/70">Photos illustrate construction work, not Permits Manager customer projects.</p>
          </div>
        )}
      </Section>
      <Section>
        <Reveal><Eyebrow>Walkthrough</Eyebrow><H2>See the workflow in the interface.</H2></Reveal>
        <div className="mt-14 grid gap-20">
          {c.walk.map((w, i) => {
            const M = w.m ? mocks[w.m] : null;
            return (
              <div key={w.t} className={`grid gap-10 items-center ${M ? 'lg:grid-cols-2' : ''}`}>
                <Reveal className={i % 2 ? 'lg:order-2' : ''}><span className="font-mono text-accent font-semibold">Step 0{i + 1}</span><h3 className="font-display text-3xl font-bold mt-2">{w.t}</h3><p className="mt-3 text-lg text-foreground/80 max-w-md">{w.d}</p></Reveal>
                {M && <Reveal delay={0.08}><M /></Reveal>}
              </div>
            );
          })}
        </div>
      </Section>
      <FinalCta title={c.cta} bt={c.bt} />
    </Shell>
  );
}

export const ContractorsPage = () => <SolutionPage c={contractors} />;
export const ExpeditersPage = () => <SolutionPage c={expediters} />;
