'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { SiteContent } from '@/lib/content/types'

gsap.registerPlugin(ScrollTrigger)

interface StatsProps {
  content: SiteContent
}

function StatCounter({ value, suffix, label }: { value: string; suffix: string; label: string }) {
  const numValue = parseInt(value, 10)
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (triggered.current) return
        triggered.current = true
        const obj = { val: 0 }
        gsap.to(obj, {
          val: numValue,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => setCount(Math.round(obj.val)),
        })
      },
    })

    return () => st.kill()
  }, [numValue])

  return (
    <div ref={ref} className="flex flex-col items-center text-center px-6 py-8 group">
      <div className="text-5xl md:text-6xl font-display font-black text-white mb-2">
        <span>{count}</span>
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="text-sm font-heading text-white/50 tracking-wide uppercase">{label}</div>
      <div className="mt-4 w-8 h-0.5 bg-accent/30 group-hover:bg-accent transition-all duration-500 group-hover:w-16" />
    </div>
  )
}

export function Stats({ content }: StatsProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-item', {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-primary overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-accent/10 blur-3xl rounded-full" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0">
          {content.stats.map((stat, i) => (
            <div key={i} className="stat-item border-l border-white/10">
              <StatCounter
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
