import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Legal Notice — noctara.',
  robots: { index: false },
}

export default function LegalNoticeEn() {
  return (
    <div className="min-h-screen dark:bg-dark-bg bg-light-bg py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/en" className="inline-flex items-center gap-2 text-sm font-body dark:text-dark-subtle text-light-subtle hover:text-accent transition-colors mb-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to site
        </Link>

        <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">LEGAL</p>
        <h1 className="text-3xl md:text-4xl font-display font-black dark:text-dark-text text-light-text tracking-tight mb-12">
          Legal Notice
        </h1>

        <div className="flex flex-col gap-6">
          {[
            {
              title: 'Site Publisher',
              items: [
                'Trade name: noctara.',
                'Sole trader: KANDEMIR MOUHAMMED',
                'Legal form: Sole trader (Micro-enterprise)',
                'SIREN: 820 139 699',
                'SIRET (registered office): 820 139 699 00046',
                'EU VAT number: FR44820139699',
                'RCS number: 820 139 699 R.C.S. Clermont-Ferrand',
                'APE/NAF code: 74.20Z — Photographic activities',
                'Address: Bâtiment 3 - Appt 313, 17 B Rue Bartholdi, 63100 Clermont-Ferrand, France',
                'Email: contact@thenoctara.com',
                'Registered at the RCS of Clermont-Ferrand on 12/08/2025',
              ],
            },
            {
              title: 'Hosting',
              items: [
                'Vercel Inc.',
                '340 Pine Street, Suite 701, San Francisco, CA 94104, USA',
                'https://vercel.com',
              ],
            },
            {
              title: 'Main declared activity',
              items: [
                'Commercial photography and video services, including shooting, retouching, editing, as well as the sale of photo and video media to individuals and professionals.',
                'NAF code 74.20Z — Photographic activities.',
              ],
            },
            {
              title: 'Intellectual Property',
              items: [
                'All content on this site (texts, photographs, logos, visuals) is the exclusive property of KANDEMIR MOUHAMMED — noctara. Any reproduction, distribution or use without prior written authorisation is strictly prohibited and constitutes infringement under French intellectual property law.',
              ],
            },
            {
              title: 'Limitation of Liability',
              items: [
                'noctara. strives to ensure the accuracy of information on this site but cannot be held liable for any errors, omissions, or damages arising from its use.',
              ],
            },
            {
              title: 'Governing Law',
              items: [
                'These legal notices are governed by French law. In the event of a dispute, the competent courts of Clermont-Ferrand shall have exclusive jurisdiction.',
              ],
            },
          ].map((section) => (
            <div key={section.title} className="p-6 rounded-xl dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border">
              <h2 className="text-base font-display font-bold dark:text-dark-text text-light-text mb-3">{section.title}</h2>
              <ul className="flex flex-col gap-1.5">
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm font-body dark:text-dark-subtle text-light-subtle leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
