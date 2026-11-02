export type BT = 'contractor' | 'permit_expeditor';
export const industries = [
  { value: 'roofing', label: 'Roofing' },
  { value: 'windows-and-doors', label: 'Windows and doors' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'other', label: 'Other / multiple trades' },
] as const;
export type Industry = typeof industries[number]['value'];

export function parseIndustry(search: string): Industry | '' {
  const value = new URLSearchParams(search).get('industry');
  return industries.find((industry) => industry.value === value)?.value ?? '';
}

export function requestQuery(bt: BT | '', industry: Industry | ''): string {
  const params = new URLSearchParams();
  if (bt) params.set('businessType', bt);
  if (industry && bt !== 'permit_expeditor') params.set('industry', industry);
  return params.size ? `?${params}` : '';
}

export function parseBt(search: string): BT | '' {
  const v = new URLSearchParams(search).get('businessType');
  return v === 'contractor' || v === 'permit_expeditor' ? v : '';
}

/** Audience implied by the current solution page, as a query string. */
export function audienceQuery(path: string, search = ''): string {
  if (path === '/solutions/contractors' || path.startsWith('/solutions/contractors/')) {
    const slug = path.slice('/solutions/contractors/'.length);
    const industry = industries.find((x) => x.value !== 'other' && x.value === slug)?.value ?? '';
    return requestQuery('contractor', industry);
  }
  if (path === '/solutions/permit-expediters') return '?businessType=permit_expeditor';
  if (path === '/demo' || path === '/signup') {
    return requestQuery(parseBt(search), parseIndustry(search));
  }
  return '';
}
