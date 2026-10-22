import { Seo } from '@/components/seo';
import { Shell } from '@/components/layout';
import { Eyebrow, H2, Reveal, Section } from '@/components/bits';
import { FinalCta } from '@/pages/home';

const principles = [
  { t: 'Start with the workflow', d: 'Features follow how permits actually move, not how software categories are drawn.' },
  { t: 'Make ownership visible', d: 'Every permit, document and follow-up should have someone responsible.' },
  { t: 'Serve both sides', d: 'In-house teams and expediting firms share problems, and the product supports both.' },
];
export default function About() {
  return (
    <Shell>
      <Seo title="About | Permits Manager" description="Permits Manager grew out of permit expediting practice. Learn about the practitioner background behind the product." />
      <section className="grid-paper border-b border-border"><div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24">
        <Reveal><Eyebrow>About</Eyebrow><h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[1] max-w-4xl">Software rooted in permit expediting work.</h1></Reveal>
      </div></section>
      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          <Reveal><H2>Where it comes from</H2></Reveal>
          <Reveal delay={0.08}><div className="space-y-5 text-lg text-foreground/85">
            <p>Permits Manager was built by permit expediters. The product reflects the practical demands of the work: many projects at once, different requirements in every jurisdiction, documents that have to be right, and inspections that need follow-up.</p>
            <p>It is made for contractors who manage permitting with their own teams, and for the professional firms who manage it on behalf of others.</p>
            <p className="text-sm text-muted-foreground border-l-4 border-accent pl-4">Detailed team biographies and company history will be added once approved.</p>
          </div></Reveal>
        </div>
      </Section>
      <Section dark>
        <Reveal><Eyebrow dark>Principles</Eyebrow><H2 dark>How we think about the product.</H2></Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-px bg-background/20">
          {principles.map((p) => <div key={p.t} className="bg-[hsl(236_55%_10%)] p-7"><h3 className="font-display text-xl font-bold">{p.t}</h3><p className="mt-2 text-background/75">{p.d}</p></div>)}
        </div>
      </Section>
      <FinalCta />
    </Shell>
  );
}
