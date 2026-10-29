import { FilePenLine, FileCheck2, Signature, Share2, MapPin, FolderPlus } from 'lucide-react';
import { Cta, Eyebrow, Reveal } from '@/components/bits';

const panels = [
  {
    i: FilePenLine,
    k: 'Mark up permit PDFs',
    t: 'Annotate and sign permit documents without leaving the app.',
    d: 'Open a permit PDF, add notes and markups, and place signatures right inside Permits Manager. Then save the updated document and share it with the people who need it.',
    pts: [{ i: Signature, x: 'Add annotations and signatures' }, { i: Share2, x: 'Save and share the updated file' }],
  },
  {
    i: FileCheck2,
    k: 'Fill application forms',
    t: 'Fill supported application forms with your project data automatically.',
    d: 'For supported jurisdictions you have saved, Permits Manager fills permitting application forms using the project details you already entered, and saves the completed form with the project.',
    pts: [{ i: MapPin, x: 'Works with supported saved jurisdictions' }, { i: FolderPlus, x: 'Completed forms stay with the project' }],
  },
];

export function PaperworkTimeSavers({ ctaHref, ctaLabel, id = 'paperwork' }: { ctaHref: string; ctaLabel: string; id?: string }) {
  return (
    <section id={id} className="border-b border-border" data-testid="section-paperwork-time-savers">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-10 md:py-16">
        <Reveal>
          <Eyebrow>Paperwork time savers</Eyebrow>
          <h2 className="font-display text-2xl md:text-4xl font-bold leading-[1.08] max-w-3xl">Spend less time preparing permit paperwork.</h2>
          <p className="mt-3 md:mt-4 text-foreground/80 max-w-2xl">Two ways to get documents ready faster: work on permit PDFs directly in the app, and let supported forms fill themselves from your project.</p>
        </Reveal>
        <div className="mt-7 md:mt-10 grid md:grid-cols-2 gap-5 md:gap-6">
          {panels.map((p, n) => (
            <Reveal key={p.k} delay={n * 0.08}>
              <article data-testid={`card-paperwork-${n}`} className="h-full border-2 border-foreground bg-card p-5 md:p-8 shadow-[6px_6px_0_0_hsl(var(--foreground))]">
                <div className="flex items-center gap-3">
                  <p.i className="h-7 w-7 text-primary" aria-hidden />
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-primary">{p.k}</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold mt-4 leading-snug">{p.t}</h3>
                <p className="mt-3 text-foreground/80">{p.d}</p>
                <ul className="mt-5 grid gap-2">
                  {p.pts.map((x) => (
                    <li key={x.x} className="flex items-center gap-3 border-t border-foreground/20 pt-2 text-sm font-semibold">
                      <x.i className="h-4 w-4 shrink-0 text-primary" aria-hidden />{x.x}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <figure className="mt-8 overflow-hidden rounded-lg border border-border bg-card">
            <a
              href={`${import.meta.env.BASE_URL}product-screenshots/documents-attached-files.png`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:-outline-offset-2"
              aria-label="View the attached project files screenshot at full size (opens in a new tab)"
            >
              <img
                src={`${import.meta.env.BASE_URL}product-screenshots/documents-attached-files.png`}
                alt="Permits Manager Documents section with submission tabs, a file upload area, and attached project PDF files."
                width={1328}
                height={427}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </a>
            <figcaption className="px-5 py-4 text-sm text-foreground/75">
              <span className="font-semibold text-foreground">Project files, together in one place.</span>{' '}
              A real view of the Documents section showing attached job files. Select the image to view it at full size.
            </figcaption>
          </figure>
        </Reveal>
        <Reveal>
          <div className="mt-7 md:mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            <p data-testid="text-jurisdictions-growing" className="text-sm text-foreground/75 max-w-xl">
              <span className="font-semibold text-foreground">The list of supported jurisdictions and forms is growing.</span> Ask us which ones are available for your area.
            </p>
            <Cta href={ctaHref} variant="ghost" id={`${id}-cta`} arrow>{ctaLabel}</Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
