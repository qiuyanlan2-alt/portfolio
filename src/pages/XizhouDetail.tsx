import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, MotionConfig } from 'framer-motion'
import Lightbox from '../components/Lightbox'
import { useTitle } from '../components/ui'
import { getProject, projects } from '../data/projects'
import type { MediaImage } from '../data/types'
import Concept from './xizhou/Concept'
import UX from './xizhou/UX'
import { fade, SectionHead } from './xizhou/shared'
import './xizhou.css'


interface Shot { id: string; n: string; t: string }
const shot = (id: string, n: string, t: string): Shot => ({ id, n, t })

/** Phone systems, grouped by the "找得到 → 看得懂 → 用得上" logic of the deck. */
const groups: { cn: string; en: string; note: string; shots: Shot[] }[] = [
  {
    cn: '先找得到', en: 'Find · 服务与路线', note: '服务在前：选游览方式、看首页状态、按类别找设施，再生成路线。',
    shots: [
      shot('p01', 'Page 01', '游览模式选择'), shot('p02', 'Page 02', '首页'), shot('p03', 'Page 03', '公共服务'),
      shot('p09', 'Page 09', '公共服务详情'), shot('p04', 'Page 04', '智能路线推荐'), shot('p05', 'Page 05', '推荐路线结果'),
    ],
  },
  {
    cn: '地图', en: 'Map · 点位与路线', note: '点位与路线入口在同一张地图上，可在景点 / 路线 / 公共服务间切换。',
    shots: [shot('p06', 'Page 06', '地图'), shot('p06b', 'Page 06-1', '地图 · 路线')],
  },
  {
    cn: '再看得懂', en: 'Culture · 文化', note: '文化详情与问答、甲马文化图鉴、数字福印。',
    shots: [shot('p10', 'Page 10', '文化详情与问答'), shot('p11', 'Page 11', '甲马文化图鉴'), shot('p13', 'Page 13', '数字福印')],
  },
  {
    cn: '我的', en: 'Mine · 旅程', note: '我的与旅程详情。',
    shots: [shot('p14', 'Page 14', '我的'), shot('p15', 'Page 15', '旅程详情')],
  },
]

const ar: Shot[] = [shot('ar02', 'AR-02', '点位详情'), shot('ar03', 'AR-03', '扫描识别'), shot('ar04', 'AR-04', 'AR 现场体验')]
const face: Shot[] = [shot('face01', 'Face-01', '甲马上脸'), shot('face02', 'Face-02', '纹样选择'), shot('face03', 'Face-03', '纹样组合')]
const splash: Shot[] = [shot('k0', '开1', '护佑'), shot('k1', '开1-1', '健康'), shot('k2', '开1-2', '行路'), shot('k3', '开1-3', '发财')]

const all: Shot[] = [...groups.flatMap((g) => g.shots), ...ar, ...face, ...splash]
const images: MediaImage[] = all.map((s) => ({ type: 'image', src: `/xizhou/${s.id}.jpg`, alt: `${s.n} ${s.t}` }))
const indexOf = (id: string) => all.findIndex((s) => s.id === id)

const jiama = [
  { k: '导向', v: '路神 · 桥神' }, { k: '安全', v: '水火车神' }, { k: '健康', v: '药神' }, { k: '社区文化', v: '本主神' },
]
const swatches = [
  { n: '苍山绿', c: '#9bb86a' }, { n: '甲马黑', c: '#17211a' }, { n: '朱砂红', c: '#d9301f' }, { n: '暖橙', c: '#f0a63e' },
]

function Phone({ s, open, eager = false }: { s: Shot; open: (i: number) => void; eager?: boolean }) {
  return (
    <motion.figure {...fade} className="min-w-0">
      <button type="button" className="xz-shot" data-cursor="ZOOM" aria-label={`放大查看：${s.n} ${s.t}`} onClick={() => open(indexOf(s.id))}>
        <img className="xz-phone" src={`/xizhou/${s.id}.jpg`} alt={`${s.n} ${s.t}`} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </button>
      <figcaption className="mt-3">
        <p className="inline-block rounded-full bg-[var(--xz-deep)] px-2.5 py-0.5 font-display text-[11px] tracking-widest text-[var(--xz-cream)]">{s.n}</p>
        <p className="mt-1.5 text-sm font-bold">{s.t}</p>
      </figcaption>
    </motion.figure>
  )
}

