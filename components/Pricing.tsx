'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import type { SiteContent, PricingCard } from '@/lib/content/types'

gsap.registerPlugin(ScrollTrigger)

interface PricingProps {
  content: SiteContent
  onBook: (prestation?: string) => void
}

function PricingCardComponent({
  card,
  isPro,
  ctaLabel,
  onBook,
}: {
  card: PricingCard
  isPro: boolean
  ctaLabel: string
  onBook: (p: string) => void
}) {
  return (
    <div
      className={`pricing-card relative flex flex-col rounded-2xl p-8 transition-all duration-500 cursor-pointer group
        ${card.highlight
          ? 'dark:bg-primary/10 bg-primary/5 border-2 border-primary dark:border-primary/60 shadow-xl shadow-primary/10'
          : 'dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border hover:border-primary/30'
        }
      `}
      data-cursor="expand"
    >
      {/* Badge */}
      {card.badge && (
        <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-accent text-dark-bg text-xs font-display font-bold tracking-widest uppercase">
          {card.badge}
        </div>
      )}

      {/* Plan name */}
      <h3 className="text-lg font-display font-bold dark:text-dark-text text-light-text mb-6 tracking-tight">
        {card.name}
      </h3>

      {/* Price */}
      <div className="mb-8">
        {isPro || card.price === 'Devis' || card.price === 'Quote' ? (
          <span className="text-3xl font-display font-black text-accent">{card.price}</span>
        ) : (
          <div className="flex items-end gap-1">
            <span className="text-5xl font-display font-black dark:text-dark-text text-light-text">
              {card.price}
            </span>
            <span className="text-xl font-heading dark:text-dark-subtle text-light-subtle mb-2">
              {card.unit}
            </span>
          </div>
        )}
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3 flex-1 mb-8">
        {card.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm font-body dark:text-dark-subtle text-light-subtle">
            <svg className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => onBook(card.name)}
        className={`w-full py-3.5 rounded-full text-sm font-heading font-semibold transition-all duration-300 ${
          card.highlight
            ? 'bg-primary text-white hover:bg-primary-light hover:shadow-lg hover:shadow-primary/30'
            : 'dark:bg-dark-muted bg-light-muted dark:text-dark-text text-light-text hover:bg-primary hover:text-white'
        }`}
        data-cursor="link"
      >
        {ctaLabel}
      </button>
    </div>
  )
}

export function Pricing({ content, onBook }: PricingProps) {
  const [tab, setTab] = useState<'personal' | 'pro'>('personal')
  const sectionRef = useRef<HTMLElement>(null)

  const { pricing } = content

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-header > *', {
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

  return (
    <section
      ref={sectionRef}
      id="tarifs"
      className="py-24 dark:bg-dark-bg bg-light-bg"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="pricing-header text-center mb-16">
          <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">
            05 / TARIFS
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-black dark:text-dark-text text-light-text tracking-tight mb-4">
            {pricing.title}
          </h2>
          <p className="text-base font-body dark:text-dark-subtle text-light-subtle max-w-md mx-auto mb-8">
            {pricing.subtitle}
          </p>

          {/* Toggle */}
          <div className="inline-flex rounded-full dark:bg-dark-surface bg-light-surface p-1 border dark:border-dark-border border-light-border">
            <button
              onClick={() => setTab('personal')}
              className={`px-6 py-2.5 rounded-full text-sm font-heading font-semibold transition-all duration-300 ${
                tab === 'personal'
                  ? 'bg-primary text-white shadow-md'
                  : 'dark:text-dark-subtle text-light-subtle hover:dark:text-dark-text hover:text-light-text'
              }`}
              data-cursor="link"
            >
              {pricing.togglePersonal}
            </button>
            <button
              onClick={() => setTab('pro')}
              className={`px-6 py-2.5 rounded-full text-sm font-heading font-semibold transition-all duration-300 ${
                tab === 'pro'
                  ? 'bg-primary text-white shadow-md'
                  : 'dark:text-dark-subtle text-light-subtle hover:dark:text-dark-text hover:text-light-text'
              }`}
              data-cursor="link"
            >
              {pricing.togglePro}
            </button>
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-3 gap-6"
          >
            {(tab === 'personal' ? pricing.personal : pricing.pro).map((card, i) => (
              <PricingCardComponent
                key={card.name}
                card={card}
                isPro={tab === 'pro'}
                ctaLabel={tab === 'personal' ? pricing.ctaPersonal : pricing.ctaPro}
                onBook={onBook}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
