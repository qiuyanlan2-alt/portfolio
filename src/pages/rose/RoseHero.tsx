import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Petals from './Petals'
import RoseFrame from './RoseFrame'
import { roseBrief, roseProcess, roseVideo } from './data'

/** Corner bracket for the title. Both corners share this one component, so size and weight always match. */
function Bracket({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute block ${className}`}
      style={{ width: '0.55em', height: '0.55em', borderTop: '0.085em solid #fff', borderLeft: '0.085em solid #fff' }}
    />
  )
}

export default function RoseHero({ onPlay }: { onPlay: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '14%'])

  return (
    <section ref={ref} className="relative isolate overflow-hidden pb-48 pt-14 md:pb-60 md:pt-20">
      <motion.img
        src="/rose/moon-city.jpg"
        alt=""
        aria-hidden
        fetchPriority="high"
        style={{ y }}
        className="absolute inset-x-0 top-0 -z-20 h-[116%] w-full object-cover object-[50%_18%]"
      />
      <div className="rose-hero-shade absolute inset-0 -z-10" />
      <Petals />

      <div className="wrap relative grid grid-cols-1 gap-14 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.h1
            className="relative inline-block py-[0.3em] pl-[0.7em] pr-[0.7em] text-[2.4rem] md:text-7xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <Bracket className="left-0 top-0" />
            <Bracket className="bottom-0 right-0 rotate-180" />
            <span className="block text-[1em] font-black leading-[1.1]">玫瑰升级</span>
            <span className="mt-1 block font-display text-[0.62em] uppercase leading-tight tracking-tight">Rose Upgrade</span>
          </motion.h1>
          <p className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-lg text-white/95 md:text-2xl">
            <span className="font-display text-base tracking-[0.2em] text-[var(--rose-gold)] md:text-2xl">#AICG</span>
            Custom MP4 Effect · AI × Motion
          </p>

          <ol className="mt-12 space-y-1">
            {roseProcess.map((s, i) => (
              <motion.li
                key={s.en}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <p className="font-display text-base uppercase tracking-wide md:text-lg">{s.en}</p>
                <p className="text-sm text-white/80 md:text-base">{s.cn}</p>
                {i < roseProcess.length - 1 && <p aria-hidden className="py-0.5 text-[var(--rose-pink)]">↓</p>}
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-right">
            <p className="font-display text-[7rem] leading-[0.9] md:text-[11rem]">01</p>
            <p className="mt-2 text-xl font-black leading-tight tracking-wide md:text-3xl">
              MP4
              <br />
              EFFECT
            </p>
          </div>

          <div className="mt-12 w-[min(80vw,24rem)] md:w-[27rem]">
            <RoseFrame>
              <button type="button" onClick={onPlay} data-cursor="PLAY" aria-label="播放玫瑰升级 MP4" className="group relative block aspect-[9/16] w-full overflow-hidden">
            <img src={roseVideo.poster} alt="玫瑰升级 MP4 封面：玫瑰城堡" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 flex items-center justify-center bg-[#1d0f35]/25 transition-colors group-hover:bg-transparent">
              <span className="rose-play flex h-20 w-20 items-center justify-center rounded-full border-[5px] border-white/90 bg-white/10 backdrop-blur-sm">
                <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-white" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
              </button>
            </RoseFrame>
          </div>
          <p className="mt-10 max-w-[19rem] text-xs leading-relaxed text-white/80 md:max-w-md md:text-[14px]">{roseBrief}</p>
        </div>
      </div>
    </section>
  )
}