const intro =
  '喜洲不缺文化资源，缺的是把文化和公共服务放进同一套系统。本项目是本科毕业设计「甲马新语」：以白族甲马的功能语义（出行、安全、健康、社区）为线索，转译为图标与界面组件，围绕“边走边用”的游客场景，完成喜洲古镇数字文旅公共服务界面，并加入甲马上脸与地图 AR 两个玩法。'

export default function XizhouDetail() {
  useTitle('喜洲古镇 · 甲马新语')
  const [lb, setLb] = useState<number | null>(null)
  const open = useCallback((i: number) => setLb(i), [])

  const me = getProject('xizhou')
  const idx = me ? projects.findIndex((p) => p.slug === me.slug) : 0
  const next = projects[(idx + 1) % projects.length]
  const prev = projects[(idx - 1 + projects.length) % projects.length]

  return (
    <MotionConfig reducedMotion="user">
      <article className="xz-page">
        <header className="bg-paper text-ink">
          <div className="wrap relative py-8 md:py-12">
            <Link to="/projects?c=uxui" className="mb-5 inline-block rounded-full border border-[rgba(37,64,47,.28)] px-4 py-1 font-display text-xs tracking-widest transition-colors hover:bg-[var(--xz-deep)] hover:text-paper">← UXUI</Link>
            <h1 className="xz-serif text-6xl font-black leading-none tracking-tight md:text-[8.5rem]">喜洲古镇</h1>
            <p className="mt-4 text-2xl font-light md:text-5xl">甲马新语 · 数字文旅公共服务设计</p>
            <p className="mt-2 text-lg font-light md:text-3xl">Xizhou Old Town · Bai Jiama × Public Service UI</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="xz-chip xz-chip-live">进行中</span>
              <span className="xz-chip">毕业设计</span>
              <span className="xz-chip">UX / UI</span>
              <span className="xz-chip">AR</span>
            </div>
            <div className="absolute right-4 top-8 text-right text-lg font-light leading-tight md:right-12 md:top-12 md:text-3xl">
              <p>UX</p>
              <p>UI</p>
            </div>
          </div>
        </header>

        <section className="overflow-hidden py-14 md:py-20">
          <div className="wrap grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <motion.div {...fade}>
              <p className="xz-p text-[14px] font-bold leading-7 md:text-[15px] md:leading-8">{intro}</p>
              
            </motion.div>
            <div className="grid grid-cols-3 items-start gap-3 md:gap-5">
              <div className="pt-8"><Phone s={all[indexOf('p02')]} open={open} eager /></div>
              <div><Phone s={all[indexOf('p06b')]} open={open} eager /></div>
              <div className="pt-14"><Phone s={all[indexOf('ar04')]} open={open} eager /></div>
            </div>
          </div>
        </section>

        <Concept />

        <UX />

        <section className="xz-dark py-14 md:py-20">
          <div className="wrap">
            <SectionHead no="03" cn="视觉系统" en="Colour · Type · Jiama" />
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <motion.div {...fade}>
                <h3 className="xz-serif text-xl font-black">配色系统</h3>
                <ul className="mt-4 grid grid-cols-4 gap-3">
                  {swatches.map((s) => (
                    <li key={s.n}><span className="xz-swatch block" style={{ background: s.c, borderColor: '#f7f5e8' }} /><span className="mt-2 block text-center text-xs font-bold">{s.n}</span></li>
                  ))}
                </ul>
                <h3 className="xz-serif mt-10 text-xl font-black">字体规范</h3>
                <p className="xz-serif mt-3 text-3xl font-black">标题 · Noto Serif SC</p>
                <p className="mt-2 text-lg">正文与功能信息 · Noto Sans SC</p>
              </motion.div>
              <motion.div {...fade}>
                <h3 className="xz-serif text-xl font-black">甲马转译：按功能分四类</h3>
                <ul className="mt-4 grid grid-cols-2 gap-3">
                  {jiama.map((j) => (
                    <li key={j.k} className="rounded-2xl border border-[#f7f5e8]/20 bg-white/5 p-4"><p className="xz-serif text-2xl font-black text-[var(--xz-orange)]">{j.k}</p><p className="mt-1 text-sm opacity-85">{j.v}</p></li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-6 opacity-75">难点：图标缩到地图尺寸后细节糊成一团，只保留“姿态、冠冕、主要器物”三个特征才可辨认。一级图标与印章插画已绘制，二、三级图标待绘制。</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="wrap py-14 md:py-20">
          <SectionHead no="04" cn="手机界面系统" en="Page 01–15 · 四栏目：首页 / 地图 / 文化 / 我的" />
          {groups.map((g) => (
            <div key={g.cn} className="mt-14">
              <motion.div {...fade} className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="xz-serif text-2xl font-black md:text-3xl">{g.cn}</h3>
                <span className="font-display text-xs tracking-widest opacity-60">{g.en}</span>
                <p className="w-full text-sm opacity-75">{g.note}</p>
              </motion.div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
                {g.shots.map((s) => <Phone key={s.id} s={s} open={open} />)}
              </div>
            </div>
          ))}
        </section>

        <section className="xz-dark py-14 md:py-20">
          <div className="wrap">
            <SectionHead no="05" cn="地图 AR" en="AR-02 – AR-04 · 从地图古建标记进入现场探索" />
            <div className="mt-10 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {ar.flatMap((s, i) => [
                <div key={s.id} className="mx-auto w-full max-w-[260px]"><Phone s={s} open={open} /></div>,
                i < 2 ? <span key={`a${i}`} aria-hidden className="xz-arrow hidden text-center text-3xl md:block">→</span> : null,
              ])}
            </div>
            <motion.p {...fade} className="xz-p mt-8 text-sm leading-7 opacity-90">线稿叠加在真实建筑上，点击热点看结构说明。状态：雏形，识别稳定性尚未验证。</motion.p>
          </div>
        </section>

        <section className="wrap py-14 md:py-20">
          <SectionHead no="06" cn="甲马上脸" en="Face-01 – Face-03 · 拍摄 → 选纹样 → 组合" />
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4 md:gap-8">
            {face.map((s) => <Phone key={s.id} s={s} open={open} />)}
          </div>
          <motion.p {...fade} className="xz-p mt-8 text-sm leading-7">把木刻线条、祥云、火焰纹简化后附着于面部。状态：雏形，甲马上脸的图形尚未绘制，画面中的绿色区域是取景占位；传播效果尚未验证。</motion.p>
        </section>

        <section className="xz-dark py-14 md:py-20">
          <div className="wrap">
            <SectionHead no="07" cn="开屏系列" en="开1 · 喜洲寻迹" />
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
              {splash.map((s) => <Phone key={s.id} s={s} open={open} />)}
            </div>
            <motion.p {...fade} className="xz-p mt-8 text-sm leading-7 opacity-90">开屏页已完成 4 张，用甲马版画的套色质感，对应护佑、健康、行路、发财四个主题。</motion.p>
          </div>
        </section>

        <nav aria-label="项目切换" className="grid border-t border-[rgba(37,64,47,.15)] bg-paper text-ink md:grid-cols-2">
          <Link to={`/projects/${prev.slug}`} className="group border-b border-[rgba(37,64,47,.15)] p-8 transition-colors hover:bg-[var(--xz-deep)] hover:text-paper md:border-b-0 md:border-r">
            <p className="font-display text-[11px] tracking-[0.2em] opacity-70">← PREVIOUS</p>
            <p className="mt-2 text-2xl font-black">{prev.title}</p>
          </Link>
          <Link to={`/projects/${next.slug}`} className="p-8 text-right transition-colors hover:bg-red hover:text-white">
            <p className="font-display text-[11px] tracking-[0.2em] opacity-70">NEXT →</p>
            <p className="mt-2 text-2xl font-black">{next.title}</p>
          </Link>
        </nav>

        <Lightbox images={images} index={lb} onChange={setLb} />
      </article>
    </MotionConfig>
  )
}

