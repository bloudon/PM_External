import { Link } from 'wouter';
import { Seo } from '@/components/seo';
import { Shell } from '@/components/layout';

function Legal({ name, desc }: { name: string; desc: string }) {
  return (
    <Shell>
      <Seo title={`${name} | Permits Manager`} description={desc} />
      <div className="mx-auto max-w-3xl px-5 md:px-8 py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary mb-4">Legal</p>
        <h1 className="font-display text-5xl font-extrabold">{name}</h1>
        <div className="mt-8 border-2 border-foreground bg-card p-6" data-testid="status-legal-pending">
          <p className="font-semibold">Approved copy is pending.</p>
          <p className="mt-2 text-foreground/80">The approved {name.toLowerCase()} has not yet been supplied for publication, so none is shown here. This page will be updated when the approved text is available.</p>
        </div>
        <p className="mt-6 text-foreground/80">Questions in the meantime? <Link href="/contact" className="font-semibold text-primary underline">Contact us</Link>.</p>
      </div>
    </Shell>
  );
}
export const PrivacyPage = () => <Legal name="Privacy Policy" desc="The Permits Manager privacy policy. Approved copy is pending." />;
export const TermsPage = () => <Legal name="Terms of Service" desc="The Permits Manager terms. Approved copy is pending." />;
