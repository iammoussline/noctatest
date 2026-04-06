import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions — Noctara.',
  robots: { index: false },
}

const sections = [
  { title: '1. Purpose', content: 'These general terms and conditions apply to all services contracted by Noctara (professional photographer) with its clients.' },
  { title: '2. Quotes & Orders', content: 'All services require a prior quote. The quote is valid for 30 days. The order is confirmed by payment of a 30% deposit of the total amount.' },
  { title: '3. Pricing', content: 'Prices are listed in euros including tax. Noctara reserves the right to modify prices at any time. Services are billed at the rates in effect at the time of confirmation.' },
  { title: '4. Payment', content: 'The balance is due upon delivery of files. Payments are made by bank transfer or PayPal. In case of late payment, penalties of 3× the legal rate apply.' },
  { title: '5. Intellectual Property', content: 'The photographs remain the intellectual property of Noctara. The client receives a personal, non-commercial usage license unless otherwise agreed in writing.' },
  { title: '6. Delivery', content: 'Digital files are delivered via a private online gallery within the agreed timeframe. Noctara commits to delivering high-quality, professionally retouched files.' },
  { title: '7. Cancellation', content: 'Cancellation by the client less than 48h before the service results in forfeiture of the deposit. Cancellation by Noctara results in full refund of amounts paid.' },
  { title: '8. Liability', content: 'Noctara cannot be held responsible for the loss or damage of files once delivered. It is strongly recommended to make backups.' },
]

export default function CGVEn() {
  return (
    <div className="min-h-screen dark:bg-dark-bg bg-light-bg py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/en" className="inline-flex items-center gap-2 text-sm font-body dark:text-dark-subtle text-light-subtle hover:text-accent transition-colors mb-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back to site
        </Link>
        <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">LEGAL</p>
        <h1 className="text-3xl md:text-4xl font-display font-black dark:text-dark-text text-light-text tracking-tight mb-2">Terms & Conditions</h1>
        <p className="text-sm font-body dark:text-dark-subtle text-light-subtle mb-12">Noctara · Last updated: January 2025</p>
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
