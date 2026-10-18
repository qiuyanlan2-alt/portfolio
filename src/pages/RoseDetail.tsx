import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTitle } from '../components/ui'
import { getProject, projects } from '../data/projects'
import RoseHero from './rose/RoseHero'
import RoseScenes from './rose/RoseScenes'
import RoseType from './rose/RoseType'
import VideoModal from './rose/VideoModal'
import { roseVideo } from './rose/data'
import './rose.css'

export default function RoseDetail() {
  useTitle('玫瑰升级 Rose Upgrade')
  const [playing, setPlaying] = useState(false)
  const close = useCallback(() => setPlaying(false), [])

  const me = getProject('rose-upgrade')
  const idx = me ? projects.findIndex((p) => p.slug === me.slug) : 0
  const next = projects[(idx + 1) % projects.length]
  const prev = projects[(idx - 1 + projects.length) % projects.length]

  return (
    <article className="rose-page">
      <header className="bg-paper text-ink">
        <div className="wrap py-8 md:py-12">
          <Link to="/projects?c=yy" className="mb-5 inline-block border-2 border-ink px-3 py-1 font-display text-xs tracking-widest hover:bg-ink hover:text-paper">
            ← YY LIVE
          </Link>
          <div className="flex items-baseline justify-between gap-6">
            <p className="font-display text-5xl leading-none md:text-8xl">YY LIVE</p>
            <p className="font-display text-4xl leading-none md:text-8xl">MP4</p>
          </div>
          <p className="mt-4 text-xl font-medium md:text-4xl">Technical Artist 技术美术</p>
          <p className="mt-1 text-base font-light md:text-3xl">Creative Technology / Visual Effects</p>
        </div>
      </header>

      <RoseHero onPlay={() => setPlaying(true)} />
      <RoseScenes />
      <RoseType />

      <nav aria-label="项目切换" className="grid border-t border-white/20 bg-[#1d0f35] md:grid-cols-2">
        <Link to={`/projects/${prev.slug}`} className="border-b border-white/15 p-8 transition-colors hover:bg-white/10 md:border-b-0 md:border-r">
          <p className="font-display text-[11px] tracking-[0.2em] text-[var(--rose-gold)]">← PREVIOUS</p>
          <p className="mt-2 text-2xl font-black">{prev.title}</p>
        </Link>
        <Link to={`/projects/${next.slug}`} className="p-8 text-right transition-colors hover:bg-[var(--rose-pink)] hover:text-[#1d0f35]">
          <p className="font-display text-[11px] tracking-[0.2em] opacity-80">NEXT →</p>
          <p className="mt-2 text-2xl font-black">{next.title}</p>
        </Link>
      </nav>

      <VideoModal open={playing} src={roseVideo.src} poster={roseVideo.poster} onClose={close} />
    </article>
  )
}
