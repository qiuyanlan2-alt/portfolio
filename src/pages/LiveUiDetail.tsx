import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTitle } from '../components/ui'
import { getProject, projects } from '../data/projects'
import VideoModal from './rose/VideoModal'
import './liveui.css'

const flow = [
  { cn: '主播定制', en: 'Customized Design' },
  { cn: '头像框', en: 'Avatar Frame' },
  { cn: '角色融合', en: 'Character Integration' },
  { cn: '直播视觉资产', en: 'Live Visual Asset' },
  { cn: '需求转译', en: 'Brief to Visual' },
]

const brief =
  '为主播 1v1 互动场景定制头像、对话气泡与个人主页，将主播形象和装饰语言转化为一套具有游戏 UI 属性的直播视觉资产。'

const transcript =
  '我们设计那个头条框，就是我画圆圈儿的地方，你就给我放上那个月亮，然后那个把那个就是美少女战士拉大一点点，可以吧。然后底下是海水，就是那个翻涌的那个海水，然后是那个地方，就是我标注星星那个地方，你给我整点儿那个碎的那种星星。'

/** Same bracket idea as the Rose page: one component for both corners keeps size and weight identical. */
function Bracket({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute block ${className}`}
      style={{ width: '0.5em', height: '0.5em', borderTop: '0.07em solid #fff', borderLeft: '0.07em solid #fff' }}
    />
  )
}

const fade = { initial: { opacity: 0, y: 26 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }

export default function LiveUiDetail() {
  useTitle('定制直播 UI Custom Live UI')
  const [playing, setPlaying] = useState(false)
  const close = useCallback(() => setPlaying(false), [])

  const me = getProject('live-ui')
  const idx = me ? projects.findIndex((p) => p.slug === me.slug) : 0
  const next = projects[(idx + 1) % projects.length]
  const prev = projects[(idx - 1 + projects.length) % projects.length]

  return (
    <article className="live-page">
      <header className="bg-paper text-ink">
        <div className="wrap py-8 md:py-12">
          <Link to="/projects?c=yy" className="mb-5 inline-block border-2 border-ink px-3 py-1 font-display text-xs tracking-widest hover:bg-ink hover:text-paper">
            ← YY LIVE
          </Link>
          <div className="flex items-baseline justify-between gap-6">
            <p className="font-display text-5xl leading-none md:text-8xl">YY LIVE</p>
            <p className="font-display text-4xl leading-none md:text-8xl">UI</p>
          </div>
          <p className="mt-4 text-xl font-medium md:text-4xl">Technical Artist 技术美术</p>
          <p className="mt-1 text-base font-light md:text-3xl">Creative Technology / Visual Effects</p>
        </div>
      </header>

      {/* Hero: moon backdrop, title, phone mock-up straddling the edge */}
      <section className="relative isolate">
        <div className="live-hero-bg absolute inset-x-0 top-0 -z-10 h-[40rem] overflow-hidden rounded-b-[5rem] md:h-[51rem] md:rounded-b-[7rem]">
          <img src="/liveui/bg.jpg" alt="" aria-hidden fetchPriority="high" className="h-full w-full object-cover object-[30%_30%]" />
          <div className="live-hero-shade absolute inset-0" />
          <i aria-hidden className="live-twinkle left-[12%] top-[22%]" />
          <i aria-hidden className="live-twinkle left-[34%] top-[58%] [animation-delay:-1.2s]" />
          <i aria-hidden className="live-twinkle left-[48%] top-[16%] [animation-delay:-2.4s]" />
        </div>

        <div className="wrap relative grid gap-10 pb-20 pt-14 md:grid-cols-[1.1fr_0.9fr] md:pt-20">
          <div>
            <motion.h1 className="relative inline-block py-[0.25em] pl-[0.6em] pr-[0.6em] text-[2.2rem] font-black leading-tight md:text-7xl" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <Bracket className="left-0 top-0" />
              <Bracket className="bottom-0 right-0 rotate-180" />
              定制直播 UI
            </motion.h1>
            <p className="mt-3 text-lg font-black leading-snug md:text-4xl">头像框 · 对话气泡 · 主页视觉系统</p>
            <p className="mt-4 text-sm uppercase tracking-wide text-white/90 md:text-xl">Custom Game UI / Live Interaction</p>

            <div className="mt-[22rem] md:mt-[35rem]"><p className="max-w-xl text-sm leading-7 text-white/90 md:max-w-[46rem] md:text-[1.05rem] md:leading-8">{brief}</p></div>

            {/* The brief as the streamer actually said it */}
            <motion.div {...fade} className="mt-10 max-w-md space-y-2 text-[#222]">
<p className="live-voice" aria-label="语音消息，22 秒">
                <svg aria-hidden viewBox="0 0 24 24" className="live-voice-ico" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path className="v1" d="M6 9.5a4 4 0 0 1 0 5" />
                  <path className="v2" d="M10 6.8a8 8 0 0 1 0 10.4" />
                  <path className="v3" d="M14 4a12 12 0 0 1 0 16" />
                </svg>
                <span>22″</span>
              </p>
              <p className="live-bubble px-4 py-3 text-[15px] leading-7">{transcript}</p>
              <p className="pt-1 text-xs tracking-wide text-white/60">主播的语音需求（转文字）</p>
            </motion.div>
          </div>

          <div className="relative md:-mt-4">
            <p className="text-right font-display text-[7rem] leading-[0.9] md:text-[11rem]">02</p>
            <p className="mt-1 text-right text-xl font-black leading-tight md:text-3xl">
              UI
              <br />
              EFFECT
            </p>
            <motion.figure {...fade} className="live-float mx-auto mt-8 w-[min(78vw,21rem)] md:mt-4 md:w-[125%] md:-ml-[12%]">
              <img src="/liveui/phone.png" alt="直播间最终应用：月亮头像框、海浪飘屏与对话气泡" className="w-full drop-shadow-[0_30px_50px_rgba(0,8,30,.6)]" />
              <figcaption className="mt-3 text-center text-sm text-white/85">最终预览 / Final Preview</figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* Visual direction */}
      <section className="wrap py-20 md:py-28">
        <motion.div {...fade} className="live-titlewrap">
          <span aria-hidden className="live-cap live-cap-l" />
          <div className="live-titlebar">
            <h2 className="text-3xl font-black leading-none md:text-5xl">视觉提取</h2>
            <p className="live-title-ghost mt-1 font-display text-base md:text-2xl">Visual Direction</p>
          </div>
          <span aria-hidden className="live-cap live-cap-r" />
        </motion.div>
        <div aria-hidden className="live-rule" />

        <div className="mt-14 grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <ol className="space-y-1">
            {flow.map((s, i) => (
              <motion.li key={s.en} {...fade} transition={{ ...fade.transition, delay: i * 0.07 }}>
<p className="text-xl font-black md:text-2xl">{s.cn}</p>
                <p className="text-xs uppercase tracking-wide text-white/45 md:text-lg">{s.en}</p>
                {i < flow.length - 1 && <p aria-hidden className="py-1 pl-2 text-white/90">↓</p>}
              </motion.li>
            ))}
          </ol>
          <motion.div {...fade} className="live-moon-stage relative mx-auto w-full max-w-xl">
            <img src="/liveui/moon.png" alt="月牙头像框：美少女战士坐在月牙上" className="live-moon relative w-full" />
            <span aria-hidden className="live-sea" />
            <i aria-hidden className="live-twinkle left-[20%] top-[18%]" />
            <i aria-hidden className="live-twinkle left-[78%] top-[62%] [animation-delay:-1.6s]" />
          </motion.div>
        </div>

        <motion.figure {...fade} className="live-evo mt-16">
          <img src="/liveui/evo-a4.jpg" alt="月牙从素体到加入暖光、角色融合与金色挂饰的四步迭代" loading="lazy" className="mx-auto w-full" />
        </motion.figure>
      </section>

      {/* Final assets */}
      <section className="live-final py-16 md:py-24">
        <div className="wrap">
          <motion.div {...fade}>
            <img src="/liveui/pack.png" alt="最终资产：头像框、昵称飘屏、对话气泡与浮层" loading="lazy" className="mx-auto w-full max-w-5xl" />
          </motion.div>
          <p className="mt-10 text-center text-sm leading-7 text-white/60 md:whitespace-nowrap">
            头像框、两种尺寸的对话气泡与三条不同长度的昵称飘屏共用同一套月亮、翻涌海水与碎星语言，适配不同昵称长度与消息宽度。
          </p>
          <div className="mt-6 text-center">
            <button type="button" onClick={() => setPlaying(true)} data-cursor="PLAY" className="border border-white/70 px-4 py-2 font-display text-xs tracking-widest hover:bg-white hover:text-[#041638]">
              ▶ 动态预览
            </button>
          </div>
          <p className="mt-16 text-center text-sm text-white/85 md:text-base">Final UI / YY LIVE / 2026</p>
        </div>
      </section>

      <nav aria-label="项目切换" className="grid border-t border-white/20 bg-[#02102a] md:grid-cols-2">
        <Link to={`/projects/${prev.slug}`} className="border-b border-white/15 p-8 transition-colors hover:bg-white/10 md:border-b-0 md:border-r">
          <p className="font-display text-[11px] tracking-[0.2em] text-[#7fd6ff]">← PREVIOUS</p>
          <p className="mt-2 text-2xl font-black">{prev.title}</p>
        </Link>
        <Link to={`/projects/${next.slug}`} className="p-8 text-right transition-colors hover:bg-[#3ec8ff] hover:text-[#02102a]">
          <p className="font-display text-[11px] tracking-[0.2em] opacity-80">NEXT →</p>
          <p className="mt-2 text-2xl font-black">{next.title}</p>
        </Link>
      </nav>

      <VideoModal open={playing} src="/videos/live-ui.mp4" poster="/liveui/bg.jpg" label="定制直播 UI 动态预览" aspect="" onClose={close} />
    </article>
  )
}
