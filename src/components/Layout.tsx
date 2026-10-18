import { Suspense, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import Cursor from './Cursor'

const ease = [0.76, 0, 0.24, 1] as const

export default function Layout() {
  const outlet = useOutlet()
  const { pathname } = useLocation()
  const reduce = useReducedMotion()

  // Land at the top (or on a #hash) once the old page has left.
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-red focus:px-3 focus:py-2 focus:text-white">
        跳到主要内容
      </a>
      <Nav />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={pathname}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: reduce ? 0 : 0.35, ease: 'easeOut' } }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          className="min-h-[70vh] pt-14"
        >
          <Suspense fallback={<div className="min-h-[60vh]" aria-busy="true" />}>{outlet}</Suspense>
          <Footer />
        </motion.main>
      </AnimatePresence>

      {/* Red curtain wipes up across every route change. */}
      {!reduce && (
        <motion.div
          key={`curtain-${pathname}`}
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-red"
          initial={{ y: '100%' }}
          animate={{ y: ['100%', '0%', '0%', '-100%'] }}
          transition={{ duration: 0.85, times: [0, 0.38, 0.55, 1], ease }}
        >
          <span className="font-display text-5xl tracking-tight text-paper md:text-8xl">
            {pathname === '/' ? 'PORTFOLIO' : pathname.split('/')[1].toUpperCase()}
          </span>
        </motion.div>
      )}
      <Cursor />
    </>
  )
}
