'use client'

import Link from 'next/link'
import type { SiteContent } from '@/lib/content/types'

interface FooterProps {
  content: SiteContent
}

export function Footer({ content }: FooterProps) {
  const { footer } = content

  return (
    <footer className="py-16 dark:bg-dark-surface bg-light-surface border-t dark:border-dark-border border-light-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-logo text-2xl dark:text-dark-text text-light-text">
                Noctara<span className="text-accent">.</span>
              </span>
            </div>
            <p className="text-sm font-body dark:text-dark-subtle text-light-subtle leading-relaxed max-w-xs">
              {footer.description}
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-2">
              {[
                { label: 'Instagram', href: '#', icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                )},
                { label: 'LinkedIn', href: '#', icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                )},
                { label: 'Email', href: `mailto:${content.contact.email}`, icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                )},
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full dark:bg-dark-muted bg-light-muted flex items-center justify-center dark:text-dark-subtle text-light-subtle hover:text-accent hover:dark:bg-dark-border hover:bg-light-border transition-all duration-300"
                  data-cursor="link"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-display tracking-[0.2em] dark:text-dark-subtle text-light-subtle uppercase mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault()
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className="text-sm font-body dark:text-dark-subtle text-light-subtle hover:text-accent transition-colors duration-200"
                    data-cursor="link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-display tracking-[0.2em] dark:text-dark-subtle text-light-subtle uppercase mb-5">
              Légal
            </h4>
            <ul className="flex flex-col gap-3">
              {footer.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-body dark:text-dark-subtle text-light-subtle hover:text-accent transition-colors duration-200"
                    data-cursor="link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t dark:border-dark-border border-light-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body dark:text-dark-subtle text-light-subtle">
            {footer.copyright}
          </p>
          <p className="text-xs font-body dark:text-dark-muted text-light-muted">
            Designed & built with{' '}
            <span className="text-accent">♥</span>
            {' '}— Next.js 15 · GSAP · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
