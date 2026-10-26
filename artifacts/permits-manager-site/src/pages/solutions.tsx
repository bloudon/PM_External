import { Seo } from '@/components/seo';
import { Shell } from '@/components/layout';
import { Cta, Eyebrow, H2, Reveal, Section } from '@/components/bits';
import { mocks } from '@/components/product-ui';
import { JobsitePhoto } from '@/components/jobsite-photo';
import { FinalCta } from '@/pages/home';

type Mk = keyof typeof mocks;
interface Cfg {
  title: string; desc: string; eyebrow: string; h1: string; lead: string; who: string[];
  challenges: { t: string; d: string }[]; caps: { t: string; d: string }[];
  walk: { t: string; d: string; m?: Mk }[];
  examples?: { t: string; d: string; photo: 'windows' | 'electrical' | 'fire-protection' | 'plumbing'; alt: string }[];
  hero: Mk; cta: string; bt: 'contractor' | 'permit_expeditor';
}

const contractors: Cfg = {
  title: 'Permitting software for contractors | Permits Manager',
  desc: 'Give permit coordinators, office and project managers one workspace for permit status, assignments, documents, jurisdictions and inspections.',
  eyebrow: 'For Contractors', h1: 'Manage permitting in-house without the spreadsheet sprawl.',
  lead: 'One shared workspace for the people who keep your jobs permitted and inspected.',
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
    { t: 'Document organization', d: 'Keep files attached to the permit they support.' },
    { t: 'Jurisdiction information', d: 'Keep jurisdiction details with the projects that depend on them.' },
    { t: 'Inspection follow-up', d: 'Track inspections and the work that remains after each one.' },
  ],
  examples: [
    { t: 'Roofing and window contractors', d: 'Track permit status and inspection follow-up across recurring roof and window jobs.', photo: 'windows', alt: 'Window installer working on a frame from inside a building.' },
    { t: 'HVAC and electrical teams', d: 'Keep trade permits, documents and responsibilities connected to each job.', photo: 'electrical', alt: 'Technician working inside an electrical control panel.' },
    { t: 'Fire-protection contractors', d: 'Keep approvals and inspection follow-up visible for specialty work.', photo: 'fire-protection', alt: 'Fire-sprinkler piping, valves and pressure gauges mounted on a wall.' },
    { t: 'Plumbing and general contractors', d: 'Coordinate permits and inspections across active jobs, with clear owners.', photo: 'plumbing', alt: 'Hands fitting a metal pipe beneath a fixture.' },
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
  eyebrow: 'For Permit Expediters', h1: 'Run a permit expediting business from one workspace.',
  lead: 'Built by expediters, for firms juggling many clients, many jurisdictions and a team to keep aligned.',
  who: ['Business owners', 'Expediters', 'Coordinators', 'Accounting staff'],
  challenges: [
    { t: 'Many clients, one team', d: 'Each contractor has different projects, expectations and pricing.' },
    { t: 'Requests arrive from everywhere', d: 'Contractor requests need to land somewhere the team can act on them.' },
    { t: 'Who is working what', d: 'Staff responsibilities need to be visible across every client.' },
    { t: 'Billing is its own project', d: 'Fees, reimbursable expenses and client-specific rates have to reach an invoice accurately.' },
  ],
  caps: [
    { t: 'Multiple clients', d: 'Import your existing contractors and manage their projects and permits together.' },
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
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-24 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <Reveal><Eyebrow>{c.eyebrow}</Eyebrow><h1 className="font-display text-4xl md:text-6xl font-extrabold leading-[1.02]">{c.h1}</h1></Reveal>
            <Reveal delay={0.08}><p className="mt-5 text-lg max-w-xl text-foreground/85">{c.lead}</p>
              <ul className="mt-5 flex flex-wrap gap-2">{c.who.map((w) => <li key={w} className="border border-foreground/40 bg-card px-3 py-1 text-sm font-medium">{w}</li>)}</ul>
              <div className="mt-8 flex flex-wrap gap-4"><Cta href={`/demo?businessType=${c.bt}`} id="solution-demo" arrow>Request a Demo</Cta><Cta href={`/signup?businessType=${c.bt}`} variant="ghost" id="solution-get-started">Get Started</Cta></div></Reveal>
          </div>
          <Reveal delay={0.12}><Hero /></Reveal>
        </div>
      </section>
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
            <p className="font-mono text-xs uppercase tracking-widest text-[hsl(200_88%_62%)]">Illustrative job types</p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {c.examples.map((x) => (
                <Reveal key={x.t} className="h-full">
                  <figure className="m-0 h-full overflow-hidden border border-background/30 bg-[hsl(236_55%_10%)]">
                    <JobsitePhoto trade={x.photo} alt={x.alt} sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" />
                    <figcaption className="p-5">
                      <h3 className="font-display text-xl font-bold">{x.t}</h3>
                      <p className="mt-2 text-sm text-background/75">{x.d}</p>
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
