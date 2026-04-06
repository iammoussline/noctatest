'use client'

import { useState, useCallback } from 'react'
import { Navigation } from './Navigation'
import { Hero } from './Hero'
import { Ticker } from './Ticker'
import { Stats } from './Stats'
import { Portfolio } from './Portfolio'
import { About } from './About'
import { Pricing } from './Pricing'
import { Process } from './Process'
import { Testimonials } from './Testimonials'
import { Clients } from './Clients'
import { Contact } from './Contact'
import { DevisDrawer } from './DevisDrawer'
import { Footer } from './Footer'
import type { SiteContent } from '@/lib/content/types'

interface HomePageProps {
  content: SiteContent
}

export function HomePage({ content }: HomePageProps) {
  const [devisOpen, setDevisOpen] = useState(false)
  const [prestation, setPrestation] = useState('')

  const openDevis = useCallback((p?: string) => {
    setPrestation(p || '')
    setDevisOpen(true)
  }, [])

  const closeDevis = useCallback(() => {
    setDevisOpen(false)
  }, [])

  return (
    <>
      <Navigation content={content} />

      <main>
        <Hero content={content} onBook={openDevis} />
        <Ticker items={content.ticker} />
        <Stats content={content} />
        <Portfolio content={content} />
        <About content={content} />
        <Pricing content={content} onBook={openDevis} />
        <Process content={content} />
        <Testimonials content={content} />
        <Clients content={content} />
        <Contact content={content} />
      </main>

      <Footer content={content} />

      <DevisDrawer
        content={content}
        isOpen={devisOpen}
        prestation={prestation}
        onClose={closeDevis}
      />

      {/* Hidden trigger button for nav CTA */}
      <button
        id="devis-trigger"
        onClick={() => openDevis()}
        className="hidden"
        aria-hidden="true"
      />
    </>
  )
}
