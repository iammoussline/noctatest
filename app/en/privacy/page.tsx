import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Noctara.',
  robots: { index: false },
}

const sections = [
  { title: '1. Data Controller', content: 'Noctara, professional photographer based in Clermont-Ferrand, France. Contact: contact@thenoctara.com' },
  { title: '2. Data Collected', content: 'Noctara only collects data necessary for services: first and last name, email, and information related to photography projects. No sensitive data is collected.' },
  { title: '3. Use of Data', content: 'Data is used exclusively to: respond to contact requests, prepare quotes, manage services, and send information related to ongoing projects.' },
  { title: '4. Data Retention', content: 'Data is kept for the duration necessary to perform services, then deleted within 3 years after the end of the business relationship.' },
  { title: '5. User Rights', content: 'Under GDPR, you have the right to access, rectify, delete, and object to your data. To exercise these rights, contact: contact@thenoctara.com' },
  { title: '6. Cookies', content: 'This site uses functional cookies (theme preferences) stored in localStorage. No third-party or tracking cookies are used.' },
  { title: '7. Security', content: 'Noctara implements appropriate technical measures to protect your data against unauthorized access, alteration, or disclosure.' },
]

export default function PrivacyEn() {
  return (
    <div className="min-h-screen dark:bg-dark-bg bg-light-bg py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/en" className="inline-flex items-center gap-2 text-sm font-body dark:text-dark-subtle text-light-subtle hover:text-accent transition-colors mb-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to site
        </Link>
        <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">LEGAL</p>
        <h1 className="text-3xl md:text-4xl font-display font-black dark:text-dark-text text-light-text tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-sm font-body dark:text-dark-subtle text-light-subtle mb-12">Noctara · GDPR · Last updated: January 2025</p>
        <div className="flex flex-col gap-8">
          {sections.map((s) => (
            <div key={s.title} className="p-6 rounded-xl dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border">
              <h2 className="text-base font-display font-bold dark:text-dark-text text-light-text mb-3">{s.title}</h2>
              <p className="text-sm font-body dark:text-dark-subtle text-light-subtle leading-relaxed">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
