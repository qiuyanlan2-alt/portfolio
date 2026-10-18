import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Snow from '../components/Snow'
import { useTitle } from '../components/ui'
import { getProject, projects } from '../data/projects'
import VideoModal from './rose/VideoModal'
import './kora.css'

const img = (name: string) => `/kora/${name}`
const fade = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-70px' }, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } }

const logos = [
  { src: 'k-logo-sketch.png', cn: '手绘草稿', en: 'Line Draft Setting', alt: 'KORA 404 标志手绘草稿：云纹与菱形' },
  { src: 'k-logo-vector.png', cn: '矢量细化', en: 'Vector image', alt: 'KORA 404 标志矢量细化稿' },
  { src: 'k-logo-final.png', cn: 'AI渲染', en: 'Final symbol', alt: 'KORA 404 标志 AI 渲染成品：金属质感' },
]

const roles = [
  { src: 'k-role1.png', ghost: 'LANGKAR', name: 'LANGKAR', note: '南境游牧人', alt: 'LANGKAR 三视图：背负氧气罐、持长矛的游牧战士' },
  { src: 'k-role2.png', ghost: 'DRUKPA', name: 'DRUKPA', note: '机械祭祀', alt: 'DRUKPA 三视图：头戴金环、手持转经杖的机械祭祀' },
  { src: 'k-role3.png', ghost: 'LODEN', name: 'LODEN', note: '数据僧侣', alt: 'LODEN 三视图：背负数据面板的僧侣' },
]

/** Gold display heading for sections that have no supplied title artwork (matches the supplied Worldview / Font lettering). */
function GoldTitle({ first, rest }: { first: string; rest: string }) {
  return (
    <h2 className="kora-gold-title" aria-label={first + rest}>
      <span aria-hidden className="kora-gold-first">{first}</span>
      <span aria-hidden className="kora-gold-rest">{rest}</span>
    </h2>
  )
}

