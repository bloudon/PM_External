import { useState, useId, useEffect, type ReactNode, type FormEvent } from 'react';
import { Link, useSearch } from 'wouter';
import { parseBt } from '@/lib/audience';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSubmitDemoRequest, useSubmitAccessRequest, useSubmitContactRequest } from '@workspace/api-client-react';
import { APP_URL } from '@/lib/config';
import { useMarketingEvent } from '@/lib/marketing';
import { buildDemoDetails, DEMO_DETAILS_LIMIT, permitProcesses } from '@/lib/demo-details';

type BT = 'contractor' | 'permit_expeditor';
type BTSel = BT | '';

function useAudience() {
  const search = useSearch();
  const [bt, setBt] = useState<BTSel>(() => parseBt(search));
  useEffect(() => { setBt(parseBt(search)); }, [search]);
  return [bt, setBt] as const;
}
type Vol = '1-10' | '11-25' | '26-50' | '51-100' | '100+' | 'not_sure';

const input = 'w-full bg-card border-2 border-input rounded-md px-3 py-2.5 text-[15px] focus:border-primary';

function Field({ label, optional, children, htmlFor, hint }: { label: string; optional?: boolean; children: ReactNode; htmlFor: string; hint?: string }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold">
        {label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Submit({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button type="submit" disabled={pending} data-testid="button-submit"
      className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3.5 font-semibold shadow-[4px_4px_0_0_hsl(var(--foreground))] disabled:opacity-70 disabled:shadow-none">
      {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {pending ? 'Sending...' : children}
    </button>
  );
}

function ErrorBox({ onRetry }: { onRetry?: () => void }) {
  return (
    <div role="alert" className="flex gap-3 border-2 border-destructive bg-[hsl(0_80%_96%)] p-4 text-sm" data-testid="status-error">
      <AlertCircle className="h-5 w-5 text-destructive shrink-0" aria-hidden />
      <div>
        <p className="font-semibold">We could not send your request.</p>
        <p className="text-foreground/80">Your form has not been cleared. Check your connection and try again later. If you recently submitted several requests, wait 15 minutes before retrying.</p>
        {onRetry && <button type="button" onClick={onRetry} className="mt-2 font-semibold underline">Dismiss and edit</button>}
      </div>
    </div>
  );
}

function Success({ title, message, children }: { title: string; message: string; children?: ReactNode }) {
  return (
    <div role="status" className="border-2 border-foreground bg-card p-6 md:p-8 shadow-[6px_6px_0_0_hsl(var(--primary))]" data-testid="status-success">
      <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden />
      <h2 className="font-display text-2xl font-bold mt-3">{title}</h2>
      <p className="mt-2 text-foreground/85">{message}</p>
      {children}
    </div>
  );
}

const typeOptions = (
  <>
    <option value="contractor">Contractor / Construction Company</option>
    <option value="permit_expeditor">Permit Expediting Company</option>
  </>
);

export function DemoForm() {
  const id = useId();
  const m = useSubmitDemoRequest();
  const sendEvent = useMarketingEvent();
  const [bt, setBt] = useAudience();
  const [process, setProcess] = useState('');
  const [challenge, setChallenge] = useState('');
  const details = buildDemoDetails(process, challenge);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (m.isPending) return;
    if (!bt) return;
    const f = new FormData(e.currentTarget);
    const submittedDetails = buildDemoDetails(String(f.get('process') || ''), String(f.get('challenge') || ''));
    if (!submittedDetails.ok) {
      (e.currentTarget.elements.namedItem('challenge') as HTMLTextAreaElement)?.focus();
      return;
    }
    m.mutate({ data: { fullName: String(f.get('name')).trim(), workEmail: String(f.get('email')).trim(), companyName: String(f.get('company')).trim(), businessType: bt, ...(submittedDetails.challenge ? { challenge: submittedDetails.challenge } : {}) } },
      { onSuccess: () => sendEvent('demo_submitted') });
  };
  if (m.isSuccess) return <Success title="Demo request received" message={m.data.message}><p className="mt-3 text-sm text-muted-foreground">Reference {m.data.id}</p></Success>;
  return (
    <form onSubmit={submit} className="grid gap-5" aria-busy={m.isPending}>
      <Field label="Full name" htmlFor={id + 'n'}><input id={id + 'n'} name="name" required minLength={2} maxLength={120} autoComplete="name" className={input} data-testid="input-name" /></Field>
      <Field label="Work email" htmlFor={id + 'e'}><input id={id + 'e'} name="email" type="email" required autoComplete="email" className={input} data-testid="input-email" /></Field>
      <Field label="Company" htmlFor={id + 'c'}><input id={id + 'c'} name="company" required minLength={2} maxLength={160} autoComplete="organization" className={input} data-testid="input-company" /></Field>
      <Field label="Business type" htmlFor={id + 'b'}><select id={id + 'b'} required value={bt} onChange={(e) => setBt(e.target.value as BTSel)} className={input} data-testid="select-business-type"><option value="" disabled>Select business type</option>{typeOptions}</select></Field>
      <Field label="How do you manage permits today?" optional htmlFor={id + 'p'}>
        <select id={id + 'p'} name="process" value={process} onChange={(e) => setProcess(e.target.value)} className={input} data-testid="select-current-process">
          <option value="">Select an option (optional)</option>
          {permitProcesses.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </Field>
      <Field label="Current permitting challenge" optional htmlFor={id + 'x'} hint="Describe it in your own words. Please leave out sensitive information. Your current-process answer and challenge share a 2,000-character limit.">
        <textarea id={id + 'x'} name="challenge" rows={4} maxLength={DEMO_DETAILS_LIMIT} value={challenge} onChange={(e) => setChallenge(e.target.value)} aria-invalid={!details.ok} aria-describedby={!details.ok ? id + 'details-error' : undefined} className={input} data-testid="input-challenge" />
      </Field>
      {!details.ok && <p id={id + 'details-error'} role="alert" className="text-sm text-destructive" data-testid="error-demo-details">{details.error}</p>}
      {m.isError && <ErrorBox />}
      <Submit pending={m.isPending}>Request a Demo</Submit>
    </form>
  );
}

export function ContactForm() {
  const id = useId();
  const m = useSubmitContactRequest();
  const sendEvent = useMarketingEvent();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (m.isPending) return;
    const f = new FormData(e.currentTarget);
    const company = String(f.get('company') || '').trim();
    m.mutate({ data: { fullName: String(f.get('name')).trim(), workEmail: String(f.get('email')).trim(), message: String(f.get('message')).trim(), ...(company ? { companyName: company } : {}) } },
      { onSuccess: () => sendEvent('contact_submitted') });
  };
  if (m.isSuccess) return <Success title="Message received" message={m.data.message} />;
  return (
    <form onSubmit={submit} className="grid gap-5" aria-busy={m.isPending}>
      <Field label="Full name" htmlFor={id + 'n'}><input id={id + 'n'} name="name" required minLength={2} maxLength={120} autoComplete="name" className={input} data-testid="input-name" /></Field>
      <Field label="Work email" htmlFor={id + 'e'}><input id={id + 'e'} name="email" type="email" required autoComplete="email" className={input} data-testid="input-email" /></Field>
      <Field label="Company" optional htmlFor={id + 'c'}><input id={id + 'c'} name="company" maxLength={160} autoComplete="organization" className={input} data-testid="input-company" /></Field>
      <Field label="Message" htmlFor={id + 'm'} hint="At least 10 characters.">
        <textarea id={id + 'm'} name="message" rows={6} required minLength={10} maxLength={3000} className={input} data-testid="input-message" />
      </Field>
      {m.isError && <ErrorBox />}
      <Submit pending={m.isPending}>Send Message</Submit>
    </form>
  );
}

const intro: Record<BT, string> = {
  contractor: 'Tell us about your company and the permitting your team handles in-house. We will follow up with a guided walkthrough to get you up and running fast.',
  permit_expeditor: 'Tell us about your expediting company and the volume you handle for clients. We will follow up with a guided walkthrough to get you up and running fast.',
};

export function SignupForm() {
  const id = useId();
  const m = useSubmitAccessRequest();
  const sendEvent = useMarketingEvent();
  const [bt, setBt] = useAudience();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (m.isPending) return;
    if (!bt) return;
    const f = new FormData(e.currentTarget);
    const phone = String(f.get('phone') || '').trim();
    m.mutate({ data: { fullName: String(f.get('name')).trim(), workEmail: String(f.get('email')).trim(), companyName: String(f.get('company')).trim(), businessType: bt, monthlyPermitVolume: String(f.get('volume')) as Vol, ...(phone ? { phone } : {}) } },
      { onSuccess: () => sendEvent('signup_submitted') });
  };
  if (m.isSuccess)
    return (
      <Success title="Access request received" message={m.data.message}>
        <p className="mt-3 text-sm text-foreground/80">Your emailed request is the first step toward your guided walkthrough to get you up and running fast. No login, account, or invitation has been created. Employees joining an existing company need an invitation from their administrator.</p>
        <p className="mt-2 text-sm text-muted-foreground">Reference {m.data.id}</p>
      </Success>
    );
  const opts: [BT, string][] = [['contractor', 'Contractor / Construction Company'], ['permit_expeditor', 'Permit Expediting Company']];
  return (
    <form onSubmit={submit} className="grid gap-5" aria-busy={m.isPending}>
      <fieldset>
        <legend className="text-sm font-semibold mb-2">Business type</legend>
        <div className="grid sm:grid-cols-2 gap-3" role="radiogroup">
          {opts.map(([v, t]) => (
            <label key={v} className={`cursor-pointer border-2 p-4 font-semibold text-sm flex items-center gap-3 has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-ring ${bt === v ? 'border-primary bg-[hsl(240_100%_96%)]' : 'border-input bg-card'}`}>
              <input type="radio" name="bt" required value={v} checked={bt === v} onChange={() => setBt(v)} className="accent-[#2626FF] h-4 w-4" data-testid={`radio-${v}`} />
              {t}
            </label>
          ))}
        </div>
        <p className="mt-3 text-sm text-foreground/80" data-testid="text-signup-intro">{bt ? intro[bt] : 'Choose the option that fits your company. You can change it at any time before sending.'}</p>
      </fieldset>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" htmlFor={id + 'n'}><input id={id + 'n'} name="name" required minLength={2} maxLength={120} autoComplete="name" className={input} data-testid="input-name" /></Field>
        <Field label="Work email" htmlFor={id + 'e'}><input id={id + 'e'} name="email" type="email" required autoComplete="email" className={input} data-testid="input-email" /></Field>
        <Field label="Company name" htmlFor={id + 'c'}><input id={id + 'c'} name="company" required minLength={2} maxLength={160} autoComplete="organization" className={input} data-testid="input-company" /></Field>
        <Field label="Phone number" optional htmlFor={id + 'p'}><input id={id + 'p'} name="phone" type="tel" maxLength={40} autoComplete="tel" className={input} data-testid="input-phone" /></Field>
      </div>
      <Field label="Approximate monthly permit volume" htmlFor={id + 'v'}>
        <select id={id + 'v'} name="volume" required defaultValue="" className={input} data-testid="select-volume">
          <option value="" disabled>Select a range</option>
          {['1-10', '11-25', '26-50', '51-100', '100+'].map((v) => <option key={v} value={v}>{v}</option>)}
          <option value="not_sure">Not sure</option>
        </select>
      </Field>
      {m.isError && <ErrorBox />}
      <Submit pending={m.isPending}>Request Access</Submit>
      <p className="text-sm text-muted-foreground">
        Already have an account? <a href={APP_URL} className="font-semibold text-primary underline" data-testid="link-signup-signin">Sign In</a>.
        Joining a company that already uses Permits Manager? Ask your administrator for an invitation instead of requesting a new company. Questions? <Link href="/contact" className="underline">Contact us</Link>.
      </p>
    </form>
  );
}
