import { type ReactNode } from 'react';

function Frame({ title, children, label = true }: { title: string; children: ReactNode; label?: boolean }) {
  return (
    <figure className="m-0">
      <div className="bg-card border-2 border-foreground shadow-[8px_8px_0_0_hsl(var(--primary))] overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-foreground bg-secondary">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" /><span className="h-2.5 w-2.5 rounded-full bg-[hsl(200_88%_50%)]" /><span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="ml-2 font-mono text-[11px] text-muted-foreground truncate">{title}</span>
        </div>
        <div className="p-3 md:p-4 text-[12px] md:text-[13px]">{children}</div>
      </div>
      {label && <figcaption className="mt-4 font-mono text-[11px] text-muted-foreground">Representative interface. Sample data, not a final screenshot.</figcaption>}
    </figure>
  );
}

const tones: Record<string, string> = {
  'In review': 'bg-[hsl(200_88%_90%)] text-[hsl(215_80%_22%)]',
  'Corrections': 'bg-[hsl(11_87%_90%)] text-[hsl(11_75%_26%)]',
  'Issued': 'bg-[hsl(240_100%_93%)] text-[hsl(240_70%_30%)]',
  'Scheduled': 'bg-[hsl(200_88%_90%)] text-[hsl(215_80%_22%)]',
  'Needs follow-up': 'bg-[hsl(11_87%_90%)] text-[hsl(11_75%_26%)]',
  'Complete': 'bg-secondary text-foreground',
};
function Pill({ s }: { s: string }) {
  return <span className={`px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap ${tones[s] ?? 'bg-secondary'}`}>{s}</span>;
}

export function DashboardMock({ label }: { label?: boolean }) {
  const rows = [
    ['Harbor Street Tenant Fit-Out', 'Mechanical', 'Riverton', 'In review', 'M. Alvarez'],
    ['Eastgate Medical Suite 210', 'Electrical', 'Lakemont County', 'Corrections', 'T. Okafor'],
    ['Pinecrest Warehouse Addition', 'Building', 'Pinecrest', 'Issued', 'R. Lindqvist'],
    ['Maple Court Residence', 'Plumbing', 'Riverton', 'Scheduled', 'M. Alvarez'],
  ];
  return (
    <Frame title="Projects / Active permits" label={label}>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[['Open permits', 'primary'], ['Inspections', 'support'], ['Needs action', 'accent']].map(([t, k]) => (
          <div key={t} className="border border-border p-2">
            <p className="text-muted-foreground text-[11px]">{t}</p>
            <div className={`mt-2 h-1.5 w-2/3 ${k === 'primary' ? 'bg-primary' : k === 'accent' ? 'bg-accent' : 'bg-[hsl(200_88%_50%)]'}`} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1.6fr_1fr_auto] md:grid-cols-[1.8fr_.9fr_1fr_auto_.9fr] gap-x-3 font-mono text-[10px] uppercase text-muted-foreground pb-1 border-b border-border">
        <span>Project</span><span className="hidden md:block">Type</span><span className="hidden md:block">Jurisdiction</span><span>Status</span><span>Owner</span>
      </div>
      {rows.map((r) => (
        <div key={r[0]} className="grid grid-cols-[1.6fr_1fr_auto] md:grid-cols-[1.8fr_.9fr_1fr_auto_.9fr] gap-x-3 items-center py-2 border-b border-border/60 last:border-0">
          <span className="font-semibold truncate">{r[0]}</span><span className="hidden md:block">{r[1]}</span>
          <span className="hidden md:block truncate">{r[2]}</span><Pill s={r[3]} /><span className="truncate hidden md:block">{r[4]}</span>
        </div>
      ))}
    </Frame>
  );
}

export function DocumentsMock({ label }: { label?: boolean }) {
  const docs = [['Site plan, rev B', 'Application'], ['Contractor license', 'Compliance'], ['Approved drawings', 'Permit'], ['Inspection card scan', 'Inspection']];
  return (
    <Frame title="Eastgate Medical Suite 210 / Documents" label={label}>
      <div className="grid gap-2">
        {docs.map((d, i) => (
          <div key={d[0]} className="flex items-center gap-3 border border-border p-2">
            <span className={`h-8 w-6 shrink-0 ${i % 2 ? 'bg-[hsl(200_88%_50%)]' : 'bg-primary'}`} />
            <span className="font-semibold flex-1 truncate">{d[0]}</span>
            <span className="font-mono text-[11px] text-muted-foreground">{d[1]}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function InspectionsMock({ label }: { label?: boolean }) {
  const r = [['Rough electrical', 'Lakemont County', 'Scheduled'], ['Final mechanical', 'Riverton', 'Needs follow-up'], ['Foundation', 'Pinecrest', 'Complete']];
  return (
    <Frame title="Inspections / Upcoming" label={label}>
      {r.map((x) => (
        <div key={x[0]} className="flex items-center justify-between gap-2 py-2.5 border-b border-border/60 last:border-0">
          <div className="min-w-0"><p className="font-semibold truncate">{x[0]}</p><p className="text-muted-foreground text-[11px]">{x[1]}</p></div>
          <Pill s={x[2]} />
        </div>
      ))}
    </Frame>
  );
}

export function FeesMock({ label }: { label?: boolean }) {
  const r = [['Plan review fee', 'Reimbursable'], ['Courier and printing', 'Reimbursable'], ['Expediting service', 'Client rate']];
  return (
    <Frame title="Client billing / Draft invoice" label={label}>
      {r.map((x) => (
        <div key={x[0]} className="flex items-center justify-between py-2.5 border-b border-border/60">
          <span className="font-semibold">{x[0]}</span><span className="font-mono text-[11px] text-muted-foreground">{x[1]}</span>
        </div>
      ))}
      <div className="mt-3 inline-block px-2.5 py-1.5 bg-foreground text-background font-mono text-[11px]">Export for QuickBooks Online</div>
    </Frame>
  );
}

export function AssignMock({ label }: { label?: boolean }) {
  const r = [['Submit corrections', 'T. Okafor'], ['Confirm inspection window', 'M. Alvarez'], ['Upload approved set', 'R. Lindqvist']];
  return (
    <Frame title="Assignments / This week" label={label}>
      {r.map((x) => (
        <div key={x[0]} className="flex items-center gap-3 py-2.5 border-b border-border/60 last:border-0">
          <span className="h-4 w-4 border-2 border-foreground shrink-0" /><span className="flex-1 font-semibold">{x[0]}</span>
          <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-[10px] grid place-items-center font-bold" aria-hidden>{x[1][0]}</span>
          <span className="text-muted-foreground text-[11px] hidden sm:block">{x[1]}</span>
        </div>
      ))}
    </Frame>
  );
}

export const mocks = { dashboard: DashboardMock, documents: DocumentsMock, inspections: InspectionsMock, fees: FeesMock, assign: AssignMock };
