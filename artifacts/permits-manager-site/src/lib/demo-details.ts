export const permitProcesses = [
  'Spreadsheet',
  'Email/shared folders',
  'Another software system',
  'A mix',
] as const;

export const DEMO_DETAILS_LIMIT = 2000;

type DemoDetails =
  | { ok: true; challenge?: string }
  | { ok: false; error: string };

export function buildDemoDetails(process: string, challenge: string): DemoDetails {
  if (process && !permitProcesses.some((option) => option === process)) {
    return { ok: false, error: 'Choose one of the listed current-process options or leave it blank.' };
  }
  const text = challenge.trim();
  const details = process
    ? `Current process: ${process}${text ? `\n\nPermitting challenge: ${text}` : ''}`
    : text;
  if (details.length > DEMO_DETAILS_LIMIT) {
    return {
      ok: false,
      error: `Your current-process answer and permitting challenge together exceed ${DEMO_DETAILS_LIMIT.toLocaleString('en-US')} characters. Shorten your challenge by ${details.length - DEMO_DETAILS_LIMIT} characters or leave the current-process question blank.`,
    };
  }
  return { ok: true, ...(details ? { challenge: details } : {}) };
}
