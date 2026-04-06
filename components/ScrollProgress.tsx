'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      bar.style.height = `${progress * 100}%`
    }

    // Lenis fires scroll events on window — on écoute les deux
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed right-0 top-0 w-[3px] h-full z-50 pointer-events-none dark:bg-dark-border bg-light-border"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="w-full bg-primary transition-none"
        style={{ height: '0%' }}
      />
    </div>
  )
}
