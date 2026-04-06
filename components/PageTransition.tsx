'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

const variants = {
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit:    { opacity: 0, y: -12, filter: 'blur(2px)' },
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // Scroll to top sur chaque changement de route
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
