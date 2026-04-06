'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import type { SiteContent } from '@/lib/content/types'

interface NavigationProps {
  content: SiteContent
}

export function Navigation({ content }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isFr = content.lang === 'fr'

  useEffect(() => {
    // Init theme from localStorage
    const stored = localStorage.getItem('noctara-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = stored ? stored === 'dark' : prefersDark
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.classList.toggle('light', !dark)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('noctara-theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
    document.documentElement.classList.toggle('light', !next)
  }

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true)
      gsap.fromTo(
        overlayRef.current,
        { clipPath: 'circle(0% at 95% 5%)' },
        { clipPath: 'circle(150% at 95% 5%)', duration: 0.7, ease: 'power3.inOut' }
      )
      gsap.from('.menu-link', {
        y: 40,
        opacity: 0,
        stagger: 0.07,
        delay: 0.3,
        duration: 0.6,
        ease: 'power3.out',
      })
    } else {
      gsap.to(overlayRef.current, {
        clipPath: 'circle(0% at 95% 5%)',
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => setMenuOpen(false),
      })
    }
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      if (menuOpen) toggleMenu()
      setTimeout(() => {
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }, menuOpen ? 600 : 0)
    } else {
      if (menuOpen) toggleMenu()
    }
  }

  const langHref = isFr ? '/en' : '/'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 dark:bg-dark-bg/80 bg-light-bg/80 backdrop-blur-xl border-b dark:border-dark-border border-light-border'
            : 'py-5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={isFr ? '/' : '/en'}
            className="font-logo text-2xl dark:text-dark-text text-light-text hover:text-accent transition-colors duration-300"
            data-cursor="link"
          >
            Noctara<span className="text-accent">.</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-8">
            {content.nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-heading font-medium dark:text-dark-subtle text-light-subtle hover:text-accent transition-colors duration-200 tracking-wide"
                  data-cursor="link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full dark:bg-dark-surface bg-light-surface flex items-center justify-center dark:text-dark-subtle text-light-subtle hover:text-accent transition-colors duration-200"
              aria-label="Toggle theme"
              data-cursor="link"
            >
              {isDark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Language */}
            <Link
              href={langHref}
              className="text-xs font-display font-bold dark:text-dark-subtle text-light-subtle hover:text-accent transition-colors duration-200 tracking-widest px-2 py-1 rounded dark:bg-dark-surface bg-light-surface"
              data-cursor="link"
            >
              {isFr ? 'EN' : 'FR'}
            </Link>

            {/* CTA Book */}
            <button
              onClick={() => {
                const el = document.getElementById('devis-trigger')
                el?.click()
              }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-heading font-semibold hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
              data-cursor="link"
            >
              {content.nav.book}
            </button>

            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className="flex flex-col gap-1.5 p-2 lg:hidden"
              aria-label="Toggle menu"
              data-cursor="link"
            >
              <span className={`block h-px w-6 dark:bg-dark-text bg-light-text transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px w-4 dark:bg-dark-text bg-light-text transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-px w-6 dark:bg-dark-text bg-light-text transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile / Full overlay menu */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-40 dark:bg-dark-surface bg-light-bg flex flex-col items-center justify-center"
          style={{ clipPath: 'circle(0% at 95% 5%)' }}
        >
          <nav className="flex flex-col items-center gap-8">
            {content.nav.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="menu-link text-4xl md:text-6xl font-display font-black dark:text-dark-text text-light-text hover:text-accent transition-colors duration-200 tracking-tight"
                data-cursor="link"
              >
                {link.label}
              </a>
            ))}
            <div className="menu-link flex gap-4 mt-4">
              <Link
                href={langHref}
                className="text-sm font-display dark:text-dark-subtle text-light-subtle hover:text-accent transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {isFr ? 'English' : 'Français'}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
