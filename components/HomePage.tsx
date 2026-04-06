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
import { PersonalDrawer } from './PersonalDrawer'
import { Footer } from './Footer'
import type { SiteContent } from '@/lib/content/types'

interface HomePageProps {
  content: SiteContent
}

export function HomePage({ content }: HomePageProps) {
  // Pro devis drawer
  const [proOpen, setProOpen] = useState(false)
  const [proPrestation, setProPrestation] = useState('')

  // Personal booking drawer
  const [personalOpen, setPersonalOpen] = useState(false)
  const [personalPrestation, setPersonalPrestation] = useState('')

  const openProDevis = useCallback((p?: string) => {
    setProPrestation(p || '')
    setProOpen(true)
  }, [])

  const openPersonalBooking = useCallback((p?: string) => {
    setPersonalPrestation(p || '')
    setPersonalOpen(true)
  }, [])

  // Generic open — used by nav CTA button (opens pro by default)
  const openDevis = useCallback((p?: string) => {
    setProPrestation(p || '')
    setProOpen(true)
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
        <Pricing
          content={content}
          onPersonalBook={openPersonalBooking}
          onProBook={openProDevis}
        />
        <Process content={content} />
        <Testimonials content={content} />
        <Clients content={content} />
        <Contact content={content} />
      </main>

      <Footer content={content} />

      {/* Pro drawer */}
      <DevisDrawer
        content={content}
        isOpen={proOpen}
        prestation={proPrestation}
        onClose={() => setProOpen(false)}
      />

      {/* Personal drawer */}
      <PersonalDrawer
        content={content}
        isOpen={personalOpen}
        prestation={personalPrestation}
        onClose={() => setPersonalOpen(false)}
      />

      {/* Hidden trigger for nav CTA */}
      <button
        id="devis-trigger"
        onClick={() => openDevis()}
        className="hidden"
        aria-hidden="true"
      />
    </>
  )
}
