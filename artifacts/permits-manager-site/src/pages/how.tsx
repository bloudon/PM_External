import { Seo } from '@/components/seo';
import { Shell } from '@/components/layout';
import { Eyebrow, Reveal, Section } from '@/components/bits';
import { mocks } from '@/components/product-ui';
import { steps } from '@/lib/content';
import { FinalCta } from '@/pages/home';

const mk = [null, 'permits', null, null, 'inspections', null] as const;
const more = [
  'Add the project, its location and the jurisdiction it falls under.',
  'Record each permit the project requires and keep its status current.',
  'Attach applications, approvals and supporting files to the permit.',
  'Assign tasks and follow-ups so every next step has a named owner.',
  'Track inspections and follow up on anything that still needs action.',
  'Review fees, expenses and the state of the work across your operation.',
];

export default function How() {
  return (
    <Shell>
      <Seo title="How It Works | Permits Manager" description="A practical walkthrough from project creation through permits, documents, assignments, inspections and reporting." />
      <section className="grid-paper border-b border-border"><div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24">
        <Reveal><Eyebrow>How it works</Eyebrow><h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[1] max-w-4xl">How your team keeps permitting work moving.</h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/85">From setting up the project to following inspections and reviewing the work. The examples below show real application views, not one continuous project record.</p>
        </Reveal>
      </div></section>
      <Section>
        <ol className="grid gap-20">
          {steps.map((s, i) => {
            const mkey = mk[i];
            const M = mkey ? mocks[mkey] : null;
            return (
              <li key={s.t} className={`list-none grid gap-10 items-center ${M ? 'lg:grid-cols-[.8fr_1.2fr]' : ''}`}>
                <Reveal className={i % 2 ? 'lg:order-2' : ''}>
                  <span className="font-display text-7xl font-extrabold text-primary/20 leading-none">0{i + 1}</span>
                  <h2 className="font-display text-3xl font-bold mt-1">{s.t}</h2>
                  <p className="mt-3 text-lg text-foreground/80">{more[i]}</p>
                </Reveal>
                {M && <Reveal delay={0.08}><M /></Reveal>}
              </li>
            );
          })}
        </ol>
      </Section>
      <FinalCta />
    </Shell>
  );
}
