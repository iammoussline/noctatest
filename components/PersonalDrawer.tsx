'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SiteContent } from '@/lib/content/types'

interface PersonalDrawerProps {
  content: SiteContent
  isOpen: boolean
  prestation: string
  onClose: () => void
}

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-lg dark:bg-dark-muted bg-light-muted border dark:border-dark-border border-light-border dark:text-dark-text text-light-text placeholder:dark:text-dark-subtle placeholder:text-light-subtle text-sm font-body focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-200'

export function PersonalDrawer({ content, isOpen, prestation, onClose }: PersonalDrawerProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const isFr = content.lang === 'fr'

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mojkbzrv', {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) {
        formRef.current?.reset()
        setTimeout(() => { setStatus('idle'); onClose() }, 4000)
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 dark:bg-black/60 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md dark:bg-dark-surface bg-light-bg border-l dark:border-dark-border border-light-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b dark:border-dark-border border-light-border flex-shrink-0">
              <div>
                <h3 className="text-xl font-display font-black dark:text-dark-text text-light-text tracking-tight">
                  {isFr ? 'Réserver une séance' : 'Book a session'}
                </h3>
                <p className="text-sm font-body dark:text-dark-subtle text-light-subtle mt-1">
                  {isFr ? 'Je vous confirme sous 48h' : 'I\'ll confirm within 48h'}
                </p>
                {prestation && (
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-display tracking-wider bg-accent/15 text-accent border border-accent/25">
                    {prestation}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full dark:bg-dark-muted bg-light-muted flex items-center justify-center dark:text-dark-subtle text-light-subtle hover:text-primary transition-colors ml-4 flex-shrink-0"
                aria-label="Fermer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-6" data-lenis-prevent>
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input type="hidden" name="prestation" value={prestation} />
                <input type="hidden" name="type" value="particulier" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="name"
                    placeholder={isFr ? 'Nom complet *' : 'Full name *'}
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

                <input
                  type="tel"
                  name="phone"
                  placeholder={isFr ? 'Téléphone (optionnel)' : 'Phone (optional)'}
                  className={INPUT_CLASS}
                />

                <input
                  type="date"
                  name="date"
                  className={INPUT_CLASS}
                  title={isFr ? 'Date souhaitée' : 'Desired date'}
                />

                <input
                  type="text"
                  name="location"
                  placeholder={isFr ? 'Lieu souhaité (studio, extérieur…)' : 'Preferred location (studio, outdoor…)'}
                  className={INPUT_CLASS}
                />

                <textarea
                  name="message"
                  placeholder={isFr ? 'Vos attentes, inspirations, détails…' : 'Your expectations, inspirations, details…'}
                  rows={4}
                  className={`${INPUT_CLASS} resize-none`}
                />

                {status === 'success' && (
                  <div className="px-4 py-3 rounded-lg bg-accent/10 border border-accent/30 text-sm font-body text-accent">
                    {isFr ? '✓ Demande envoyée ! Je vous confirme rapidement.' : '✓ Request sent! I\'ll confirm shortly.'}
                  </div>
                )}
                {status === 'error' && (
                  <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm font-body text-red-400">
                    {isFr ? 'Erreur. Réessayez ou écrivez-moi par email.' : 'Error. Please retry or email me directly.'}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative w-full py-3.5 rounded-full bg-accent text-dark-bg font-heading font-bold text-sm overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed group mt-1"
                  data-cursor="link"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  <span className="relative flex items-center justify-center gap-2">
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        {isFr ? 'Envoi…' : 'Sending…'}
                      </>
                    ) : (
                      <>
                        {isFr ? 'Confirmer la réservation' : 'Confirm booking'}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
