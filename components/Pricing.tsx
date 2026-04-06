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
      className={`relative flex flex-col rounded-2xl transition-all duration-500 group
        ${card.highlight
          ? 'dark:bg-primary/10 bg-primary/5 border-2 border-primary/60 shadow-xl shadow-primary/10'
          : 'dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border hover:border-primary/40 hover:shadow-lg'
        }
      `}
    >
      {/* Badge inline — pas en absolute pour éviter le débordement */}
      {card.badge && (
        <div className="px-8 pt-6 pb-0">
          <span className="inline-block px-3 py-1 rounded-full bg-accent text-dark-bg text-[10px] font-display font-black tracking-widest uppercase">
            {card.badge}
          </span>
        </div>
      )}

      <div className={`flex flex-col flex-1 p-8 ${card.badge ? 'pt-4' : ''}`}>
        {/* Plan name */}
        <h3 className="text-base font-display font-bold dark:text-dark-text text-light-text mb-5 tracking-tight">
          {card.name}
        </h3>

        {/* Price */}
        <div className="mb-7">
          {isPro || card.price === 'Devis' || card.price === 'Quote' ? (
            <span className="text-3xl font-display font-black text-accent">{card.price}</span>
          ) : (
            <div className="flex items-end gap-1">
              <span className="text-5xl font-display font-black dark:text-dark-text text-light-text leading-none">
                {card.price}
              </span>
              <span className="text-xl font-heading dark:text-dark-subtle text-light-subtle mb-1">
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

        {/* CTA — bouton direct, pas de div wrapper */}
        <button
          type="button"
          onClick={() => onBook(card.name)}
          className={`w-full py-3.5 rounded-full text-sm font-heading font-semibold transition-all duration-300 cursor-pointer ${
            card.highlight
              ? 'bg-primary text-white hover:bg-primary-light hover:shadow-lg hover:shadow-primary/30'
              : 'dark:bg-dark-muted bg-light-muted dark:text-dark-text text-light-text hover:bg-primary hover:text-white'
          }`}
          data-cursor="link"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  )
}

export function Pricing({ content, onBook }: PricingProps) {
  const [tab, setTab] = useState<'personal' | 'pro'>('personal')
  const sectionRef = useRef<HTMLElement>(null)
  const { pricing } = content

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pricing-title-block > *', {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
      gsap.from('.pricing-card-item', {
        opacity: 0,
        y: 32,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.pricing-grid',
          start: 'top 85%',
          once: true,
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
        <div className="pricing-title-block text-center mb-16">
          <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">
            TARIFS
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
              type="button"
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
              type="button"
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
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pricing-grid grid md:grid-cols-3 gap-6"
          >
            {(tab === 'personal' ? pricing.personal : pricing.pro).map((card) => (
              <div key={card.name} className="pricing-card-item">
                <PricingCardComponent
                  card={card}
                  isPro={tab === 'pro'}
                  ctaLabel={tab === 'personal' ? pricing.ctaPersonal : pricing.ctaPro}
                  onBook={onBook}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
