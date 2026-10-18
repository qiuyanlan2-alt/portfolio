import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'

import SparkleTrail from './SparkleTrail'

/** Four-point sparkle path centred on 0,0. */
const sparkle = (r: number) => {
  const k = r * 0.13
  return `M0 ${-r}Q${k} ${-k} ${r} 0Q${k} ${k} 0 ${r}Q${-k} ${k} ${-r} 0Q${-k} ${-k} 0 ${-r}Z`
}

function Star({ x, y, r, color = '#fff3d6', delay = 0 }: { x: number; y: number; r: number; color?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={sparkle(r)} fill={color} className="cover-twinkle" style={{ animationDelay: `${delay}s` }} />
    </g>
  )
}

const letters = (s: string, base: number, italic = false) =>
  s.split('').map((c, i) => (
    <motion.span
      key={i}
      className="cut-text inline-block"
      // Give overhanging glyphs room inside the text background and rounding
      // filter. Negative margins preserve the original positions and spacing.
      style={{
        paddingBottom: '0.3em',
        marginBottom: '-0.3em',
        paddingTop: '0.1em',
        marginTop: '-0.1em',
        paddingLeft: '0.2em',
        marginLeft: '-0.2em',
        paddingRight: italic ? '0.26em' : '0.2em',
        marginRight: '-0.2em',
      }}
      initial={{ y: '45%', opacity: 0, rotate: italic ? 3 : 0 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ duration: 0.9, delay: base + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      {c}
    </motion.span>
  ))

const gold = '#e6b86a'

/** Wire-O calendar binding: punched holes, a metal wire diving into each, cast shadow. */
function Rings() {
  return (
    <div className="pointer-events-none absolute inset-x-[4.6%] top-0 flex justify-between">
      {Array.from({ length: 26 }).map((_, i) => (
        <svg key={i} viewBox="0 0 18 34" style={{ width: 'max(7px,1.8cqw)', height: 'auto', overflow: 'visible' }} aria-hidden>
          {/* punched hole: paper bevel, dark depth, lit lower lip */}
          <ellipse cx="9" cy="25.2" rx="6.6" ry="5.9" fill="rgba(255,255,255,.28)" />
          <ellipse cx="9" cy="24.4" rx="5.6" ry="5" fill="url(#hole-g)" />
          <path d="M3.4 24.4a5.6 5 0 0 1 11.2 0" fill="none" stroke="rgba(0,0,0,.55)" strokeWidth=".9" />
          <path d="M3.8 26.8a5.6 5 0 0 0 10.4 0" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth=".7" />
          {/* wire: soft cast shadow (two strokes, no filter), dark rim, metal body, specular line */}
          <path d="M6.6 0C6.6 9 9.4 14.5 9.2 24" fill="none" stroke="rgba(40,0,0,.14)" strokeWidth="5.2" strokeLinecap="round" transform="translate(2.4 2.6)" />
          <path d="M6.6 0C6.6 9 9.4 14.5 9.2 24" fill="none" stroke="rgba(40,0,0,.3)" strokeWidth="3.4" strokeLinecap="round" transform="translate(2 2.2)" />
          <path d="M6.6 0C6.6 9 9.4 14.5 9.2 24" fill="none" stroke="#2a2a2a" strokeWidth="4" strokeLinecap="round" />
          <path d="M6.6 0C6.6 9 9.4 14.5 9.2 24" fill="none" stroke="url(#wire-g)" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M5.8 0C5.8 9 8.5 14.5 8.4 23.4" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth=".6" strokeLinecap="round" />
        </svg>
      ))}
    </div>
  )
}

export default function Cover({ introduction, disciplines }: { introduction: ReactNode; disciplines: ReactNode }) {
  const [page, setPage] = useState(0)
  const [turning, setTurning] = useState<number | null>(null)
  const lock = useRef(false)
  const host = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const labels = ['封面', '自我介绍', '创作方向']
  useEffect(() => {
    host.current?.querySelectorAll<HTMLElement>('.calendar-sheet').forEach((node, i) => {
      node.inert = page !== i || turning !== null
    })
  }, [page, turning])
  const turn = (next: number) => {
    if (lock.current || next < 0 || next > 2 || next === page) return
    lock.current = true
    setTurning(Math.min(page, next))
    setPage(next)
  }

  // Measure auto-height content, never the sheets stretched to stageHeight.
  // Hidden pages stay laid out; page changes and 3D transforms do not affect sizing.
  const contentRefs = useRef<Array<HTMLDivElement | null>>([])
  const [stageHeight, setStageHeight] = useState<number>()
  useLayoutEffect(() => {
    const nodes = contentRefs.current.filter((n): n is HTMLDivElement => !!n)
    if (!nodes.length) return
    const measure = () => {
      const height = Math.max(...nodes.map((n) => n.offsetHeight))
      setStageHeight((previous) => previous === height ? previous : height)
    }
    measure()
    const ro = new ResizeObserver(measure)
    nodes.forEach((n) => ro.observe(n))
    return () => ro.disconnect()
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <section ref={host} className={`calendar${turning !== null ? ' is-turning' : ''}`} aria-label="作品集翻页日历" aria-roledescription="翻页日历">
        <div className="calendar-stage" style={{ gridTemplateRows: stageHeight === undefined ? undefined : `${stageHeight}px` }}>
          {[<CoverArtwork key="cover" />, introduction, disciplines].map((content, i) => (
            <motion.div
              key={i}
              className={`calendar-sheet ${i === 0 ? 'calendar-cover' : 'calendar-inner'}`}
              data-page={i}
              aria-hidden={page !== i}
              aria-label={labels[i]}
              style={{ zIndex: turning === i ? 5 : 3 - i, visibility: page === i || turning === i ? 'visible' : 'hidden', willChange: turning === i ? 'transform' : 'auto' }}
              initial={false}
              animate={{ rotateX: reduce ? 0 : page > i ? 180 : 0, opacity: reduce && page !== i ? 0 : 1 }}
              transition={{ duration: reduce ? 0 : 0.85, ease: [0.65, 0, 0.25, 1] }}
              onAnimationComplete={() => {
                if (turning === i) { lock.current = false; setTurning(null) }
              }}
            >
              <div className="calendar-content" ref={(el) => { contentRefs.current[i] = el }}>
                {content}
              </div>
              <span className="calendar-fold" aria-hidden />
            </motion.div>
          ))}
          <div className="calendar-binding" aria-hidden>
            {Array.from({ length: 18 }, (_, i) => <i key={i} />)}
          </div>
        </div>
        <div className="calendar-controls">
          <div className="calendar-actions">
            <button type="button" disabled={page === 0 || turning !== null} onClick={() => turn(page - 1)} aria-label="翻到上一页">← 上一页</button>
            <button type="button" disabled={page === 2 || turning !== null} onClick={() => turn(page + 1)} aria-label="翻到下一页">{page === 0 ? '翻开日历' : page === 2 ? '已是末页' : '下一页'} ↑</button>
          </div>
        </div>
      </section>
    </MotionConfig>
  )
}

function CoverArtwork() {
  const hostRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  return (
    <div className="relative z-10 mb-7 md:mb-10" style={{ perspective: 1600 }}>
      <motion.div
        className="relative"
        style={{ transformOrigin: '50% 0%' }}
        initial={false}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* stacked sheets peeking out below, like the rest of a calendar */}
        <span aria-hidden className="absolute -bottom-[20px] inset-x-[3.4%] top-1/2 -z-10 rounded-b-[2vw] bg-[#e2d6c0] shadow-[0_6px_10px_-4px_rgba(70,0,10,.35)]" />
        <span aria-hidden className="absolute -bottom-[10px] inset-x-[1.6%] top-1/2 -z-10 rounded-b-[2.2vw] bg-[#efe6d6] shadow-[0_5px_8px_-3px_rgba(70,0,10,.3)]" />
    <section ref={hostRef} className="relative select-none overflow-hidden rounded-b-[2.4vw] bg-[#f3ece0] shadow-[0_22px_32px_-12px_rgba(70,0,10,.45),0_48px_72px_-28px_rgba(70,0,10,.32)]" style={{ containerType: 'inline-size' }}>
      <h1 className="sr-only">邱彦岚 Portfolio Design · Visual Designer, UI/UX Designer</h1>
      {/* rounds the lettering's corners: blur, then re-threshold the alpha */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="wire-g" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#2c2c2c" />
            <stop offset=".15" stopColor="#8d8d8d" />
            <stop offset=".34" stopColor="#ffffff" />
            <stop offset=".52" stopColor="#d2d2d2" />
            <stop offset=".77" stopColor="#7b7b7b" />
            <stop offset="1" stopColor="#2b2b2b" />
          </linearGradient>
          <radialGradient id="hole-g" cx=".5" cy=".7" r=".62">
            <stop offset="0" stopColor="#3a0a0a" />
            <stop offset=".62" stopColor="#1a0303" />
            <stop offset="1" stopColor="#6b1a1a" />
          </radialGradient>
        </defs>
      </svg>
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id="cover-round" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="2.4" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="14" intercept="-6.4" />
          </feComponentTransfer>
        </filter>
      </svg>

      {/* top strip */}
      <div aria-hidden className="cover-top-strip relative flex items-center gap-[2cqw] px-[7.5cqw] pt-[3cqw] text-[#c4161c]" style={{ height: 'max(10cqw, 60px)', paddingTop: 'max(3cqw, 32px)' }}>
        <Rings />
        <motion.span className="font-serif italic" style={{ fontSize: '3.1cqw' }} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          2025-2026
        </motion.span>
        <span className="h-px flex-1 bg-gradient-to-r from-[#c4161c] to-[#c4161c]/60" />
        <svg viewBox="-20 -20 40 40" style={{ width: '2cqw' }}>
          <Star x={0} y={0} r={16} color="#c4161c" />
        </svg>
        <span className="h-px flex-1 bg-gradient-to-r from-[#c4161c]/60 to-[#c4161c]/10" />
        <span className="text-right font-serif italic uppercase leading-[1.35]" style={{ fontSize: 'max(7px,1cqw)', letterSpacing: '0.28em' }}>
          Welcome to my
          <br />
          Portfolio
          <br />
          Visual Journey
        </span>
        <svg viewBox="-20 -20 40 40" style={{ width: '3cqw' }}>
          <Star x={0} y={0} r={18} color="#c4161c" delay={1} />
        </svg>
      </div>

      {/* red paper band */}
      <div className="cover-paper relative" style={{ aspectRatio: '1862 / 717' }}>
        <div className="cover-shade absolute inset-0" />
        <div className="cover-blotch absolute inset-0" />

        {/* paper-cut headline */}
        <div aria-hidden className="absolute inset-0 font-serif">
          <div className="absolute whitespace-nowrap font-black uppercase" style={{ left: '5.2%', top: '1%', fontSize: '14.6cqw', lineHeight: 1, letterSpacing: '-0.01em' }}>
            {letters('PORTFOLIO', 0.4)}
          </div>
          <div className="absolute whitespace-nowrap font-black italic" style={{ right: '8.6%', top: '31%', fontSize: '20.5cqw', lineHeight: 1, letterSpacing: '-0.02em' }}>
            {letters('design', 0.95, true)}
          </div>
        </div>

        {/* gold threads and sparkles */}
        <svg aria-hidden viewBox="0 0 1862 717" className="absolute inset-0 h-full w-full" fill="none">
          <motion.path
            d="M430 348C515 212 620 142 730 164C842 187 930 270 1040 305C1100 324 1165 350 1235 388"
            stroke={gold}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5, duration: 1.8, ease: 'easeInOut' }}
          />
          <motion.path
            d="M1135 560C1230 650 1450 658 1630 590C1740 548 1810 488 1750 445C1705 413 1628 422 1545 458"
            stroke={gold}
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.9, duration: 1.8, ease: 'easeInOut' }}
          />
          <Star x={68} y={137} r={34} />
          <Star x={455} y={167} r={36} color="#ecc98f" delay={0.8} />
          <Star x={1780} y={327} r={34} delay={1.6} />
          <Star x={1540} y={580} r={22} color={gold} delay={0.4} />
        </svg>

        {/* name + role */}
        <motion.div
          aria-hidden
          className="absolute text-[#fbf3e6]"
          style={{ left: '4.7%', top: '51%' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.9 }}
        >
          <div className="font-cnserif italic" style={{ fontSize: '4.9cqw', lineHeight: 1.1, letterSpacing: '0.04em' }}>
            邱彦岚
          </div>
          <svg viewBox="0 0 260 14" style={{ width: '14.5cqw', marginTop: '0.4cqw' }} fill="none" stroke={gold} strokeLinecap="round">
            <path d="M2 9C60 3 130 11 200 6C225 4 245 6 258 4" strokeWidth="2" />
            <path d="M10 12C80 8 150 12 230 9" strokeWidth="1" opacity=".7" />
          </svg>
          <span className="mt-[2.4cqw] block h-px w-[3.4cqw] bg-[#fbf3e6]/80" />
          <div className="mt-[1.1cqw] font-serif italic uppercase leading-[1.5]" style={{ fontSize: 'max(7px,1.1cqw)', letterSpacing: '0.3em' }}>
            Visual Designer
            <br />
            UI/UX Designer
          </div>
        </motion.div>
      </div>

      {!reduce && <SparkleTrail hostRef={hostRef} />}
    </section>
      </motion.div>
    </div>
  )
}
