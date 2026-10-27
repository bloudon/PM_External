import { LOGO_MARK } from '@/lib/config';

export function BrandLogo({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 whitespace-nowrap ${dark ? 'text-white' : 'text-foreground'}`}>
      <img
        src={LOGO_MARK}
        alt=""
        width={212}
        height={208}
        className="h-9 w-auto shrink-0 rounded-md bg-white sm:h-11"
      />
      <span className="font-display text-sm font-extrabold italic leading-none sm:text-xl">
        Permits Manager
      </span>
    </span>
  );
}
