import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Custom pointer follower. Only mounted on fine pointers; grows over [data-cursor] targets.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const raf = useRef(0)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setEnabled(true)
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        x.set(e.clientX)
        y.set(e.clientY)
      })
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]')
      setLabel(t ? t.dataset.cursor ?? '' : null)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      cancelAnimationFrame(raf.current)
    }
  }, [x, y])

  if (!enabled) return null
  const big = label !== null
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center rounded-full bg-red font-display text-[10px] uppercase tracking-widest text-white mix-blend-normal"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: big ? 84 : 12, height: big ? 84 : 12, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {big ? label : null}
    </motion.div>
  )
}