export default function KoraDetail() {
  useTitle('KORA 404')
  const reduce = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const close = useCallback(() => setPlaying(false), [])

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%'])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.02, reduce ? 1.02 : 1.12])

  const pageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: pageP } = useScroll({ target: pageRef, offset: ['start end', 'end start'] })
  const skelY = useTransform(pageP, [0, 1], ['-4%', reduce ? '-4%' : '8%'])

  const me = getProject('kora-404')
  const idx = me ? projects.findIndex((p) => p.slug === me.slug) : 0
  const next = projects[(idx + 1) % projects.length]
  const prev = projects[(idx - 1 + projects.length) % projects.length]

  return (
    <main className="kora-page"><Snow />
      <header className="kora-head">
        <div className="wrap">
          <Link to="/projects?c=game" className="kora-back">← 游戏企划</Link>
          <div className="kora-head-grid">
            <div>
              <h1 className="kora-h1">KORA 404</h1>
              <p className="kora-sub">Future Nagou Tribe Civilization</p>
              <nav aria-label="KORA 404 章节" className="kora-chapters">
                <a href="#world">WORLDVIEW</a> / <a href="#identity">IDENTITY</a> / <a href="#role">ROLE</a>
              </nav>
            </div>
            <div className="kora-head-side">
              <p>游戏企划<br />概念设计</p>
              <p className="kora-tag">#在校</p>
            </div>
          </div>
        </div>
      </header>

      <section ref={heroRef} className="kora-hero" aria-label="KORA 404 主视觉">
        <motion.img src={img('k-hero.jpg')} alt="KORA 404 主视觉：雪山机械城市与牦牛旁的远行者" fetchPriority="high" style={{ y: heroY, scale: heroScale }} />
        <span aria-hidden className="kora-hero-shine" />
      </section>

      <section className="kora-frame-section" aria-label="KORA 404 预告片">
        <motion.div {...fade} className="kora-frame-wrap">
          <button type="button" className="kora-frame-btn" onClick={() => setPlaying(true)} data-cursor="PLAY" aria-label="播放 KORA 404 预告片">
            <img src={img('k-frame.png')} alt="金色边框中的 KORA 404 预告片画面：转经筒与发光符文" loading="lazy" />
            <span className="kora-play" aria-hidden>
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </button>
        </motion.div>
      </section>

      <div ref={pageRef} className="kora-dark">
        <motion.img aria-hidden src={img('k-skeleton.png')} alt="" className="kora-skeleton" style={{ y: skelY }} />
        <img aria-hidden src={img('k-swirl.png')} alt="" className="kora-swirl" />

        <section id="world" className="kora-block">
          <motion.div {...fade} className="kora-title-row">
            <img src={img('k-title-world.png')} alt="Worldview" className="kora-title-world" loading="lazy" />
            <i />
          </motion.div>
          <motion.div {...fade} className="kora-copy">
            <p>在未来的纳苟文明，雪山既是能源，也是神谕与城市的核心。人们用金属保存仪式，用机械延续部落，用一枚枚发光的符号确认自己仍然属于这片高地。</p>
            <p>我从世界观出发，把“机械与部落共生”的设定转译为视觉识别、字体、角色与周边系统，让一个尚未被讲完的文明拥有自己的语言。</p>
          </motion.div>

          <div id="identity" className="kora-logos">
            {logos.map((l, i) => (
              <motion.figure key={l.cn} {...fade} transition={{ ...fade.transition, delay: i * 0.12 }} className="kora-logo">
                <div className="kora-logo-art"><img src={img(l.src)} alt={l.alt} loading="lazy" /></div>
                <figcaption><strong>{l.cn}</strong><span>{l.en}</span></figcaption>
              </motion.figure>
            ))}
          </div>

          <motion.figure {...fade} className="kora-symbols">
            <img src={img('k-symbols.png')} alt="六组文明符号及其金属徽章：神庙、流浪舰队、数据经书、能量脉冲、气压装置、核心旗" loading="lazy" />
          </motion.figure>
        </section>

        <section id="font" className="kora-block">
          <motion.div {...fade} className="kora-title-row">
            <img src={img('k-title-font.png')} alt="Font" className="kora-title-font" loading="lazy" />
            <i />
          </motion.div>
          <motion.p {...fade} className="kora-copy kora-copy-one">把部落纹样嵌入金属字形，让文字也成为这个世界里的遗物。每个字母上下延伸出的细长纹饰，让整套字母与数字像是从神庙梁柱上刻下来的。</motion.p>
          <motion.div {...fade} className="kora-letters">
            <img src={img('k-letters.png')} alt="KORA 404 定制金属字体：A 到 Z 与数字 0 到 10" loading="lazy" />
            <span aria-hidden className="kora-letters-shine" />
          </motion.div>
        </section>

        <section id="role" className="kora-block">
          <motion.div {...fade} className="kora-title-row">
            <GoldTitle first="R" rest="ole" />
            <i />
          </motion.div>
          <div className="kora-roles">
            {roles.map((r) => (
              <motion.figure key={r.name} {...fade} className="kora-role">
                <span aria-hidden className="kora-ghost">{r.ghost}</span>
                <img src={img(r.src)} alt={r.alt} loading="lazy" />
                <figcaption><b>{r.name}</b><span>{r.note}</span></figcaption>
              </motion.figure>
            ))}
          </div>
        </section>
      </div>

      <nav aria-label="项目切换" className="kora-next">
        <Link to={`/projects/${prev.slug}`}><small>← PREVIOUS</small><b>{prev.title}</b></Link>
        <Link to={`/projects/${next.slug}`}><small>NEXT →</small><b>{next.title}</b></Link>
      </nav>

      <VideoModal open={playing} src={img('k-trailer.mp4')} poster={img('k-hero.jpg')} label="KORA 404 预告片" aspect="" onClose={close} />
    </main>
  )
}
