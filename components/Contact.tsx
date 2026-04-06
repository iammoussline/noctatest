'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SiteContent } from '@/lib/content/types'

gsap.registerPlugin(ScrollTrigger)

interface ContactProps {
  content: SiteContent
}

export function Contact({ content }: ContactProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const sectionRef = useRef<HTMLElement>(null)
  const { contact } = content

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-left > *', {
        opacity: 0,
        x: -30,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
      gsap.from('.contact-form > *', {
        opacity: 0,
        x: 30,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.querySelector('[name="email"]') as HTMLInputElement)?.value
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRe.test(email)) return

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
        setTimeout(() => setStatus('idle'), 8000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 dark:bg-dark-bg bg-light-bg"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <div className="contact-left flex flex-col gap-8">
            <div>
              <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">
                09 / CONTACT
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-black dark:text-dark-text text-light-text tracking-tight mb-4">
                {contact.title}
              </h2>
              <p className="text-base font-body dark:text-dark-subtle text-light-subtle">
                {contact.subtitle}
              </p>
            </div>

            {/* Info cards */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 p-5 rounded-xl dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-heading font-semibold dark:text-dark-text text-light-text mb-0.5">
                    {contact.address}
                  </div>
                  <div className="text-xs font-body dark:text-dark-subtle text-light-subtle">
                    {contact.city}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm font-heading font-semibold dark:text-dark-text text-light-text hover:text-accent transition-colors"
                    data-cursor="link"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-xl dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse-glow" />
                </div>
                <div>
                  <div className="text-xs font-display tracking-widest dark:text-dark-subtle text-light-subtle uppercase mb-1">
                    {contact.availability}
                  </div>
                  <div className="text-sm font-heading font-semibold text-accent">
                    {contact.available}
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { label: 'Instagram', href: '#', icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                )},
                { label: 'LinkedIn', href: '#', icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                )},
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

          {/* Contact form */}
          <form
            className="contact-form flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder={contact.form.name}
              required
              className="w-full px-5 py-4 rounded-xl dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border dark:text-dark-text text-light-text placeholder:dark:text-dark-subtle placeholder:text-light-subtle text-sm font-body focus:outline-none focus:border-primary transition-colors duration-200"
            />
            <input
              type="email"
              name="email"
              placeholder={contact.form.email}
              required
              className="w-full px-5 py-4 rounded-xl dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border dark:text-dark-text text-light-text placeholder:dark:text-dark-subtle placeholder:text-light-subtle text-sm font-body focus:outline-none focus:border-primary transition-colors duration-200"
            />
            <textarea
              name="message"
              placeholder={contact.form.message}
              required
              rows={6}
              className="w-full px-5 py-4 rounded-xl dark:bg-dark-surface bg-light-surface border dark:border-dark-border border-light-border dark:text-dark-text text-light-text placeholder:dark:text-dark-subtle placeholder:text-light-subtle text-sm font-body focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
            />

            {status === 'success' && (
              <div className="px-5 py-4 rounded-xl bg-accent/10 border border-accent/30 text-sm font-body text-accent">
                {contact.form.success}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 rounded-full bg-primary text-white font-heading font-semibold text-sm hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed"
              data-cursor="link"
            >
              {status === 'sending' ? contact.form.sending : contact.form.send}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
