'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SiteContent } from '@/lib/content/types'

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  content: SiteContent
  onBook: () => void
}

export function Hero({ content, onBook }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split title into char spans
      const title = titleRef.current
      if (title) {
        const lines = title.querySelectorAll('.hero-line')
        lines.forEach((line) => {
          const text = line.textContent || ''
          line.innerHTML = text
            .split('')
            .map((char) =>
              char === ' '
                ? '<span class="char" style="display:inline-block">&nbsp;</span>'
                : `<span class="char" style="display:inline-block;overflow:hidden"><span style="display:inline-block">${char}</span></span>`
            )
            .join('')
        })

        // Animate chars
        gsap.from('.hero-line .char > span', {
          y: '110%',
          opacity: 0,
          stagger: 0.03,
          duration: 1,
          ease: 'power3.out',
          delay: 0.2,
        })
      }

      // Animate other elements
      gsap.from([descRef.current, ctaRef.current], {
        opacity: 0,
        y: 24,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.9,
      })

      gsap.from(badgeRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.2,
      })

      // Parallax effect on image
      gsap.to(imageRef.current, {
        y: '-10%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Overlay fade on scroll
      gsap.to(overlayRef.current, {
        opacity: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '60% top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden"
      id="hero"
    >
      {/* Background image with parallax */}
      <div ref={imageRef} className="absolute inset-0 scale-[1.3]" data-cursor="expand">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85"
          alt="Paysage photographique Noctara"
          fill
          priority
          className="object-cover grayscale-[60%] contrast-[1.05]"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/60 via-transparent to-dark-bg/90 dark:opacity-100 opacity-60" />
      <div
        ref={overlayRef}
        className="absolute inset-0 dark:bg-dark-bg/40 bg-light-bg/20"
        style={{ opacity: 0.2 }}
      />

      {/* Badge — top left */}
      <div
        ref={badgeRef}
        className="absolute top-28 left-8 md:left-12 z-10"
      >
        <span className="inline-flex items-center text-[0.55rem] font-display tracking-[0.22em] text-white/75 uppercase bg-white/8 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-full">
          {content.hero.badge}
        </span>
      </div>

      {/* Hero content */}
      <div className="relative z-10 px-6 md:px-12 pt-32 pb-20 md:pb-28 max-w-7xl mx-auto w-full">
        {/* Title */}
        <h1
          ref={titleRef}
          className="font-display font-black text-[min(1.75rem,5.5vw)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] tracking-tighter text-white mb-8"
        >
          <span className="hero-line block whitespace-nowrap">{content.hero.line1}</span>
          <span className="hero-line block whitespace-nowrap" style={{ color: '#2d73d4' }}>{content.hero.line2}</span>
        </h1>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <p
            ref={descRef}
            className="text-sm md:text-base font-body text-white/70 max-w-md leading-relaxed"
          >
            {content.hero.description}
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-3">
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/20 text-white text-sm font-heading font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              data-cursor="link"
            >
              {content.hero.cta}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <button
              onClick={() => document.querySelector('#tarifs')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-7 py-3.5 rounded-full bg-primary text-white text-sm font-heading font-semibold hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
              data-cursor="link"
            >
              {content.nav.book}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[0.6rem] font-display tracking-[0.3em] text-white uppercase">Scroll</span>
          <div className="w-px h-10 bg-white/40 overflow-hidden">
            <div className="w-px h-full bg-white animate-[scrollIndicator_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  )
}
