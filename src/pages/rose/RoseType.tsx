import { Reveal } from '../../components/ui'
import Petals from './Petals'
import { roseTypes } from './data'

export default function RoseType() {
  return (
    <section className="relative overflow-hidden bg-[#2a1646] pb-24 pt-16 md:pt-24">
      <Petals className="opacity-70" />
      <div className="wrap relative">
        <Reveal>
          <h2 className="text-[3rem] font-black leading-none md:text-7xl">字体展示</h2>
          <p className="rose-title-ghost -mt-1 font-display text-3xl uppercase leading-none md:-mt-2 md:text-5xl">Type Design</p>
        </Reveal>
        <hr className="my-8 border-white/30" />

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-10">
          {roseTypes.map((t, i) => (
            <Reveal key={t.word} delay={i * 0.12} className="flex flex-col items-center">
              <img
                src={t.type}
                alt={`${t.word} 艺术字`}
                loading="lazy"
                decoding="async"
                className="rose-float w-full max-w-[26rem] drop-shadow-[0_18px_30px_rgba(10,0,30,.55)]"
                style={{ animationDelay: `${i * -2.4}s` }}
              />
              <figure className="group mt-12 w-[min(70vw,16rem)]">
                <div className="aspect-[9/16] overflow-hidden rounded-[1.8rem] border border-white/25 shadow-[0_30px_70px_rgba(8,0,24,.7)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-[-1.2deg]">
                  <img src={t.frame} alt={`${t.word} 成片画面`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
                <figcaption className="mt-4 text-center text-xs text-white/70">{t.note}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <p className="mt-20 text-center font-display text-[11px] tracking-[0.3em] text-white/55">FINAL MP4 / YY LIVE / 2026</p>
      </div>
    </section>
  )
}
