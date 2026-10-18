import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../../components/ui'
import { roseScenes } from './data'

export default function RoseScenes() {
  const [i, setI] = useState(0)
  const s = roseScenes[i]
  const step = (d: number) => setI((v) => (v + d + roseScenes.length) % roseScenes.length)

  return (
    <section className="relative bg-[var(--rose-panel)] pb-24 pt-14 md:pt-24">
      <div className="wrap">
        <Reveal>
          <h2 className="text-[3.2rem] font-black leading-none md:text-8xl">主画面展示</h2>
          <p className="rose-title-ghost -mt-1 font-display text-3xl uppercase leading-none md:-mt-3 md:text-6xl">Visual Development</p>
        </Reveal>
        <hr className="my-8 border-white/30" />

        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tracking-wide md:text-base">
          {roseScenes.map((x, k) => (
            <span key={x.stage} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setI(k)}
                aria-pressed={k === i}
                className={`transition-colors ${k === i ? 'text-[var(--rose-pink)] underline underline-offset-4' : 'text-white/80 hover:text-white'}`}
              >
                {x.stage}
              </button>
              {k < roseScenes.length - 1 && <span aria-hidden className="text-white/50">→</span>}
            </span>
          ))}
        </p>

        {/* five key frames: the active one opens up */}
        <div className="-mx-5 mt-8 flex snap-x gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:h-[36rem] md:overflow-visible md:px-0">
          {roseScenes.map((x, k) => (
            <button
              key={x.stage}
              type="button"
              onClick={() => setI(k)}
              onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setI(k)}
              aria-pressed={k === i}
              data-cursor="VIEW"
              className="rose-card group relative h-[26rem] w-[58vw] shrink-0 snap-center overflow-hidden rounded-[6px] text-left md:h-full md:w-auto md:shrink md:basis-0"
              style={{ flexGrow: k === i ? 3.2 : 1, filter: k === i ? 'none' : 'saturate(.8) brightness(.82)' }}
            >
              <img src={x.image} alt={`${x.name}：${x.title}`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1d0f35]/90 to-transparent px-4 pb-4 pt-16">
                <span className="block font-display text-[10px] tracking-[0.25em] text-[var(--rose-gold)]">{x.no} / {x.stage}</span>
                <span className="mt-1 block text-lg font-bold md:text-xl">{x.name}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-[1.6rem] bg-white p-6 text-[#222] shadow-[0_24px_60px_rgba(10,0,30,.35)] md:p-9">
          <AnimatePresence mode="wait">
            <motion.div key={s.stage} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
              <h3 className="text-base font-black md:text-lg">
                {s.no} — {s.title}
                <span className="ml-3 rounded-full bg-[var(--rose-panel)] px-3 py-0.5 align-middle font-display text-[10px] tracking-widest text-white">{s.stage}</span>
              </h3>
              <p className="mt-3 border-l-4 border-[#d5ccdf] pl-4 text-[13px] leading-[1.9] text-[#6d6678] md:text-sm">{s.prompt}</p>
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex items-center justify-between border-t border-[#e8e2ee] pt-4 text-sm">
            <span className="font-display text-xs tracking-widest text-[#8d85a0]">
              {String(i + 1).padStart(2, '0')} / {String(roseScenes.length).padStart(2, '0')}
            </span>
            <span className="flex gap-2">
              <button type="button" onClick={() => step(-1)} aria-label="上一张" className="h-9 w-9 rounded-full border border-[#cfc6dc] hover:bg-[var(--rose-panel)] hover:text-white">←</button>
              <button type="button" onClick={() => step(1)} aria-label="下一张" className="h-9 w-9 rounded-full border border-[#cfc6dc] hover:bg-[var(--rose-panel)] hover:text-white">→</button>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
