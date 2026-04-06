'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import type { SiteContent } from '@/lib/content/types'

gsap.registerPlugin(ScrollTrigger)

interface TestimonialsProps {
  content: SiteContent
}

export function Testimonials({ content }: TestimonialsProps) {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)
  const sectionRef = useRef<HTMLElement>(null)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const { testimonials } = content
  const items = testimonials.items

  const go = useCallback((index: number, dir: number) => {
    setDirection(dir)
    setActive(index)
  }, [])

  const next = useCallback(() => {
    go((active + 1) % items.length, 1)
  }, [active, items.length, go])

  const prev = useCallback(() => {
    go((active - 1 + items.length) % items.length, -1)
  }, [active, items.length, go])

  // Auto-advance
  useEffect(() => {
    autoRef.current = setInterval(next, 5500)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [next])

  const handleManual = (fn: () => void) => {
    if (autoRef.current) clearInterval(autoRef.current)
    fn()
    autoRef.current = setInterval(next, 5500)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonials-header > *', {
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
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -60 : 60,
      opacity: 0,
    }),
  }

  return (
    <section
      ref={sectionRef}
      id="temoignages"
      className="py-24 dark:bg-dark-bg bg-light-bg"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="testimonials-header text-center mb-16">
          <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">
            07 / TÉMOIGNAGES
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-black dark:text-dark-text text-light-text tracking-tight mb-4">
            {testimonials.title}
          </h2>
          <p className="text-base font-body dark:text-dark-subtle text-light-subtle">
            {testimonials.subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={active}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              {/* Quote */}
              <div className="text-6xl text-primary/20 font-serif leading-none mb-6">&ldquo;</div>

              <p className="text-lg md:text-xl font-heading dark:text-dark-text text-light-text leading-relaxed max-w-2xl mb-10">
                {items[active].text}
              </p>

              {/* Author */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-display font-bold text-white">
                    {items[active].initials}
                  </span>
                </div>
                <div>
                  <div className="font-heading font-semibold dark:text-dark-text text-light-text text-sm">
                    {items[active].name}
                  </div>
                  <div className="text-xs font-body dark:text-dark-subtle text-light-subtle">
                    {items[active].role}
                  </div>
                </div>
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={() => handleManual(prev)}
              className="w-10 h-10 rounded-full dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border flex items-center justify-center dark:text-dark-subtle text-light-subtle hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Previous"
              data-cursor="link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleManual(() => go(i, i > active ? 1 : -1))}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-8 h-2 bg-primary'
                      : 'w-2 h-2 dark:bg-dark-muted bg-light-muted hover:bg-primary/50'
                  }`}
                  aria-label={`Go to ${i + 1}`}
                  data-cursor="link"
                />
              ))}
            </div>

            <button
              onClick={() => handleManual(next)}
              className="w-10 h-10 rounded-full dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border flex items-center justify-center dark:text-dark-subtle text-light-subtle hover:border-primary hover:text-primary transition-all duration-300"
              aria-label="Next"
              data-cursor="link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
