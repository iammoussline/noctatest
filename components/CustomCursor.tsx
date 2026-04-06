'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const stateRef = useRef<'default' | 'expand' | 'arrow' | 'link'>('default')

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    dot.style.opacity = '1'
    ring.style.opacity = '1'

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const cursor = target.closest('[data-cursor]')?.getAttribute('data-cursor')
        ?? (target.closest('a, button') ? 'link' : null)

      if (cursor === 'expand') {
        stateRef.current = 'expand'
        ring.style.width = '80px'
        ring.style.height = '80px'
        ring.style.borderColor = 'rgba(255, 189, 89, 0.8)'
        ring.style.mixBlendMode = 'normal'
      } else if (cursor === 'arrow') {
        stateRef.current = 'arrow'
        ring.style.width = '48px'
        ring.style.height = '48px'
        ring.style.borderColor = 'rgba(255, 255, 255, 0.8)'
      } else if (cursor === 'link') {
        stateRef.current = 'link'
        ring.style.width = '52px'
        ring.style.height = '52px'
        ring.style.backgroundColor = 'rgba(24, 88, 174, 0.15)'
        ring.style.borderColor = 'rgba(24, 88, 174, 0.6)'
      } else {
        stateRef.current = 'default'
        ring.style.width = '32px'
        ring.style.height = '32px'
        ring.style.backgroundColor = 'transparent'
        ring.style.borderColor = 'rgba(255, 255, 255, 0.5)'
        ring.style.mixBlendMode = 'difference'
      }
    }

    const handleMouseDown = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(0.8)'
      ring.style.transform = 'translate(-50%, -50%) scale(0.9)'
    }

    const handleMouseUp = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)'
      ring.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    const animate = () => {
      if (dot && ring) {
        dot.style.left = `${posRef.current.x}px`
        dot.style.top = `${posRef.current.y}px`

        // Lerp the ring position
        ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12
        ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12
        ring.style.left = `${ringPosRef.current.x}px`
        ring.style.top = `${ringPosRef.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mousedown', handleMouseDown, { passive: true })
    document.addEventListener('mouseup', handleMouseUp, { passive: true })

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: '#FFBD59',
          left: '-100px',
          top: '-100px',
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.15s ease',
          willChange: 'left, top',
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: '32px',
          height: '32px',
          border: '1px solid rgba(255,255,255,0.5)',
          backgroundColor: 'transparent',
          left: '-100px',
          top: '-100px',
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease, transform 0.15s ease',
          mixBlendMode: 'difference',
          willChange: 'left, top',
        }}
      />
    </>
  )
}
