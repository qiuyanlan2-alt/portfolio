import { useEffect, useRef, type RefObject } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  max: number
  size: number
  rot: number
  vr: number
  gold: boolean
}

/** Four-point sparkle with a soft glow. */
function star(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number, color: string, alpha: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rot)
  ctx.globalAlpha = alpha
  ctx.fillStyle = color
  ctx.shadowColor = color
  ctx.shadowBlur = r * 1.4
  ctx.beginPath()
  const k = r * 0.14
  ctx.moveTo(0, -r)
  ctx.quadraticCurveTo(k, -k, r, 0)
  ctx.quadraticCurveTo(k, k, 0, r)
  ctx.quadraticCurveTo(-k, k, -r, 0)
  ctx.quadraticCurveTo(-k, -k, 0, -r)
  ctx.fill()
  ctx.restore()
}

/**
 * Stars orbit the pointer and shed a fading, twinkling trail.
 * The canvas covers `hostRef`; the loop sleeps when nothing is visible.
 */
export default function SparkleTrail({ hostRef }: { hostRef: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    const resize = () => {
      const r = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    const parts: Particle[] = []
    const orbit = [
      { r: 26, s: 2.6, size: 7, phase: 0 },
      { r: 40, s: -1.9, size: 5, phase: 2.1 },
      { r: 54, s: 1.4, size: 4, phase: 4.2 },
    ]
    let tx = 0
    let ty = 0
    let px = 0
    let py = 0
    let lx = 0
    let ly = 0
    let presence = 0
    let hover = false
    let raf = 0
    let last = 0
    let running = false

    const spawn = (x: number, y: number) => {
      if (parts.length > 140) parts.shift()
      const a = Math.random() * Math.PI * 2
      const sp = 8 + Math.random() * 26
      parts.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp + 10,
        life: 0,
        max: 0.9 + Math.random() * 1.1,
        size: 3.5 + Math.random() * 6.5,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 4,
        gold: Math.random() > 0.45,
      })
    }

    const frame = (t: number) => {
      const dt = Math.min((t - last) / 1000 || 0.016, 0.05)
      last = t
      ctx.clearRect(0, 0, w, h)

      presence += ((hover ? 1 : 0) - presence) * Math.min(1, dt * 8)
      px += (tx - px) * Math.min(1, dt * 14)
      py += (ty - py) * Math.min(1, dt * 14)

      if (hover && Math.hypot(tx - lx, ty - ly) > 12) {
        spawn(px + (Math.random() - 0.5) * 10, py + (Math.random() - 0.5) * 10)
        lx = tx
        ly = ty
      }

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        p.life += dt
        if (p.life >= p.max) {
          parts.splice(i, 1)
          continue
        }
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.vy += 22 * dt
        p.rot += p.vr * dt
        const k = 1 - p.life / p.max
        const tw = 0.6 + 0.4 * Math.sin(p.life * 22 + p.rot)
        star(ctx, p.x, p.y, p.size * (0.5 + 0.7 * k), p.rot, p.gold ? '#f2c46d' : '#fff8e9', k * tw)
      }

      if (presence > 0.02) {
        const s = t / 1000
        for (const o of orbit) {
          const a = s * o.s + o.phase
          const x = px + Math.cos(a) * o.r * presence
          const y = py + Math.sin(a) * o.r * 0.62 * presence
          const tw = 0.7 + 0.3 * Math.sin(s * 9 + o.phase)
          star(ctx, x, y, o.size * (0.8 + 0.4 * tw), a * 1.5, o.phase > 3 ? '#f2c46d' : '#fff3d6', presence * tw)
        }
        star(ctx, px, py, 3.2, 0, '#fff3d6', presence * 0.9)
      }

      if (presence > 0.02 || parts.length > 0 || hover) raf = requestAnimationFrame(frame)
      else running = false
    }

    const wake = () => {
      if (running) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
      if (!hover) {
        px = tx
        py = ty
        lx = tx
        ly = ty
      }
      hover = true
      wake()
    }
    const leave = () => {
      hover = false
    }

    host.addEventListener('pointermove', move, { passive: true })
    host.addEventListener('pointerleave', leave)
    host.addEventListener('pointercancel', leave)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', leave)
      host.removeEventListener('pointercancel', leave)
    }
  }, [hostRef])

  return <canvas ref={canvasRef} aria-hidden className="cover-sparkle-trail pointer-events-none absolute inset-0 z-50 h-full w-full" />
}
