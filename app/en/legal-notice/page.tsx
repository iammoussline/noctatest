import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Legal Notice — Noctara.',
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
        <h1 className="text-3xl md:text-4xl font-display font-black dark:text-dark-text text-light-text tracking-tight mb-12">Legal Notice</h1>
        <div className="flex flex-col gap-6">
          {[
            { title: 'Site Publisher', items: ['Noctara', 'Professional Photographer', '15 Rue Blatin, 63000 Clermont-Ferrand, France', 'Email: contact@thenoctara.com', 'Business registration: Pending'] },
            { title: 'Hosting', items: ['Vercel Inc.', '340 Pine Street, Suite 701, San Francisco, CA 94104', 'https://vercel.com'] },
            { title: 'Intellectual Property', items: ['All content on this site (texts, photographs, logos) is the exclusive property of Noctara. Any reproduction, distribution or use without prior written authorization is strictly prohibited.'] },
            { title: 'Limitation of Liability', items: ['Noctara strives to ensure the accuracy of information on this site. However, it cannot be held responsible for errors or omissions, or the use thereof.'] },
            { title: 'Governing Law', items: ['These legal notices are governed by French law. In the event of a dispute, French courts shall have exclusive jurisdiction.'] },
          ].map((section) => (
            <div key={section.title} className="p-6 rounded-xl dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border">
              <h2 className="text-base font-display font-bold dark:text-dark-text text-light-text mb-3">{section.title}</h2>
              <ul className="flex flex-col gap-1">
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
