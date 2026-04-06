'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SiteContent } from '@/lib/content/types'

gsap.registerPlugin(ScrollTrigger)

interface PortfolioProps {
  content: SiteContent
}

export function Portfolio({ content }: PortfolioProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const items = content.portfolio.items

  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)

  const prevImage = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + items.length) % items.length)
  }, [lightboxIndex, items.length])

  const nextImage = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % items.length)
  }, [lightboxIndex, items.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex, prevImage, nextImage])

  // Lock scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  // GSAP reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-item', {
        opacity: 0,
        y: 40,
        scale: 0.96,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-24 dark:bg-dark-bg bg-light-bg"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">
              03 / PORTFOLIO
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-black dark:text-dark-text text-light-text leading-tight tracking-tight">
              {content.portfolio.title}
            </h2>
          </div>
          <p className="text-sm font-body dark:text-dark-subtle text-light-subtle max-w-xs leading-relaxed">
            {content.portfolio.subtitle}
          </p>
        </div>

        {/* Masonry grid */}
        <div ref={gridRef} className="portfolio-grid">
          {items.map((item, i) => (
            <div
              key={i}
              className="portfolio-item group relative cursor-pointer overflow-hidden rounded-lg dark:bg-dark-surface bg-light-surface"
              onClick={() => openLightbox(i)}
              data-cursor="expand"
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: `${item.w}/${item.h}` }}>
                <Image
                  src={`${item.src}?w=600&q=75&auto=format`}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  className="object-cover grayscale-[50%] contrast-105 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-xs font-display tracking-widest text-white/80 uppercase">{item.caption}</p>
              </div>

              {/* Expand icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close"
            data-cursor="link"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs font-display tracking-widest text-white/50">
            {String(lightboxIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </div>

          {/* Image container */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] mx-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full overflow-hidden rounded-lg" style={{ maxHeight: '80vh' }}>
              <Image
                src={`${items[lightboxIndex].src}?w=1400&q=90&auto=format`}
                alt={items[lightboxIndex].alt}
                width={1400}
                height={Math.round(1400 * (items[lightboxIndex].h / items[lightboxIndex].w))}
                className="w-full h-full object-contain"
                sizes="(max-width: 1280px) 90vw, 1200px"
                priority
              />
            </div>
            <p className="text-center mt-4 text-sm font-display tracking-widest text-white/50 uppercase">
              {items[lightboxIndex].caption}
            </p>
          </div>

          {/* Prev button */}
          <button
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); prevImage() }}
            aria-label="Previous"
            data-cursor="arrow"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>

          {/* Next button */}
          <button
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); nextImage() }}
            aria-label="Next"
            data-cursor="arrow"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}
