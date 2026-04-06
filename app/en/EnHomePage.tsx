'use client'

import { useState, useCallback } from 'react'
import { Preloader } from '@/components/Preloader'
import { HomePage } from '@/components/HomePage'
import { en } from '@/lib/content/en'

export function EnHomePage() {
  const [loaded, setLoaded] = useState(false)

  const handleLoaded = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {!loaded && <Preloader onComplete={handleLoaded} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <HomePage content={en} />
      </div>
    </>
  )
}
