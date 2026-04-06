'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelTopRef = useRef<HTMLDivElement>(null)
  const panelBottomRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Fast path — déjà vu cette session
    if (typeof window !== 'undefined' && sessionStorage.getItem('noctara-loaded')) {
      gsap.to(containerRef.current, {
        duration: 0.3,
        opacity: 0,
        onComplete: () => onComplete(),
      })
      return
    }

    const container = containerRef.current
    const panelTop = panelTopRef.current
    const panelBottom = panelBottomRef.current
    const logo = logoRef.current
    const line = lineRef.current
    const subtitle = subtitleRef.current

    if (!container || !panelTop || !panelBottom || !logo) return

    const tl = gsap.timeline()

    // Phase 1 : logo Borel apparaît (translateY + opacity)
    tl.from(logo, {
      y: 36,
      opacity: 0,
      duration: 1.0,
      ease: 'power3.out',
    }, 0.2)

    // Phase 2 : ligne séparatrice
    if (line) {
      tl.from(line, {
        scaleX: 0,
        duration: 0.7,
        ease: 'power2.out',
        transformOrigin: 'left center',
      }, 0.7)
    }

    // Phase 3 : sous-titre
    if (subtitle) {
      tl.from(subtitle, {
        opacity: 0,
        y: 8,
        duration: 0.5,
        ease: 'power2.out',
      }, 1.0)
    }

    // Phase 4 : compteur 0 → 100
    const counterObj = { val: 0 }
    tl.to(counterObj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(counterObj.val)),
    }, 0.4)

    // Phase 5 : glow à 100 %
    tl.to(logo, {
      filter: 'drop-shadow(0 0 24px rgba(255, 189, 89, 0.5))',
      duration: 0.3,
    }, 2.3)

    // Phase 6 : sortie cinématique — volets + logo scale-out
    tl.to([panelTop, panelBottom], {
      scaleY: 0,
      duration: 0.9,
      ease: 'power4.inOut',
    }, 2.7)

    tl.to(logo, {
      scale: 0.88,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in',
    }, 2.7)

    tl.to(container, {
      duration: 0.05,
      onComplete: () => {
        sessionStorage.setItem('noctara-loaded', '1')
        onComplete()
      },
    }, 3.5)

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: '#08080f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Volet haut */}
      <div
        ref={panelTopRef}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '50%',
          background: '#08080f',
          transformOrigin: 'top',
          zIndex: 2,
        }}
      />
      {/* Volet bas */}
      <div
        ref={panelBottomRef}
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '50%',
          background: '#08080f',
          transformOrigin: 'bottom',
          zIndex: 2,
        }}
      />

      {/* Contenu */}
      <div
        ref={logoRef}
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          textAlign: 'center',
        }}
      >
        {/* Logo Borel */}
        <div style={{ lineHeight: 1, letterSpacing: '0.01em' }}>
          <span
            style={{
              fontFamily: 'var(--font-borel), cursive',
              fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
              color: '#f0f0f8',
              fontWeight: 400,
            }}
          >
            Noctara
          </span>
          <span
            style={{
              fontFamily: 'var(--font-borel), cursive',
              fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
              color: '#FFBD59',
              fontWeight: 400,
            }}
          >
            .
          </span>
        </div>

        {/* Ligne séparatrice */}
        <div
          ref={lineRef}
          style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255,189,89,0.6), transparent)',
          }}
        />

        {/* Sous-titre */}
        <div
          ref={subtitleRef}
          style={{
            fontSize: '0.6rem',
            fontFamily: 'var(--font-unbounded), sans-serif',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(240,240,248,0.35)',
          }}
        >
          PHOTOGRAPHE · CLERMONT-FERRAND
        </div>

        {/* Compteur */}
        <div
          style={{
            position: 'absolute',
            bottom: '-52px',
            right: 0,
            fontFamily: 'var(--font-unbounded), sans-serif',
            fontSize: '0.7rem',
            color: 'rgba(255,189,89,0.65)',
            letterSpacing: '0.08em',
          }}
        >
          {String(count).padStart(3, '0')}
          <span style={{ color: 'rgba(240,240,248,0.25)' }}> / 100</span>
        </div>
      </div>

      {/* Barre de progression */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'rgba(255,255,255,0.07)',
          zIndex: 3,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${count}%`,
            background: 'linear-gradient(to right, #1858ae, #FFBD59)',
            transition: 'width 0.12s linear',
          }}
        />
      </div>
    </div>
  )
}
