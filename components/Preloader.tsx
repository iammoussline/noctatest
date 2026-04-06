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
  const counterRef = useRef<HTMLSpanElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])
  const lineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Check if already seen this session
    if (typeof window !== 'undefined' && sessionStorage.getItem('noctara-loaded')) {
      // Fast reveal without preloader
      const container = containerRef.current
      if (container) {
        gsap.to(container, { duration: 0.4, opacity: 0, onComplete: () => onComplete() })
      } else {
        onComplete()
      }
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

    // Phase 1: Chars appear with stagger
    tl.from(charsRef.current, {
      y: '110%',
      opacity: 0,
      stagger: 0.06,
      duration: 0.8,
      ease: 'power3.out',
    }, 0.3)

    // Phase 2: Line appears
    if (line) {
      tl.from(line, {
        scaleX: 0,
        duration: 0.6,
        ease: 'power2.out',
        transformOrigin: 'left center',
      }, 0.8)
    }

    // Phase 3: Subtitle appears
    if (subtitle) {
      tl.from(subtitle, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: 'power2.out',
      }, 1.1)
    }

    // Phase 4: Counter animates 0→100
    const counterObj = { val: 0 }
    tl.to(counterObj, {
      val: 100,
      duration: 2.0,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.round(counterObj.val))
      },
    }, 0.5)

    // Phase 5: Logo glows at 100%
    tl.to(logo, {
      filter: 'drop-shadow(0 0 20px rgba(255, 189, 89, 0.6))',
      duration: 0.3,
      ease: 'power2.out',
    }, 2.6)

    // Phase 6: Exit — cinematic split panels + zoom
    tl.to([panelTop, panelBottom], {
      scaleY: 0,
      duration: 0.9,
      ease: 'power4.inOut',
      stagger: 0,
    }, 3.0)

    tl.to(logo, {
      scale: 0.85,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.in',
    }, 3.0)

    tl.to(container, {
      duration: 0.1,
      onComplete: () => {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('noctara-loaded', '1')
        }
        onComplete()
      },
    }, 3.8)

    return () => {
      tl.kill()
    }
  }, [onComplete])

  const letters = 'NOCTARA.'.split('')

  return (
    <div
      ref={containerRef}
      id="preloader"
      style={{ position: 'fixed', inset: 0, zIndex: 10000, background: '#08080f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Panel Top - cinematic wipe */}
      <div
        ref={panelTopRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: '#08080f',
          transformOrigin: 'top',
          zIndex: 2,
        }}
      />

      {/* Panel Bottom - cinematic wipe */}
      <div
        ref={panelBottomRef}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: '#08080f',
          transformOrigin: 'bottom',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        ref={logoRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          position: 'relative',
          zIndex: 3,
        }}
      >
        {/* Logo letters */}
        <div
          style={{
            display: 'flex',
            overflow: 'hidden',
            gap: '2px',
          }}
        >
          {letters.map((char, i) => (
            <span
              key={i}
              ref={(el) => { if (el) charsRef.current[i] = el }}
              style={{
                display: 'inline-block',
                fontFamily: 'Unbounded, sans-serif',
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 900,
                color: '#f0f0f8',
                letterSpacing: '0.05em',
                lineHeight: 1,
              }}
            >
              {char === '.' ? (
                <span style={{ color: '#FFBD59' }}>{char}</span>
              ) : char}
            </span>
          ))}
        </div>

        {/* Separator line */}
        <div
          ref={lineRef}
          style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255, 189, 89, 0.6), transparent)',
          }}
        />

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          style={{
            fontSize: '0.65rem',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(240, 240, 248, 0.4)',
          }}
        >
          PHOTOGRAPHE · CLERMONT-FERRAND
        </div>

        {/* Counter */}
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            right: 0,
            fontFamily: 'Unbounded, sans-serif',
            fontSize: '0.75rem',
            color: 'rgba(255, 189, 89, 0.7)',
            letterSpacing: '0.1em',
          }}
        >
          <span ref={counterRef}>{String(count).padStart(3, '0')}</span>
          <span style={{ color: 'rgba(240,240,248,0.3)' }}> / 100</span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
          zIndex: 3,
        }}
      >
        <div
          style={{
            height: '100%',
            background: 'linear-gradient(to right, #1858ae, #FFBD59)',
            width: `${count}%`,
            transition: 'width 0.1s linear',
          }}
        />
      </div>
    </div>
  )
}
