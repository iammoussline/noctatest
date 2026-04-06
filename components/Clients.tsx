'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SiteContent } from '@/lib/content/types'

gsap.registerPlugin(ScrollTrigger)

// SVG client logos (abstract/placeholder professional logos)
const CLIENT_LOGOS = [
  { name: 'Volta Agency', svg: (
    <svg viewBox="0 0 120 40" className="h-8 w-auto">
      <text x="10" y="28" fontFamily="Unbounded, sans-serif" fontSize="14" fontWeight="700" fill="currentColor">VOLTA</text>
    </svg>
  )},
  { name: 'Lumière Studio', svg: (
    <svg viewBox="0 0 140 40" className="h-8 w-auto">
      <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <text x="34" y="26" fontFamily="Outfit, sans-serif" fontSize="13" fontWeight="600" fill="currentColor">LUMIÈRE</text>
    </svg>
  )},
  { name: 'Apex Corp', svg: (
    <svg viewBox="0 0 120 40" className="h-8 w-auto">
      <polygon points="20,5 35,30 5,30" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <text x="42" y="26" fontFamily="Unbounded, sans-serif" fontSize="11" fontWeight="700" fill="currentColor">APEX</text>
    </svg>
  )},
  { name: 'Meridian', svg: (
    <svg viewBox="0 0 140 40" className="h-8 w-auto">
      <path d="M5 20 Q20 5 35 20 Q50 35 65 20" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <text x="72" y="26" fontFamily="Outfit, sans-serif" fontSize="13" fontWeight="600" fill="currentColor">MERIDIAN</text>
    </svg>
  )},
  { name: 'Nexus Lab', svg: (
    <svg viewBox="0 0 130 40" className="h-8 w-auto">
      <rect x="5" y="10" width="22" height="22" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <text x="34" y="26" fontFamily="Unbounded, sans-serif" fontSize="11" fontWeight="700" fill="currentColor">NEXUS</text>
    </svg>
  )},
  { name: 'Prism Events', svg: (
    <svg viewBox="0 0 150 40" className="h-8 w-auto">
      <polygon points="20,5 38,35 2,35" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <text x="48" y="26" fontFamily="Outfit, sans-serif" fontSize="12" fontWeight="600" fill="currentColor">PRISM</text>
    </svg>
  )},
  { name: 'Aura Brand', svg: (
    <svg viewBox="0 0 130 40" className="h-8 w-auto">
      <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="1"/>
      <text x="40" y="26" fontFamily="Outfit, sans-serif" fontSize="13" fontWeight="600" fill="currentColor">AURA</text>
    </svg>
  )},
  { name: 'Stelar Group', svg: (
    <svg viewBox="0 0 150 40" className="h-8 w-auto">
      <path d="M20 5 l4 10 h10 l-8 6 3 10 -9-6 -9 6 3-10-8-6 h10z" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      <text x="42" y="26" fontFamily="Unbounded, sans-serif" fontSize="11" fontWeight="700" fill="currentColor">STELAR</text>
    </svg>
  )},
]

interface ClientsProps {
  content: SiteContent
}

export function Clients({ content }: ClientsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.clients-title', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 dark:bg-dark-surface bg-light-surface overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <p className="clients-title text-xs font-display tracking-[0.3em] text-accent uppercase text-center mb-2">
          08 / CLIENTS
        </p>
        <h2 className="clients-title text-center text-2xl font-display font-bold dark:text-dark-subtle text-light-subtle tracking-tight">
          {content.clients.title}
        </h2>
      </div>

      {/* Scrolling logos */}
      <div
        className="relative"
        onMouseEnter={(e) => {
          const track = e.currentTarget.querySelector('.clients-track') as HTMLElement
          if (track) track.style.animationPlayState = 'paused'
        }}
        onMouseLeave={(e) => {
          const track = e.currentTarget.querySelector('.clients-track') as HTMLElement
          if (track) track.style.animationPlayState = 'running'
        }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 dark:bg-gradient-to-r dark:from-dark-surface bg-gradient-to-r from-light-surface to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 dark:bg-gradient-to-l dark:from-dark-surface bg-gradient-to-l from-light-surface to-transparent pointer-events-none" />

        <div
          className="clients-track flex items-center gap-16 animate-clients"
          style={{ width: 'max-content' }}
        >
          {doubled.map((client, i) => (
            <div
              key={i}
              className="flex-shrink-0 dark:text-dark-muted text-light-muted hover:dark:text-dark-subtle hover:text-light-subtle transition-colors duration-300"
              title={client.name}
            >
              {client.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
