import { type ReactNode } from 'react';
import { Link } from 'wouter';
import { Seo } from '@/components/seo';
import { Shell } from '@/components/layout';
import { Eyebrow, Reveal } from '@/components/bits';
import { DemoForm, SignupForm, ContactForm } from '@/components/forms';
import { APP_URL } from '@/lib/config';

function FormPage({ eyebrow, h1, lead, aside, children, title, desc }: { eyebrow: string; h1: string; lead: string; aside: ReactNode; children: ReactNode; title: string; desc: string }) {
  return (
    <Shell>
      <Seo title={title} description={desc} />
      <div className="grid-paper">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-14 md:py-20 grid lg:grid-cols-[.85fr_1.15fr] gap-12">
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-[1]">{h1}</h1>
            <p className="mt-5 text-lg text-foreground/85 max-w-md">{lead}</p>
            <div className="mt-8 text-sm text-foreground/80 border-l-4 border-primary pl-4 max-w-md">{aside}</div>
          </Reveal>
          <Reveal delay={0.08}><div className="bg-card border-2 border-foreground p-6 md:p-9 shadow-[8px_8px_0_0_hsl(var(--foreground))]">{children}</div></Reveal>
        </div>
      </div>
    </Shell>
  );
}

export const DemoPage = () => (
  <FormPage title="Request a Demo | Permits Manager" desc="Request a walkthrough of Permits Manager for your contracting or permit expediting business." eyebrow="Request a demo" h1="See it against your own permitting work."
    lead="Tell us who you are and what is hard about permitting today. We will follow up to arrange a walkthrough."
    aside={<>Already a customer? <a href={APP_URL} className="font-semibold underline">Sign In</a>.</>}><DemoForm /></FormPage>
);
export const SignupPage = () => (
  <FormPage title="Get Started | Permits Manager" desc="Request access to Permits Manager for your contractor or permit expediting company." eyebrow="Get started" h1="Request access for your company."
    lead="Choose your business type and tell us a little about your operation. Our team will follow up with the next step."
    aside="This is a request, not instant account creation. Both business types use the same product."><SignupForm /></FormPage>
);
export const ContactPage = () => (
  <FormPage title="Contact | Permits Manager" desc="Send a general inquiry to the Permits Manager team." eyebrow="Contact" h1="Ask us anything."
    lead="General questions about the product or your situation are welcome."
    aside={<>Want a walkthrough instead? <Link href="/demo" className="font-semibold underline">Request a demo</Link>.</>}><ContactForm /></FormPage>
);
