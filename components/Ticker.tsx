'use client'

import type { SiteContent } from '@/lib/content/types'

interface TickerProps {
  items: string[]
}

export function Ticker({ items }: TickerProps) {
  const doubled = [...items, ...items, ...items, ...items]

  return (
    <div className="relative w-full overflow-hidden bg-primary py-4 z-10">
      <div className="flex animate-ticker whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 px-6 text-sm font-display font-bold text-white/90 tracking-widest uppercase"
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-accent/70 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
