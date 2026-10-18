import { useEffect, useRef } from 'react'

type Flake = { x: number; y: number; r: number; vy: number; sway: number; phase: number; a: number }

/** Drifting snow over the whole viewport; sits above the page but never intercepts the pointer. */
export default function Snow({ count = 90 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = cv.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      cv.width = w * dpr
      cv.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    fit()
    window.addEventListener('resize', fit)

    const n = window.innerWidth < 700 ? Math.round(count * 0.55) : count
    const flakes: Flake[] = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.8 + Math.random() * 2.4,
      vy: 0.25 + Math.random() * 0.9,
      sway: 8 + Math.random() * 24,
      phase: Math.random() * Math.PI * 2,
      a: 0.35 + Math.random() * 0.5,
    }))

    let raf = 0
    let t = 0
    const tick = () => {
      t += 0.01
      ctx.clearRect(0, 0, w, h)
      for (const f of flakes) {
        f.y += f.vy
        if (f.y > h + 6) {
          f.y = -6
          f.x = Math.random() * w
        }
        const x = f.x + Math.sin(t * f.vy * 2 + f.phase) * f.sway
        const g = ctx.createRadialGradient(x, f.y, 0, x, f.y, f.r * 2)
        g.addColorStop(0, `rgba(255,255,255,${f.a})`)
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, f.y, f.r * 2, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', fit)
    }
  }, [count])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[5] h-full w-full" />
}
