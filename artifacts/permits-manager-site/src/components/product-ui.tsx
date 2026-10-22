type ScreenshotProps = { label?: boolean };

function ProductScreenshot({
  src,
  alt,
  label = false,
}: ScreenshotProps & { src: string; alt: string }) {
  return (
    <figure className="m-0">
      <div className="overflow-hidden border border-foreground/20 bg-[#1e293b] shadow-[8px_8px_0_0_hsl(var(--primary))]">
        <img src={src} alt={alt} className="block h-auto w-full" loading="lazy" />
      </div>
      {label && (
        <figcaption className="mt-4 font-mono text-[11px] text-muted-foreground">
          Actual Permits Manager application screenshot.
        </figcaption>
      )}
    </figure>
  );
}

export function DashboardMock(props: ScreenshotProps) {
  return (
    <ProductScreenshot
      src={`${import.meta.env.BASE_URL}product-screenshots/dashboard-dark.png`}
      alt="Permits Manager dashboard in dark mode, showing action-needed alerts, project totals, permits, inspections, work orders, and recent assignments."
      {...props}
    />
  );
}

export function DocumentsMock(props: ScreenshotProps) {
  return (
    <ProductScreenshot
      src={`${import.meta.env.BASE_URL}product-screenshots/permits-dark.png`}
      alt="Permits Manager permits list in dark mode, with permit statuses, project names, jurisdictions, and dates."
      {...props}
    />
  );
}

export function InspectionsMock(props: ScreenshotProps) {
  return (
    <ProductScreenshot
      src={`${import.meta.env.BASE_URL}product-screenshots/inspections-light.png`}
      alt="Permits Manager inspections dashboard in light mode, with inspection statuses, scheduled dates, and assigned team members."
      {...props}
    />
  );
}

export function FeesMock(props: ScreenshotProps) {
  return (
    <ProductScreenshot
      src={`${import.meta.env.BASE_URL}product-screenshots/contractors-light.png`}
      alt="Permits Manager contractor directory in light mode, showing client records."
      {...props}
    />
  );
}

export function AssignMock(props: ScreenshotProps) {
  return <DashboardMock {...props} />;
}

export const mocks = {
  dashboard: DashboardMock,
  documents: DocumentsMock,
  inspections: InspectionsMock,
  fees: FeesMock,
  assign: AssignMock,
};
