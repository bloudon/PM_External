import { Maximize2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type ScreenshotProps = { label?: boolean };

const asset = (n: string) => `${import.meta.env.BASE_URL}product-screenshots/${n}`;

function ProductScreenshot({ focus, full, alt, caption, label = false, name }: ScreenshotProps & { focus: string; full: string; alt: string; caption: string; name: string }) {
  return (
    <figure className="m-0">
      <Dialog>
        <DialogTrigger asChild>
          <button type="button" data-testid={`button-enlarge-${name}`} aria-label={`Enlarge screenshot: ${caption}`}
            className="group relative block w-full cursor-zoom-in overflow-hidden border border-foreground/20 bg-[#1e293b] text-left shadow-[8px_8px_0_0_hsl(var(--primary))] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-ring">
            <img src={asset(focus)} alt={alt} className="block h-auto w-full" loading="lazy" />
            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1.5 rounded bg-[hsl(236_55%_10%)]/90 px-2 py-1 text-xs font-semibold text-white">
              <Maximize2 className="h-3.5 w-3.5" aria-hidden /> Enlarge
            </span>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[min(96vw,1400px)] w-[96vw] p-3 sm:p-4 max-h-[92dvh]">
          <DialogTitle className="pr-8 text-base">{caption}</DialogTitle>
          <DialogDescription className="sr-only">{alt}</DialogDescription>
          <div className="overflow-auto border border-border bg-[#1e293b]">
            <img src={asset(full)} alt={alt} className="block h-auto w-full min-w-[640px]" />
          </div>
        </DialogContent>
      </Dialog>
      <figcaption className="mt-4 font-mono text-[11px] text-muted-foreground">
        {caption} Real application screenshot; identifying record details are hidden.
        {label ? ' Select the image to view the full screen.' : ''}
      </figcaption>
    </figure>
  );
}

export function DashboardMock(props: ScreenshotProps) {
  return <ProductScreenshot name="dashboard" focus="dashboard-focus.png" full="dashboard-dark.png" caption="Dashboard: action-needed alerts and project totals."
    alt="Permits Manager dashboard in dark mode, showing action-needed alerts and project, permit and inspection totals." {...props} />;
}

export function PermitsMock(props: ScreenshotProps) {
  return <ProductScreenshot name="permits" focus="permits-focus.png" full="permits-dark.png" caption="Permits list: statuses and jurisdictions."
    alt="Permits Manager permits list in dark mode, with permit statuses and jurisdictions." {...props} />;
}

export function InspectionsMock(props: ScreenshotProps) {
  return <ProductScreenshot name="inspections" focus="inspections-focus.png" full="inspections-light.png" caption="Inspections: statuses, schedules and inspection types."
    alt="Permits Manager inspections dashboard in light mode, with inspection statuses, scheduled dates and types." {...props} />;
}

export const mocks = {
  dashboard: DashboardMock,
  permits: PermitsMock,
  inspections: InspectionsMock,
};
