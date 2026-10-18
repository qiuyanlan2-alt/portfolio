import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useTitle } from '../components/ui'
import { getProject, projects } from '../data/projects'
import './art.css'

const a = (n: string) => `/art/${n}`
const ease = [0.22, 1, 0.36, 1] as const
const rise = (delay = 0) => ({ initial: { opacity: 0, y: 36 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.9, ease, delay } })

const strips = [
  { src: 'strip1.jpg', rot: -2.2, lift: 0, alt: '三联画：红色滩涂、海边人群的背影与一枚孤零零的航标' },
  { src: 'strip2.jpg', rot: 1.6, lift: 56, alt: '三联画：城市海岸线、涉水走来的女孩与靠在纸上的侧影' },
  { src: 'strip3.jpg', rot: -1.4, lift: 20, alt: '三联画：沙滩上的远景、水面倒影与海边的少女剪影' },
  { src: 'strip4.jpg', rot: 2.4, lift: 72, alt: '三联画：撑伞行人、红蓝水面与城市天际线' },
]

function Strip({ s, i, open, className = '' }: { s: (typeof strips)[number]; i: number; open: (src: string, alt: string) => void; className?: string }) {
  return (
    <motion.figure {...rise()} className={`art-card ${className}`} style={{ rotate: `${s.rot}deg` }}>
      <span aria-hidden className="art-tape" style={{ left: i % 2 ? '72%' : '28%' }} />
      <button type="button" className="art-zoom" data-cursor="ZOOM" onClick={() => open(a(s.src), s.alt)} aria-label={`放大查看：${s.alt}`}>
        <img src={a(s.src)} alt={s.alt} loading="lazy" />
      </button>
    </motion.figure>
  )
}
function Lightbox({ item, onClose }: { item: { src: string; alt: string } | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', key)
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = overflow }
  }, [item, onClose])
  return (
    <AnimatePresence>
      {item && (
        <motion.div role="dialog" aria-modal="true" aria-label={item.alt} className="fixed inset-0 z-[90] flex items-center justify-center bg-[#16110c]/92 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <button type="button" onClick={onClose} className="absolute right-4 top-4 border border-white/70 px-3 py-1 font-display text-xs tracking-widest text-white hover:bg-white hover:text-black">CLOSE ✕</button>
          <motion.img src={item.src} alt={item.alt} className="max-h-[92vh] max-w-full object-contain" initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }} onClick={(e) => e.stopPropagation()} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ArtDetail() {
  useTitle('是插画 Poems of the Sea')
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null)
  const open = useCallback((src: string, alt: string) => setZoom({ src, alt }), [])
  const close = useCallback(() => setZoom(null), [])

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 })

  const me = getProject('poems-of-the-sea')
  const idx = me ? projects.findIndex((p) => p.slug === me.slug) : 0
  const next = projects[(idx + 1) % projects.length]
  const prev = projects[(idx - 1 + projects.length) % projects.length]

  return (
    <article className="art-page">
      <motion.div aria-hidden className="art-progress" style={{ scaleX: progress }} />

      <header className="bg-paper text-ink">
        <div className="wrap py-8 md:py-12">
          <Link to="/projects?c=art" className="mb-5 inline-block border-2 border-ink px-3 py-1 font-display text-xs tracking-widest hover:bg-ink hover:text-paper">← 个人创作</Link>
          <div className="flex items-end justify-between gap-6">
            <h1 className="text-6xl font-black leading-none md:text-[9rem]">是插画</h1>
            <p className="pb-2 text-right text-sm font-light leading-snug md:text-2xl">海南 · 桂林 · 广州<br />2024—2025</p>
          </div>
          <p className="mt-4 text-2xl font-light md:text-5xl">Poems of the Sea</p>
          <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm md:text-lg">
            <span className="flex items-center gap-2"><i className="art-swatch" style={{ background: '#d6322c' }} />红</span>
            <span className="flex items-center gap-2"><i className="art-swatch" style={{ background: '#2c4a6e' }} />蓝</span>
            <span className="flex items-center gap-2"><i className="art-swatch" style={{ background: '#efe6d2' }} />米白</span>
            <span className="text-ink/60">手绘 · Procreate · 版画肌理</span>
          </p>
        </div>
      </header>

      {/* Opening band: wide coast print on pale blue, with the handwritten title card */}
      <section className="bg-[#cfdfe6]">
        <div className="wrap relative grid items-center gap-8 py-14 md:grid-cols-[1.35fr_0.65fr] md:py-20">
          <motion.div {...rise()} className="art-bare w-full" style={{ rotate: '-1deg' }}>
            <span aria-hidden className="art-tape-blue" />
            <button type="button" className="art-zoom" data-cursor="ZOOM" onClick={() => open(a('hainan.jpg'), '三色版画：海南海岸线与远处的城市和码头')} aria-label="放大查看：海南海岸线版画">
              <img src={a('hainan.jpg')} alt="三色版画：海南海岸线，远处是城市和码头，岸边站着一个人" fetchPriority="high" />
            </button>
          </motion.div>
          <motion.div {...rise(0.15)} className="mx-auto w-full max-w-sm" style={{ rotate: '3deg' }}>
            <img src={a('title.png')} alt="手写题字：from Hainan 2024." />
          </motion.div>
        </div>
      </section>

      {/* Serial strips, large, alternating sides; small pieces are tucked in beside them */}
      <section className="wrap relative pb-24 pt-14 md:pt-24">
        {/* 1 · strip left, cat + sleeping girl right */}
        <div className="grid items-start gap-8 md:grid-cols-12 md:gap-0">
          <Strip s={strips[1]} i={1} open={open} className="md:col-span-7" />
          <div className="relative md:col-span-5 md:pl-10">
            <motion.img {...rise()} src={a('quote-cat.png')} alt="手写：“I talked to God about you, he said he sent you an angel”，配一只趴着的猫" className="art-ink mx-auto w-full max-w-sm md:mt-4" loading="lazy" />
            <motion.img {...rise(0.1)} src={a('girl-sleep.png')} alt="手绘：侧着头沉睡的长发女孩" className="art-float relative -ml-6 mt-6 w-[118%] max-w-none md:-ml-24 md:mt-12 md:w-[125%]" loading="lazy" />
          </div>
        </div>

        {/* 2 · heart + twins left, strip right */}
        <div className="mt-16 grid items-start gap-8 md:mt-28 md:grid-cols-12 md:gap-0">
          <div className="md:col-span-5 md:pr-10">
            <motion.img {...rise()} src={a('quote-heart.png')} alt="手写：“Do I still got time to grow? Things ain't always set in stone”，旁边一颗爱心" className="art-ink w-full max-w-md" loading="lazy" />
            <motion.img {...rise(0.1)} src={a('twins.png')} alt="版画风：两个脸贴着脸的红发人物" className="art-float-b mx-auto mt-10 w-4/5 md:mt-20" loading="lazy" />
          </div>
          <Strip s={strips[0]} i={0} open={open} className="md:col-span-7" />
        </div>

        {/* 3 · strip left, portrait + quote right */}
        <div className="mt-16 grid items-start gap-8 md:mt-28 md:grid-cols-12 md:gap-0">
          <Strip s={strips[2]} i={2} open={open} className="md:col-span-7" />
          <div className="md:col-span-5 md:pl-12">
            <motion.img {...rise()} src={a('girl-green.png')} alt="手绘：穿荧光绿外套的短发女孩" className="art-float mx-auto w-3/5 md:mt-10 md:w-4/5" loading="lazy" />
            <motion.img {...rise(0.1)} src={a('quote-moments.png')} alt="手写：“Just like moments, passing, in front of me”" className="art-ink mt-8 w-full max-w-sm md:mt-14" loading="lazy" />
          </div>
        </div>

        {/* 4 · tree left, last strip right */}
        <div className="mt-16 grid items-end gap-8 md:mt-28 md:grid-cols-12 md:gap-0">
          <motion.img
            src={a('tree.png')}
            alt="线稿：开着花的树，右下角写着 END"
            className="art-ink order-2 mx-auto w-full max-w-[18rem] md:order-1 md:col-span-4 md:max-w-sm"
            loading="lazy"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
          />
          <Strip s={strips[3]} i={3} open={open} className="order-1 md:order-2 md:col-span-8" />
        </div>
      </section>
      <nav aria-label="项目切换" className="grid border-t border-ink/20 bg-ink text-paper md:grid-cols-2">
        <Link to={`/projects/${prev.slug}`} className="border-b border-white/15 p-8 transition-colors hover:bg-white/10 md:border-b-0 md:border-r">
          <p className="font-display text-[11px] tracking-[0.2em] text-[#d6322c]">← PREVIOUS</p>
          <p className="mt-2 text-2xl font-black">{prev.title}</p>
        </Link>
        <Link to={`/projects/${next.slug}`} className="p-8 text-right transition-colors hover:bg-[#d6322c]">
          <p className="font-display text-[11px] tracking-[0.2em] opacity-80">NEXT →</p>
          <p className="mt-2 text-2xl font-black">{next.title}</p>
        </Link>
      </nav>

      <Lightbox item={zoom} onClose={close} />
    </article>
  )
}
