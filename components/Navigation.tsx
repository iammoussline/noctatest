'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { Magnetic } from '@/components/Magnetic'
import type { SiteContent } from '@/lib/content/types'

interface NavigationProps {
  content: SiteContent
}

export function Navigation({ content }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  // L'overlay est TOUJOURS monté — évite la race condition GSAP/React
  const overlayRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const isFr = content.lang === 'fr'

  useEffect(() => {
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

  const openMenu = () => {
    setMenuOpen(true)
    // overlayRef est toujours disponible car le div est toujours dans le DOM
    gsap.fromTo(
      overlayRef.current,
      { clipPath: 'circle(0% at 95% 5%)' },
      { clipPath: 'circle(150% at 95% 5%)', duration: 0.65, ease: 'power3.inOut' }
    )
    gsap.from('.menu-link', {
      y: 36,
      opacity: 0,
      stagger: 0.07,
      delay: 0.25,
      duration: 0.55,
      ease: 'power3.out',
      clearProps: 'all',
    })
  }

  const closeMenu = () => {
    gsap.to(overlayRef.current, {
      clipPath: 'circle(0% at 95% 5%)',
      duration: 0.45,
      ease: 'power3.inOut',
      onComplete: () => setMenuOpen(false),
    })
  }

  const toggleMenu = () => (menuOpen ? closeMenu() : openMenu())

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('noctara-theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
    document.documentElement.classList.toggle('light', !next)
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      if (menuOpen) closeMenu()
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      }, menuOpen ? 500 : 0)
    } else {
      if (menuOpen) closeMenu()
    }
  }

  const langHref = isFr ? '/en' : '/'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 dark:bg-dark-bg/90 bg-light-bg/95 backdrop-blur-xl border-b dark:border-dark-border border-light-border shadow-sm'
            : 'py-5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={isFr ? '/' : '/en'}
            className="font-logo text-2xl transition-opacity duration-300 hover:opacity-80 relative z-10"
            data-cursor="link"
          >
            <span className={scrolled ? 'dark:text-white text-[#020F21]' : 'text-white'}>Noctara</span>
            <span style={{ color: '#FFBD59' }}>.</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {content.nav.links.map((link) => (
              <li key={link.href}>
                <Magnetic strength={0.28}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-sm font-heading font-medium transition-colors duration-200 tracking-wide hover:text-accent ${
                      scrolled ? 'dark:text-white/70 text-[#020F21]/70' : 'text-white/80'
                    }`}
                    data-cursor="link"
                  >
                    {link.label}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3 relative z-10">
            {/* Theme toggle */}
            <Magnetic strength={0.4}>
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:text-accent ${
                scrolled
                  ? 'dark:bg-dark-surface bg-light-muted dark:text-white/60 text-[#020F21]/60'
                  : 'bg-white/10 text-white/80 backdrop-blur-sm'
              }`}
              aria-label="Toggle theme"
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
            </Magnetic>

            {/* Language pill */}
            <Magnetic strength={0.4}>
            <Link
              href={langHref}
              className={`text-xs font-display font-bold transition-all duration-200 tracking-widest w-9 h-9 rounded-full flex items-center justify-center border hover:text-accent hover:border-accent ${
                scrolled
                  ? 'dark:bg-dark-surface bg-light-muted dark:text-white/70 text-[#020F21]/70 dark:border-dark-border border-light-border'
                  : 'bg-white/10 text-white/90 border-white/25 backdrop-blur-sm'
              }`}
              data-cursor="link"
            >
              {isFr ? 'EN' : 'FR'}
            </Link>
            </Magnetic>

            {/* CTA desktop */}
            <Magnetic strength={0.25}>
            <button
              onClick={() => {
                if (menuOpen) closeMenu()
                setTimeout(() => {
                  document.querySelector('#tarifs')?.scrollIntoView({ behavior: 'smooth' })
                }, menuOpen ? 500 : 0)
              }}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-heading font-semibold hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
              data-cursor="link"
            >
              {content.nav.book}
            </button>
            </Magnetic>

            {/* Hamburger — toujours blanc pour rester visible sur le hero */}
            <button
              type="button"
              onClick={toggleMenu}
              className="flex flex-col justify-center items-center gap-[5px] w-10 h-10 lg:hidden flex-shrink-0"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
            >
              <span
                className="block h-[2px] w-6 bg-white transition-all duration-300 origin-center"
                style={{
                  transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block h-[2px] w-4 bg-white transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-[2px] w-6 bg-white transition-all duration-300 origin-center"
                style={{
                  transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/*
        Overlay TOUJOURS dans le DOM (pas de rendu conditionnel).
        pointer-events contrôle l'interactivité. GSAP anime clipPath.
      */}
      <div
        ref={overlayRef}
        aria-hidden={!menuOpen}
        className="fixed inset-0 z-40 dark:bg-dark-bg bg-light-bg flex flex-col items-center justify-center"
        style={{
          clipPath: 'circle(0% at 95% 5%)',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <nav className="flex flex-col items-center gap-6 px-6 w-full max-w-sm">
          {content.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="menu-link text-4xl sm:text-5xl font-display font-black dark:text-dark-text text-light-text hover:text-accent transition-colors duration-200 tracking-tight"
              data-cursor="link"
            >
              {link.label}
            </a>
          ))}

          {/* CTA mobile */}
          <button
            type="button"
            onClick={() => {
              closeMenu()
              setTimeout(() => document.querySelector('#tarifs')?.scrollIntoView({ behavior: 'smooth' }), 500)
            }}
            className="menu-link mt-4 px-8 py-3.5 rounded-full bg-primary text-white font-heading font-semibold text-base hover:bg-primary-light transition-colors"
          >
            {content.nav.book}
          </button>

          {/* Lang switch */}
          <Link
            href={langHref}
            onClick={() => closeMenu()}
            className="menu-link text-sm font-display dark:text-dark-subtle text-light-subtle hover:text-accent transition-colors tracking-widest"
          >
            {isFr ? '→ English' : '→ Français'}
          </Link>
        </nav>
      </div>
    </>
  )
}
