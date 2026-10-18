import { AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { Reveal, useTitle } from '../components/ui'
import { categories, projects } from '../data/projects'
import type { CategoryId } from '../data/types'

export default function Projects() {
  useTitle('作品')
  const [params, setParams] = useSearchParams()
  const raw = params.get('c')
  const active = categories.find((c) => c.id === raw)?.id as CategoryId | undefined
  const list = active ? projects.filter((p) => p.category === active) : projects

  const select = (id?: CategoryId) => {
    const next = new URLSearchParams(params)
    if (id) next.set('c', id)
    else next.delete('c')
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const chip = (on: boolean) =>
    `border-2 border-ink px-4 py-2 text-sm font-bold transition-colors ${on ? 'bg-ink text-paper' : 'bg-paper hover:bg-red hover:text-white hover:border-red'}`

  return (
    <div className="works-directory wrap pb-10 pt-12 md:pt-20">
      <div className="works-masthead"><span>QYL / SELECTED PORTFOLIO</span><span>2025 — 2026</span></div>
      <header className="works-heading">
      <Reveal>
        <p className="label">INDEX / 作品目录</p>
        <h1 className="mt-2 font-display text-6xl leading-none md:text-9xl">
          作品<span className="text-red">集</span>
        </h1>
      </Reveal>
        <div className="works-edition"><span className="hand">A collection of<br />ideas made real.</span><p>视觉 · 交互 · 技术艺术</p></div>
      </header>

      <div className="works-filterbar">
      <div role="group" aria-label="作品分类筛选" className="flex flex-wrap gap-2">
        <button type="button" className={chip(!active)} aria-pressed={!active} onClick={() => select()}>
          全部 <span className="font-display text-[10px] opacity-60">{projects.length}</span>
        </button>
        {categories.map((c) => (
          <button key={c.id} type="button" className={chip(active === c.id)} aria-pressed={active === c.id} onClick={() => select(c.id)}>
            {c.label} <span className="font-display text-[10px] opacity-60">{projects.filter((p) => p.category === c.id).length}</span>
          </button>
        ))}
      </div>
      <p className="works-count" aria-live="polite">{String(list.length).padStart(2, '0')} PROJECTS / {active ? categories.find(c => c.id === active)?.label : '全部作品'}</p>
      </div>

      <div className="works-grid grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence initial={false}>
          {list.map((p, i) => (
            <ProjectCard key={p.slug} p={p} priority={i < 3} />
          ))}
        </AnimatePresence>
      </div>
      <div className="works-colophon"><span>好奇心没有边界，创作仍在继续。</span><span>QYL / END OF INDEX</span></div>
    </div>
  )
}
