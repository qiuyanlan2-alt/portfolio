import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTitle } from '../components/ui'
import { getProject, projects } from '../data/projects'
import './light.css'

const fade = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }

const intro =
  '以秦淮灯彩为文化原型，面向 18—30 岁青年群体，让用户把难以说出口的情绪写下来。由 AI 解析并生成专属“心灯”，再通过色彩、纹样、材质进行个性化调整，最终点亮并放入灯海，获得他人的回应与陪伴。项目涵盖用户研究、产品结构、界面设计、3D 灯笼视觉与衍生海报。'

const screens = [
  { src: '/light/page1.jpg', n: 'Page 1', t: '首页（灯海KV）' },
  { src: '/light/page2.jpg', n: 'Page 2', t: '情绪表达“今天发生了什么？”' },
  { src: '/light/page3.jpg', n: 'Page 3', t: 'AI生成心灯（根据内容生成灯型、色彩、纹样）' },
  { src: '/light/page4.jpg', n: 'Page 4', t: '个性化调整（颜色、纹样、材质）' },
  { src: '/light/page5.jpg', n: 'Page 5', t: '点亮心灯（长按点亮，投入灯海）' },
  { src: '/light/page6.jpg', n: 'Page 6', t: '灯海社区（查看与回应他人的心灯）' },
]

const palette = [
  { c: '#cf975e', n: '暖金' },
  { c: '#cd8dbb', n: '浅紫粉' },
  { c: '#b171ac', n: '紫' },
  { c: '#60aab4', n: '青' },
  { c: '#1c3b4a', n: '深青' },
  { c: '#10213b', n: '夜蓝' },
  { c: '#1f2a38', n: '墨' },
]

const lanterns = [
  { src: '/light/lantern-3d.png', cn: '3D建模', en: 'Line Draft Setting' },
  { src: '/light/lantern-ai.png', cn: 'AI渲染', en: 'Finali Effect' },
  { src: '/light/lantern-derive.png', cn: 'AI衍生', en: 'By-product' },
]

function SectionHead({ no, cn, en }: { no: string; cn: string; en?: string }) {
  return (
    <motion.div {...fade}>
      <div className="flex items-end gap-5">
        <span className="lw-no text-5xl md:text-7xl">{no}</span>
        <div className="pb-1">
          <h2 className="text-2xl font-black md:text-4xl">{cn}</h2>
          {en && <p className="mt-1 text-sm text-white/70 md:text-lg">{en}</p>}
        </div>
      </div>
      <div className="lw-rule mt-6" />
    </motion.div>
  )
}

/** Diagram image that opens full-size on click: the mind-map text is too small to read inline. */
function Zoom({ src, alt, onOpen, className = '' }: { src: string; alt: string; onOpen: (s: string, a: string) => void; className?: string }) {
  return (
    <button type="button" onClick={() => onOpen(src, alt)} data-cursor="ZOOM" aria-label={`放大查看：${alt}`} className={`lw-zoom ${className}`}>
      <img src={src} alt={alt} loading="lazy" className="w-full" />
    </button>
  )
}

function Lightbox({ item, onClose }: { item: { src: string; alt: string } | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('keydown', key)
      document.body.style.overflow = overflow
    }
  }, [item, onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
          className="fixed inset-0 z-[90] overflow-auto bg-[#080e24]/95 p-4 backdrop-blur-sm md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button type="button" onClick={onClose} className="fixed right-4 top-4 z-10 border border-white/70 px-3 py-1 font-display text-xs tracking-widest text-white hover:bg-white hover:text-black">
            CLOSE ✕
          </button>
          <img src={item.src} alt={item.alt} className="mx-auto max-w-none rounded-2xl md:max-w-full" style={{ width: 'min(1400px, 100%)' }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Slowly rising lantern embers for the empty stretches of the page. */
const EMBERS = Array.from({ length: 14 }, (_, i) => ({
  x: `${(i * 37 + 8) % 96}%`,
  s: `${7 + ((i * 5) % 9)}px`,
  d: `${14 + ((i * 7) % 12)}s`,
  t: `${-((i * 3.1) % 14)}s`,
}))

function Embers() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {EMBERS.map((e, i) => (
        <i key={i} className="lw-ember" style={{ ['--x' as string]: e.x, ['--s' as string]: e.s, ['--d' as string]: e.d, ['--t' as string]: e.t }} />
      ))}
    </div>
  )
}

/** Orbit rings + twinkling stars behind the hero phones, after the reference. */
function Orbits() {
  return (
    <svg aria-hidden viewBox="0 0 600 500" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      <g className="lw-orbit" fill="none" stroke="rgba(200,180,255,.75)" strokeWidth="1.6">
        <ellipse cx="300" cy="250" rx="290" ry="105" transform="rotate(-14 300 250)" />
      </g>
      <g className="lw-orbit lw-orbit-b" fill="none" stroke="rgba(200,180,255,.5)" strokeWidth="1.3">
        <ellipse cx="300" cy="250" rx="250" ry="140" transform="rotate(18 300 250)" />
      </g>
      {[
        [58, 150, 16],
        [545, 330, 11],
        [470, 40, 8],
      ].map(([x, y, r], i) => (
        <path key={i} className="lw-twinkle" style={{ animationDelay: `${-i * 1.1}s` }} fill="#b9a6ee" d={`M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}Z`} />
      ))}
    </svg>
  )
}

