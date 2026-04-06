'use client'

import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import type { SiteContent, PricingCard } from '@/lib/content/types'

gsap.registerPlugin(ScrollTrigger)

interface PricingProps {
  content: SiteContent
  onPersonalBook: (prestation: string) => void
  onProBook: (prestation: string) => void
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
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className={`relative flex flex-col rounded-2xl overflow-hidden group cursor-default
        ${card.highlight
          ? 'dark:bg-primary/10 bg-primary/5 border-2 border-primary/60 shadow-xl shadow-primary/10'
          : 'dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border'
        }
      `}
    >
      {/* Hover glow overlay */}
      <motion.div
        className={`absolute inset-0 pointer-events-none rounded-2xl ${
          card.highlight
            ? 'bg-gradient-to-br from-primary/10 via-transparent to-accent/5'
            : 'bg-gradient-to-br from-primary/5 via-transparent to-transparent'
        }`}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Top accent line on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent pointer-events-none"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
      />

      {/* Badge inline */}
      {card.badge && (
        <div className="px-8 pt-6 pb-0">
          <motion.span
            className="inline-block px-3 py-1 rounded-full bg-accent text-dark-bg text-[10px] font-display font-black tracking-widest uppercase"
            whileHover={{ scale: 1.05 }}
          >
            {card.badge}
          </motion.span>
        </div>
      )}

      <div className={`relative flex flex-col flex-1 p-8 ${card.badge ? 'pt-4' : ''}`}>
        {/* Plan name */}
        <motion.h3
          className="text-base font-display font-bold dark:text-dark-text text-light-text mb-5 tracking-tight"
          whileHover={{ x: 2 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {card.name}
        </motion.h3>

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

        {/* Features — stagger on hover */}
        <ul className="flex flex-col gap-3 flex-1 mb-8">
          {card.features.map((f, i) => (
            <motion.li
              key={f}
              className="flex items-start gap-3 text-sm font-body dark:text-dark-subtle text-light-subtle"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1, x: 2 }}
              transition={{ delay: i * 0.03 }}
            >
              <motion.svg
                className="w-4 h-4 text-accent mt-0.5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                whileHover={{ scale: 1.2 }}
              >
                <polyline points="20 6 9 17 4 12"/>
              </motion.svg>
              {f}
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          type="button"
          onClick={() => onBook(card.name)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`relative w-full py-3.5 rounded-full text-sm font-heading font-semibold overflow-hidden group/btn ${
            card.highlight
              ? 'bg-primary text-white hover:bg-primary-light hover:shadow-lg hover:shadow-primary/30'
              : 'dark:bg-dark-muted bg-light-muted dark:text-dark-text text-light-text hover:bg-primary hover:text-white'
          }`}
          data-cursor="link"
        >
          {/* Shimmer */}
          <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-600 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
          <span className="relative flex items-center justify-center gap-2">
            {ctaLabel}
            <motion.svg
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              initial={{ x: 0, opacity: 0 }}
              whileHover={{ x: 3, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </motion.svg>
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export function Pricing({ content, onPersonalBook, onProBook }: PricingProps) {
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
          <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">TARIFS</p>
          <h2 className="text-4xl md:text-5xl font-display font-black dark:text-dark-text text-light-text tracking-tight mb-4">
            {pricing.title}
          </h2>
          <p className="text-base font-body dark:text-dark-subtle text-light-subtle max-w-md mx-auto mb-8">
            {pricing.subtitle}
          </p>

          {/* Toggle */}
          <div className="inline-flex rounded-full dark:bg-dark-surface bg-light-surface p-1 border dark:border-dark-border border-light-border">
            {(['personal', 'pro'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`px-6 py-2.5 rounded-full text-sm font-heading font-semibold transition-all duration-300 ${
                  tab === t
                    ? 'bg-primary text-white shadow-md'
                    : 'dark:text-dark-subtle text-light-subtle hover:dark:text-dark-text hover:text-light-text'
                }`}
                data-cursor="link"
              >
                {t === 'personal' ? pricing.togglePersonal : pricing.togglePro}
              </button>
            ))}
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
            className="grid md:grid-cols-3 gap-6 items-stretch"
          >
            {(tab === 'personal' ? pricing.personal : pricing.pro).map((card) => (
              <PricingCardComponent
                key={card.name}
                card={card}
                isPro={tab === 'pro'}
                ctaLabel={tab === 'personal' ? pricing.ctaPersonal : pricing.ctaPro}
                onBook={(p) => tab === 'personal' ? onPersonalBook(p) : onProBook(p)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
