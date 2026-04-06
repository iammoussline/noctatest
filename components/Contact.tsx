'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SiteContent } from '@/lib/content/types'

gsap.registerPlugin(ScrollTrigger)

interface ContactProps {
  content: SiteContent
}

const INPUT_CLASS =
  'w-full px-5 py-4 rounded-xl dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border dark:text-dark-text text-light-text placeholder:dark:text-dark-subtle placeholder:text-light-subtle text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200'

const PROJECT_TYPES_FR = ['Portrait', 'Corporate', 'Mariage', 'Événement', 'Autre']
const PROJECT_TYPES_EN = ['Portrait', 'Corporate', 'Wedding', 'Events', 'Other']

const INFO_ITEMS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    value: 'contact@thenoctara.com',
    href: 'mailto:contact@thenoctara.com',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'Téléphone',
    value: '+33 6 XX XX XX XX',
    href: 'tel:+33600000000',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Studio',
    value: 'Clermont-Ferrand — et partout en France',
    href: null,
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'Réponse',
    value: 'Sous 48h',
    href: null,
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: null,
    label: 'Disponibilité',
    value: 'Actuellement — Indisponible',
    href: null,
    color: 'bg-red-500/10 text-red-400',
    dot: 'bg-red-400',
  },
]

export function Contact({ content }: ContactProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const sectionRef = useRef<HTMLElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const isFr = content.lang === 'fr'
  const projectTypes = isFr ? PROJECT_TYPES_FR : PROJECT_TYPES_EN

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info-item', {
        opacity: 0,
        x: -24,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      })
      gsap.from('.contact-form-field', {
        opacity: 0,
        y: 16,
        stagger: 0.07,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return

    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mojkbzrv', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) {
        form.reset()
        setTimeout(() => setStatus('idle'), 8000)
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-28 dark:bg-dark-bg bg-light-bg"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-4">CONTACT</p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-black dark:text-dark-text text-light-text tracking-tight leading-[1.05]">
            Parlons de<br />
            <span className="text-accent">votre projet</span>
          </h2>
          <p className="mt-6 text-base font-body dark:text-dark-subtle text-light-subtle max-w-lg leading-relaxed">
            Chaque projet commence par une conversation. Décrivez-moi votre vision — je vous réponds sous 48h avec des idées concrètes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — info */}
          <div className="flex flex-col gap-3">
            {INFO_ITEMS.map((item, i) => (
              <div
                key={i}
                className="contact-info-item flex items-center gap-4 p-4 rounded-xl dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  {item.icon ?? (
                    <span className={`w-2.5 h-2.5 rounded-full ${item.dot} animate-pulse`} />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-display tracking-widest dark:text-dark-subtle text-light-subtle uppercase mb-0.5">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-heading font-semibold dark:text-dark-text text-light-text hover:text-accent transition-colors truncate block"
                      data-cursor="link"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className={`text-sm font-heading font-semibold ${item.dot ? 'text-red-400' : 'dark:text-dark-text text-light-text'}`}>
                      {item.value}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Socials */}
            <div className="flex gap-3 pt-2">
              {[
                {
                  label: 'Instagram', href: '#',
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                },
                {
                  label: 'LinkedIn', href: '#',
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-full dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border flex items-center justify-center dark:text-dark-subtle text-light-subtle hover:border-primary hover:text-primary transition-all duration-300"
                  data-cursor="link"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="contact-form-field grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="name"
                placeholder="Nom complet *"
                required
                className={INPUT_CLASS}
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                required
                className={INPUT_CLASS}
              />
            </div>

            <div className="contact-form-field">
              <input
                type="text"
                name="company"
                placeholder="Entreprise (optionnel)"
                className={INPUT_CLASS}
              />
            </div>

            <div className="contact-form-field">
              <select
                name="project_type"
                required
                defaultValue=""
                className={`${INPUT_CLASS} appearance-none cursor-pointer`}
              >
                <option value="" disabled>Type de projet *</option>
                {projectTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="contact-form-field">
              <textarea
                name="message"
                placeholder="Message *"
                required
                rows={5}
                className={`${INPUT_CLASS} resize-none`}
              />
            </div>

            {status === 'success' && (
              <div className="contact-form-field px-5 py-4 rounded-xl bg-accent/10 border border-accent/30 text-sm font-body text-accent">
                ✓ Message envoyé ! Je vous réponds sous 48h.
              </div>
            )}
            {status === 'error' && (
              <div className="contact-form-field px-5 py-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm font-body text-red-400">
                Une erreur s&apos;est produite. Réessayez ou écrivez directement par email.
              </div>
            )}

            {/* Animated send button */}
            <div className="contact-form-field">
              <motion.button
                ref={btnRef}
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full py-4 rounded-full bg-primary text-white font-heading font-semibold text-sm overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed group"
                data-cursor="link"
              >
                {/* Shimmer */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

                <span className="relative flex items-center justify-center gap-2">
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <motion.svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </motion.svg>
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
