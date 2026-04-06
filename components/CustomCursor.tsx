'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef     = useRef({ x: -200, y: -200 })
  const ringPosRef = useRef({ x: -200, y: -200 })
  const rafRef  = useRef<number>(0)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Reveal
    dot.style.opacity  = '1'
    ring.style.opacity = '1'

    // Hide native cursor on the whole document
    document.documentElement.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor')
        ?? (target.closest('a, button, [role="button"]') ? 'link' : 'default')

      switch (cursorType) {
        case 'expand':
          dot.style.opacity = '0'
          ring.style.width  = '80px'
          ring.style.height = '80px'
          ring.style.borderColor = 'rgba(255,255,255,0.35)'
          ring.style.backgroundColor = 'transparent'
          break
        case 'link':
          dot.style.opacity = '0'
          ring.style.width  = '20px'
          ring.style.height = '20px'
          ring.style.borderColor = 'rgba(255,255,255,0.9)'
          ring.style.backgroundColor = 'rgba(255,255,255,0.12)'
          break
        default:
          dot.style.opacity = '1'
          ring.style.width  = '34px'
          ring.style.height = '34px'
          ring.style.borderColor = 'rgba(255,255,255,0.4)'
          ring.style.backgroundColor = 'transparent'
      }
    }

    const onDown = () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(0.5)'
      ring.style.transform = 'translate(-50%,-50%) scale(0.85)'
    }

    const onUp = () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(1)'
      ring.style.transform = 'translate(-50%,-50%) scale(1)'
    }

    const onLeave = () => {
      dot.style.opacity  = '0'
      ring.style.opacity = '0'
    }

    const onEnter = () => {
      dot.style.opacity  = '1'
      ring.style.opacity = '1'
    }

    const animate = () => {
      // Dot snaps instantly
      dot.style.left = `${posRef.current.x}px`
      dot.style.top  = `${posRef.current.y}px`

      // Ring lerps smoothly behind
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.1
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.1
      ring.style.left = `${ringPosRef.current.x}px`
      ring.style.top  = `${ringPosRef.current.y}px`

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    document.addEventListener('mousemove',  onMove,  { passive: true })
    document.addEventListener('mouseover',  onOver,  { passive: true })
    document.addEventListener('mousedown',  onDown,  { passive: true })
    document.addEventListener('mouseup',    onUp,    { passive: true })
    document.addEventListener('mouseleave', onLeave, { passive: true })
    document.addEventListener('mouseenter', onEnter, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.documentElement.style.cursor = ''
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      {/* Point central — snap instantané */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          backgroundColor: 'white',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          transform: 'translate(-50%,-50%)',
          transition: 'opacity 0.3s ease, transform 0.15s ease',
          mixBlendMode: 'difference',
          willChange: 'left, top',
          left: '-200px',
          top: '-200px',
        }}
      />

      {/* Anneau élégant — suit avec lag */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.4)',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          transform: 'translate(-50%,-50%)',
          transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease, transform 0.15s ease',
          mixBlendMode: 'difference',
          willChange: 'left, top',
          left: '-200px',
          top: '-200px',
        }}
      />
    </>
  )
}
