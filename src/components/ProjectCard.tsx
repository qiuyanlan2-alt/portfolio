import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getCategory } from '../data/projects'
import type { Project } from '../data/types'

export default function ProjectCard({ p, priority = false }: { p: Project; priority?: boolean }) {
  const cat = getCategory(p.category)
  return (
    <motion.article className="project-card" layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.45 }}>
      <Link to={`/projects/${p.slug}`} data-cursor="VIEW" className="group block">
        <div className="relative aspect-square overflow-hidden border-2 border-ink bg-ink">
          <img
            src={p.cover.src}
            alt={p.cover.alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <div
            className="absolute inset-x-0 bottom-0 translate-y-full px-4 py-3 text-sm text-white transition-transform duration-500 ease-out group-hover:translate-y-0"
            style={{ background: p.accent }}
          >
            {p.role}
          </div>
          <span className="absolute left-0 top-0 bg-red px-3 py-1 font-display text-sm text-white">{p.no}</span>
          {p.video && <span className="absolute right-0 top-0 bg-ink px-2 py-1 font-display text-[10px] tracking-widest text-white">VIDEO</span>}
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-black leading-tight">{p.title}</h3>
            <p className="mt-0.5 font-display text-[11px] uppercase tracking-widest text-mute">{p.en}</p>
          </div>
          <span className="shrink-0 border border-ink px-2 py-0.5 text-xs">{cat.label}</span>
        </div>
      </Link>
    </motion.article>
  )
}
