export const contractorPath = '/Contractors';

export const tradePaths = {
  roofing: '/roofing',
  'windows-and-doors': '/Windows-doors',
  hvac: '/HVAC',
} as const;

export const legacyLandingPaths: Record<string, string> = {
  '/solutions/contractors': contractorPath,
  '/solutions/contractors/roofing': tradePaths.roofing,
  '/solutions/contractors/windows-and-doors': tradePaths['windows-and-doors'],
  '/solutions/contractors/hvac': tradePaths.hvac,
};

/** Preserve raw URL context; this is a client-side compatibility redirect. */
export function landingRedirectTarget(path: string, search = '', hash = ''): string | undefined {
  const target = Object.hasOwn(legacyLandingPaths, path) ? legacyLandingPaths[path] : undefined;
  return target ? `${target}${search}${hash}` : undefined;
}
