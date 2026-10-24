export type BT = 'contractor' | 'permit_expeditor';

export function parseBt(search: string): BT | '' {
  const v = new URLSearchParams(search).get('businessType');
  return v === 'contractor' || v === 'permit_expeditor' ? v : '';
}

/** Audience implied by the current solution page, as a query string. */
export function audienceQuery(path: string, search = ''): string {
  if (path.startsWith('/solutions/contractors')) return '?businessType=contractor';
  if (path.startsWith('/solutions/permit-expediters')) return '?businessType=permit_expeditor';
  if (path === '/demo' || path === '/signup') {
    const bt = parseBt(search);
    if (bt) return `?businessType=${bt}`;
  }
  return '';
}
