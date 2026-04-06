'use client'

import { useRef, useEffect, ReactElement } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SiteContent } from '@/lib/content/types'

gsap.registerPlugin(ScrollTrigger)

const ICONS: Record<string, ReactElement> = {
  chat: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  doc: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  camera: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  ),
  gallery: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
}

interface ProcessProps {
  content: SiteContent
}

export function Process({ content }: ProcessProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  const { process } = content

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.process-header > *', {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Steps
      gsap.from('.process-step', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 80%',
        },
      })

      // Progress bar animation
      gsap.from('.process-bar-fill', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 dark:bg-dark-surface bg-light-surface overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="process-header text-center mb-20">
          <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">
            06 / PROCESSUS
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-black dark:text-dark-text text-light-text tracking-tight mb-4">
            {process.title}
          </h2>
          <p className="text-base font-body dark:text-dark-subtle text-light-subtle max-w-md mx-auto">
            {process.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px dark:bg-dark-border bg-light-border">
            <div className="process-bar-fill h-full bg-gradient-to-r from-primary to-accent" />
          </div>

          {process.steps.map((step, i) => (
            <div
              key={i}
              className="process-step flex flex-col items-center text-center group"
              data-cursor="expand"
            >
              {/* Icon circle */}
              <div className="relative mb-6 z-10">
                <div className="w-16 h-16 rounded-full dark:bg-dark-muted bg-light-muted border dark:border-dark-border border-light-border flex items-center justify-center dark:text-dark-subtle text-light-subtle group-hover:border-primary group-hover:text-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
                  {ICONS[step.icon]}
                </div>
                {/* Step number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-[10px] font-display font-black text-dark-bg">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-display font-bold dark:text-dark-text text-light-text mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm font-body dark:text-dark-subtle text-light-subtle leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