export default function LightDetail() {
  useTitle('心灯计划 Light Within')
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null)
  const open = useCallback((src: string, alt: string) => setZoom({ src, alt }), [])
  const close = useCallback(() => setZoom(null), [])

  const me = getProject('light-within')
  const idx = me ? projects.findIndex((p) => p.slug === me.slug) : 0
  const next = projects[(idx + 1) % projects.length]
  const prev = projects[(idx - 1 + projects.length) % projects.length]

  return (
    <article className="light-page">
      <header className="bg-paper text-ink">
        <div className="wrap relative py-8 md:py-12">
          <Link to="/projects?c=uxui" className="mb-5 inline-block border-2 border-ink px-3 py-1 font-display text-xs tracking-widest hover:bg-ink hover:text-paper">
            ← UXUI
          </Link>
          <h1 className="text-6xl font-black leading-none tracking-tight md:text-[8.5rem]">心灯计划</h1>
          <p className="mt-4 text-3xl font-light md:text-6xl">Light Within</p>
          <p className="mt-2 text-2xl font-light md:text-5xl">Figma · Blender X AI</p>
          <div className="absolute right-4 top-8 text-right text-lg font-light leading-tight md:right-12 md:top-12 md:text-3xl">
            <p>UX</p>
            <p>UI</p>
            <p className="mt-10 md:mt-24">#在校</p>
          </div>
        </div>
      </header>

      {/* Hero: intro + two floating phones inside orbit rings */}
      <section className="relative isolate overflow-hidden pb-16 pt-10 md:pb-20 md:pt-14">
        <Embers />
        <img src="/light/star.png" alt="" aria-hidden className="pointer-events-none absolute -right-10 top-1/3 -z-10 w-72 opacity-25 md:w-[28rem]" />
        <div className="wrap grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <motion.p {...fade} className="max-w-md text-[13px] font-bold leading-6 text-white/95 md:text-[14px] md:leading-7">
            {intro}
          </motion.p>
          <div className="relative mx-auto h-[30rem] w-full max-w-[34rem] md:h-[34rem]">
            <Orbits />
            <div className="lw-float-b absolute left-[4%] top-[14%] w-[44%] -rotate-[10deg]">
              <div className="lw-phone"><img src="/light/page1.jpg" alt="首页：心灯计划灯海 KV" fetchPriority="high" /></div>
            </div>
            <div className="lw-float-a absolute right-[2%] top-0 w-[46%] rotate-[7deg]">
              <div className="lw-phone"><img src="/light/page4.jpg" alt="个性化调整：颜色、纹样、材质" fetchPriority="high" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 Research */}
      <section className="wrap py-16 md:py-24">
        <SectionHead no="01" cn="用户研究" en="Research · Need · Journey" />
        <div className="mt-12 grid items-start gap-10 md:grid-cols-2">
          <motion.div {...fade}><Zoom src="/light/mind-youth.png" alt="青年心理健康问题与设计机会" onOpen={open} /></motion.div>
          <motion.div {...fade}><Zoom src="/light/research.png" alt="18-30 岁青年群体调研数据与需求" onOpen={open} /></motion.div>
        </div>
        <motion.div {...fade} className="mt-12 overflow-x-auto rounded-3xl pb-2">
          <div className="min-w-[56rem]"><Zoom src="/light/journey.png" alt="用户旅程图" onOpen={open} /></div>
        </motion.div>
        <p className="mt-3 text-xs text-white/50 md:hidden">左右滑动查看完整旅程图，点击可放大</p>
      </section>

      {/* 02 Structure */}
      <section className="wrap py-16 md:py-24">
        <SectionHead no="02" cn="产品结构" en="Information Architecture" />
        <div className="mt-12 grid items-start gap-10 md:grid-cols-[1.15fr_0.85fr]">
          <motion.div {...fade}><Zoom src="/light/ia.png" alt="信息架构图" onOpen={open} /></motion.div>
          <motion.div {...fade}><Zoom src="/light/brand.png" alt="品牌定位、视觉识别、产品矩阵与营销策略" onOpen={open} /></motion.div>
        </div>
        <motion.div {...fade} className="mx-auto mt-12 max-w-3xl">
          <Zoom src="/light/input-map.png" alt="用户输入到心灯生成的逻辑图：情绪识别与映射数据库" onOpen={open} />
        </motion.div>
      </section>

      {/* 03 Visual */}
      <section className="wrap relative isolate py-16 md:py-24">
        <Embers />
        <SectionHead no="03" cn="效果展示" en="AICG + 3D" />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {lanterns.map((l, i) => (
            <motion.figure key={l.cn} {...fade} transition={{ ...fade.transition, delay: i * 0.12 }} className="text-center">
              <img src={l.src} alt={`${l.cn}：心灯`} loading="lazy" className={`mx-auto w-full max-w-xs ${i % 2 ? 'lw-float-b' : 'lw-float-a'}`} />
              <figcaption className="mt-6">
                <p className="text-2xl font-black text-white/90 md:text-3xl">{l.cn}</p>
                <p className="mt-1 text-sm text-white/55">{l.en}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>
      {/* 04 Interface */}
      <section className="py-16 md:py-24">
        <div className="wrap">
          <SectionHead no="04" cn="界面系统" en="6 Core Pages" />
          <div className="-mx-4 mt-14 flex snap-x gap-5 overflow-x-auto px-4 pb-8 md:mx-0 md:grid md:grid-cols-6 md:overflow-visible md:px-0">
            {screens.map((s, i) => (
              <motion.figure key={s.n} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }} className="w-[62vw] shrink-0 snap-center md:w-auto">
                <div className="lw-screen"><div className="lw-phone"><img src={s.src} alt={`${s.n}：${s.t}`} loading="lazy" /></div></div>
                <figcaption className="mt-5">
                  <p className="inline-block bg-[var(--lw-pink)] px-3 py-1 font-display text-sm md:text-base">{s.n}</p>
                  <p className="mt-2 text-xs leading-5 text-white/75">{s.t}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
          <motion.div {...fade} className="mt-4 overflow-x-auto">
            <img src="/light/flow.png" alt="六个页面的使用流程：Page 1 到 Page 6" loading="lazy" className="min-w-[44rem] w-full" />
          </motion.div>
        </div>
      </section>

      {/* 05 Visual identity */}
      <section className="wrap relative isolate py-16 md:py-24">
        <Embers />
        <SectionHead no="05" cn="视觉规范与衍生" en="Colour · Type · Posters" />
        <div className="mt-14 grid items-center gap-12 md:grid-cols-[1fr_1fr]">
          <motion.div {...fade}>
            <img src="/light/posters.png" alt="情绪海报：焦虑、孤独" loading="lazy" className="w-full" />
          </motion.div>
          <motion.div {...fade}>
            <h3 className="flex items-center gap-3 text-2xl font-black md:text-3xl"><i className="inline-block h-7 w-2 bg-[#e8cf6a]" />配色方案</h3>
            <ul className="mt-8 flex">
              {palette.map((s, i) => (
                <li key={s.c} className="lw-swatch relative -ml-6 first:ml-0" style={{ zIndex: i }}>
                  <span className="block h-20 w-20 rounded-full shadow-[0_6px_18px_rgba(0,0,0,.35)] md:h-28 md:w-28" style={{ background: s.c }} title={`${s.n} ${s.c}`} />
                  <span className="sr-only">{s.n} {s.c}</span>
                </li>
              ))}
            </ul>
            <h3 className="mt-14 flex items-center gap-3 text-2xl font-black md:text-3xl"><i className="inline-block h-7 w-2 bg-[#e8cf6a]" />字体设计</h3>
            <div className="mt-6 space-y-5 font-serif">
              <div className="grid grid-cols-[6.5rem_1fr] items-center gap-4 md:grid-cols-[9rem_1fr]">
                <p className="text-2xl tracking-[0.15em] text-white/85 md:text-3xl">华文仿宋</p>
                <p className="text-sm leading-6 text-white/80 md:text-base">ABCDEFGHIJKLMNOP<br />QRSTUVWXYZ 1234567890</p>
              </div>
              <div className="grid grid-cols-[6.5rem_1fr] items-center gap-4 md:grid-cols-[9rem_1fr]">
                <p className="text-2xl text-white/85 md:text-3xl">Bell MT</p>
                <p className="text-sm leading-6 text-white/80 md:text-base">ABCDEFGHIJKLMNOP<br />QRSTUVWXYZ 1234567890</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="pb-12 md:pb-20" />

      <nav aria-label="项目切换" className="grid border-t border-white/20 bg-[#0a1230] md:grid-cols-2">
        <Link to={`/projects/${prev.slug}`} className="border-b border-white/15 p-8 transition-colors hover:bg-white/10 md:border-b-0 md:border-r">
          <p className="font-display text-[11px] tracking-[0.2em] text-[#cd8dbb]">← PREVIOUS</p>
          <p className="mt-2 text-2xl font-black">{prev.title}</p>
        </Link>
        <Link to={`/projects/${next.slug}`} className="p-8 text-right transition-colors hover:bg-[#b04a85]">
          <p className="font-display text-[11px] tracking-[0.2em] opacity-80">NEXT →</p>
          <p className="mt-2 text-2xl font-black">{next.title}</p>
        </Link>
      </nav>

      <Lightbox item={zoom} onClose={close} />
    </article>
  )
}