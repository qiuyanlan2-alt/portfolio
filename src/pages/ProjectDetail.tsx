import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Lightbox from '../components/Lightbox'
import VideoSlot from '../components/VideoSlot'
import { Reveal, SectionHead, useTitle } from '../components/ui'
import { getCategory, getProject, projects } from '../data/projects'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug = '' } = useParams()
  const p = getProject(slug)
  const navigate = useNavigate()
  const [box, setBox] = useState<number | null>(null)
  useTitle(p?.title)

  if (!p) return <NotFound />

  const idx = projects.findIndex((x) => x.slug === p.slug)
  const next = projects[(idx + 1) % projects.length]
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const all = [...p.sheets, ...(p.extras ?? [])]
  const cat = getCategory(p.category)

  // Back goes to the previous page when we came from inside the site, else to the list.
  const back = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/projects'))

  return (
    <article>
      <section className="relative overflow-hidden text-white" style={{ background: p.accent }}>
        <div className="wrap grid grid-cols-1 gap-10 py-10 md:grid-cols-[1.1fr_1fr] md:py-16">
          <div className="flex min-w-0 flex-col justify-between">
            <button type="button" onClick={back} className="self-start border-2 border-white px-3 py-1.5 font-display text-xs tracking-widest transition-colors hover:bg-white hover:text-ink">
              ← BACK
            </button>
            <div className="mt-10 md:mt-24">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="font-display text-xs uppercase tracking-[0.2em]">
                {p.no} / {cat.label} / {p.year}
              </motion.p>
              <h1 className="mt-3 overflow-hidden font-display text-5xl leading-[1.05] md:text-7xl">
                <motion.span className="block" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                  {p.title}
                </motion.span>
              </h1>
              <p className="mt-2 font-display text-sm uppercase tracking-widest opacity-80">{p.en}</p>
              <p className="mt-6 max-w-lg text-base leading-relaxed md:text-lg">{p.summary}</p>
              <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
                <dt className="opacity-70">角色</dt>
                <dd>{p.role}</dd>
                <dt className="opacity-70">工具</dt>
                <dd>{p.tools.join(' · ')}</dd>
              </dl>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45, duration: 0.8 }} className="relative aspect-square w-full overflow-hidden border-2 border-white bg-black shadow-[10px_10px_0_rgba(0,0,0,.85)]">
            <img src={p.cover.src} alt={p.cover.alt} className="h-full w-full object-cover object-top" fetchPriority="high" />
          </motion.div>
        </div>
      </section>

      <section className="wrap grid grid-cols-2 gap-6 border-b-2 border-ink py-8 md:grid-cols-4">
        {p.facts.map((f) => (
          <Reveal key={f.k} className="min-w-0">
            <p className="label">{f.k}</p>
            <p className="mt-1 break-words text-xl font-black md:text-2xl">{f.v}</p>
          </Reveal>
        ))}
      </section>

      <section className="wrap py-16 md:py-24">
        <SectionHead en="Process" title="设计过程" no="01" />
        <ol className="grid grid-cols-1 gap-0 md:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
          {p.process.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className="relative border-t-2 border-ink px-0 py-5 md:border-l-2 md:border-t-0 md:px-5">
              <span className="font-display text-4xl text-red">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-lg font-black">{s.title}</h3>
              <p className="font-display text-[10px] uppercase tracking-widest text-mute">{s.en}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {p.video && (
        <section className="bg-ink py-16 text-paper md:py-24">
          <div className="wrap">
            <SectionHead en="Motion" title="动态影像" no="02" />
            <Reveal className="mx-auto aspect-video max-w-4xl">
              <VideoSlot video={p.video} />
            </Reveal>
          </div>
        </section>
      )}

      <section className="wrap py-16 md:py-24">
        <SectionHead en="Full board" title="完整版面" no={p.video ? '03' : '02'} />
        <p className="-mt-6 mb-8 text-sm text-mute">点击任意一段放大查看，← → 切换，Esc 关闭。</p>
        <div className="mx-auto max-w-3xl border-2 border-ink bg-black">
          {p.sheets.map((s, i) => (
            <button key={s.src} type="button" data-cursor="ZOOM" onClick={() => setBox(i)} className="block w-full">
              <img src={s.src} alt={s.alt} loading={i < 2 ? 'eager' : 'lazy'} decoding="async" className="w-full" />
            </button>
          ))}
        </div>

        {p.extras && (
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {p.extras.map((s, i) => (
              <Reveal key={s.src}>
                <button type="button" data-cursor="ZOOM" onClick={() => setBox(p.sheets.length + i)} className="block aspect-[4/3] w-full overflow-hidden border-2 border-ink bg-black">
                  <img src={s.src} alt={s.alt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      <nav aria-label="项目切换" className="grid border-t-2 border-ink md:grid-cols-2">
        <Link to={`/projects/${prev.slug}`} className="group border-b-2 border-ink p-8 transition-colors hover:bg-ink hover:text-paper md:border-b-0 md:border-r-2">
          <p className="label">← Previous</p>
          <p className="mt-2 text-2xl font-black">{prev.title}</p>
        </Link>
        <Link to={`/projects/${next.slug}`} className="group p-8 text-right transition-colors hover:bg-red hover:text-white">
          <p className="label group-hover:text-white">Next →</p>
          <p className="mt-2 text-2xl font-black">{next.title}</p>
        </Link>
      </nav>

      <Lightbox images={all} index={box} onChange={setBox} />
    </article>
  )
}
