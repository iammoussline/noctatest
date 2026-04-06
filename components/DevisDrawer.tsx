'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SiteContent } from '@/lib/content/types'

interface DevisDrawerProps {
  content: SiteContent
  isOpen: boolean
  prestation: string
  onClose: () => void
}

export function DevisDrawer({ content, isOpen, prestation, onClose }: DevisDrawerProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const { devis } = content

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mojkbzrv', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
        setTimeout(() => {
          setStatus('idle')
          onClose()
        }, 4000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass = `w-full px-4 py-3 rounded-lg dark:bg-dark-muted bg-light-muted border dark:border-dark-border border-light-border dark:text-dark-text text-light-text placeholder:dark:text-dark-subtle placeholder:text-light-subtle text-sm font-body focus:outline-none focus:border-primary transition-colors duration-200`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 dark:bg-black/60 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
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
                  {devis.title}
                </h3>
                <p className="text-sm font-body dark:text-dark-subtle text-light-subtle mt-1">
                  {devis.subtitle}
                </p>
                {prestation && (
                  <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-display tracking-wider bg-primary/10 text-primary border border-primary/20">
                    {prestation}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full dark:bg-dark-muted bg-light-muted flex items-center justify-center dark:text-dark-subtle text-light-subtle hover:text-primary transition-colors ml-4 flex-shrink-0"
                aria-label="Close"
                data-cursor="link"
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

                <input type="text" name="company" placeholder={devis.fields.company} className={inputClass} />
                <input type="text" name="name" placeholder={devis.fields.name} required className={inputClass} />
                <input type="email" name="email" placeholder={devis.fields.email} required className={inputClass} />
                <input type="date" name="date" placeholder={devis.fields.date} className={inputClass} />
                <input type="text" name="location" placeholder={devis.fields.location} className={inputClass} />
                <input type="number" name="people" placeholder={devis.fields.people} min="1" className={inputClass} />

                <select name="budget" className={inputClass} defaultValue="">
                  <option value="" disabled>{devis.fields.budget}</option>
                  {devis.budgets.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>

                <textarea
                  name="message"
                  placeholder={devis.fields.message}
                  required
                  rows={4}
                  className={`${inputClass} resize-none`}
                />

                {status === 'success' && (
                  <div className="px-4 py-3 rounded-lg bg-accent/10 border border-accent/30 text-sm font-body text-accent">
                    {devis.fields.success}
                  </div>
                )}

                {status === 'error' && (
                  <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm font-body text-red-400">
                    Une erreur s&apos;est produite. Veuillez réessayer.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 rounded-full bg-primary text-white font-heading font-semibold text-sm hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  data-cursor="link"
                >
                  {status === 'sending' ? devis.fields.sending : devis.fields.send}
                </button>
              </form>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
