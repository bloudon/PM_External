import { Seo } from '@/components/seo';
import { Shell } from '@/components/layout';
import { Eyebrow, Reveal, Section } from '@/components/bits';
import { mocks } from '@/components/product-ui';
import { groups } from '@/lib/content';
import { FinalCta } from '@/pages/home';

export default function Features() {
  return (
    <Shell>
      <Seo title="Features | Permits Manager" description="Manage the work, organize documents, coordinate people, and track fees and reporting for permitting operations." />
      <section className="grid-paper border-b border-border"><div className="mx-auto max-w-7xl px-5 md:px-8 py-16 md:py-24">
        <Reveal><Eyebrow>Features</Eyebrow><h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[1] max-w-4xl">Everything a permit touches, in one place.</h1>
          <p className="mt-6 text-lg max-w-2xl text-foreground/85">Four groups of capability, organized around how permitting work actually moves.</p></Reveal>
        <nav aria-label="Feature groups" className="mt-8 flex flex-wrap gap-2">
          {groups.map((g, i) => <a key={g.t} href={`#g${i}`} className="border-2 border-foreground bg-card px-3 py-1.5 text-sm font-semibold hover:bg-secondary">{g.t}</a>)}
        </nav>
      </div></section>
      {groups.map((g, i) => {
        const M = mocks[g.mock];
        return (
          <Section key={g.t} id={`g${i}`} className={i % 2 ? 'bg-muted' : ''}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Reveal className={i % 2 ? 'lg:order-2' : ''}>
                <span className="font-mono text-accent font-semibold">0{i + 1}</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">{g.t}</h2>
                <p className="mt-3 text-lg text-foreground/80 max-w-lg">{g.d}</p>
                <ul className="mt-6 grid gap-2">{g.items.map((x) => <li key={x} className="flex gap-3 border-t border-foreground/20 pt-2"><span className="mt-2 h-2 w-2 bg-primary shrink-0" aria-hidden />{x}</li>)}</ul>
              </Reveal>
              <Reveal delay={0.08}><M /></Reveal>
            </div>
          </Section>
        );
      })}
      <FinalCta />
    </Shell>
  );
}
