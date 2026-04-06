'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SiteContent } from '@/lib/content/types'

gsap.registerPlugin(ScrollTrigger)

interface AboutProps {
  content: SiteContent
}

export function About({ content }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const { about } = content

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-path reveal on image container
      const imageContainer = imageRef.current?.parentElement
      if (imageContainer) {
        gsap.fromTo(
          imageContainer,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: imageContainer,
              start: 'top 80%',
              once: true,
            },
          }
        )
      }

      // Image parallax
      gsap.to(imageRef.current, {
        y: '-8%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Text reveal — stagger children
      gsap.from('.about-text > *', {
        opacity: 0,
        y: 32,
        stagger: 0.1,
        duration: 0.95,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 78%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 dark:bg-dark-surface bg-light-surface overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative h-[320px] sm:h-[420px] md:h-[550px] lg:h-[620px] rounded-2xl overflow-hidden" data-cursor="expand">
            <div ref={imageRef} className="absolute inset-0 scale-110">
              <Image
                src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=900&q=80&auto=format"
                alt="Photographe Noctara en action"
                fill
                className="object-cover grayscale-[30%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/50 to-transparent" />

            {/* Tag badge */}
            <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full dark:bg-dark-bg/80 bg-light-bg/80 backdrop-blur-sm border dark:border-dark-border border-light-border">
              <span className="text-xs font-display tracking-widest dark:text-dark-text text-light-text uppercase">
                Clermont-Ferrand, FR
              </span>
            </div>
          </div>

          {/* Text content */}
          <div ref={textRef} className="about-text flex flex-col gap-8">
            <div>
              <p className="text-xs font-display tracking-[0.3em] text-accent uppercase mb-3">
                À PROPOS
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-black dark:text-dark-text text-light-text leading-tight tracking-tight mb-2">
                {about.title}
              </h2>
              <p className="text-lg font-heading dark:text-dark-subtle text-light-subtle italic">
                {about.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="font-body text-base dark:text-dark-subtle text-light-subtle leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {about.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-xs font-display tracking-wider dark:bg-dark-muted bg-light-muted dark:text-dark-subtle text-light-subtle uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Signature */}
            <div className="pt-4 border-t dark:border-dark-border border-light-border">
              <span className="font-logo text-3xl dark:text-white text-[#020F21]">{about.signature}</span>
              <span className="font-logo text-3xl" style={{ color: '#FFBD59' }}>.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
