import { useState } from 'react'
import { Link } from 'react-router-dom'
import PhotoSlot from '../components/PhotoSlot'
import { Reveal, SectionHead, useTitle } from '../components/ui'
import { honors, intro, jobs, profile, skills } from '../data/site'

const phoneIco = <svg viewBox="0 0 24 24"><path d="M6.6 3h3l1.4 4.2-2 1.4a11 11 0 0 0 5.4 5.4l1.4-2L20 13.4v3A2.6 2.6 0 0 1 17.4 19C9.5 19 5 14.5 5 6.6A2.6 2.6 0 0 1 6.6 3Z" /></svg>
const mailIco = <svg viewBox="0 0 24 24"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Zm2 .8v.4l7 5 7-5v-.4l-7 5-7-5Z" /></svg>
const wechatIco = <svg viewBox="0 0 24 24"><path d="M9.5 4C5.9 4 3 6.4 3 9.4c0 1.7.9 3.2 2.4 4.2L4.8 16l2.6-1.3c.7.2 1.4.3 2.1.3h.4a5 5 0 0 1-.3-1.7c0-3 2.8-5.3 6.2-5.3h.4C15.6 5.6 12.8 4 9.5 4Zm8.1 6.2c-2.8 0-5.1 1.9-5.1 4.3s2.3 4.3 5.1 4.3c.6 0 1.1-.1 1.7-.3l2 1-.5-1.9c1.1-.8 1.8-1.9 1.8-3.1 0-2.4-2.2-4.3-5-4.3Z" /></svg>

type Contact = { key: string; label: string; main: string; sub: string; tone: 'red' | 'ink' | 'paper'; icon: React.ReactNode; href?: string; copy?: boolean; external?: boolean }

/** One chip: link, mailto, tel, or click-to-copy (WeChat ids cannot be opened as links). */
function ContactChip({ c }: { c: Contact }) {
  const [done, setDone] = useState(false)
  const inner = (
    <>
      <i className="about-ico" aria-hidden>{c.icon}</i>
      <span><b>{c.main}</b><small>{c.copy && done ? '已复制 ✓' : c.sub}</small></span>
      <em aria-hidden className="about-arrow">{c.copy ? '⧉' : '↗'}</em>
    </>
  )
  const cls = `about-chip tone-${c.tone}`
  if (c.copy) {
    const copy = () => navigator.clipboard?.writeText(c.main).then(() => { setDone(true); window.setTimeout(() => setDone(false), 1600) })
    return <button type="button" onClick={copy} data-cursor="COPY" className={`${cls} text-left`} aria-label={`复制微信号 ${c.main}`}>{inner}</button>
  }
  return <a href={c.href} data-cursor="GO" className={cls} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
}
const contacts: Contact[] = [
  { key: 'tel', label: '这是我的电话', main: profile.phone, sub: 'TEL · 点击拨打', tone: 'red', icon: phoneIco, href: `tel:${profile.phone}` },
  { key: 'wechat', label: '这是我的微信', main: profile.wechat, sub: 'WECHAT · 点击复制', tone: 'ink', icon: wechatIco, copy: true },
  { key: 'mail', label: '这是我的邮箱', main: profile.email, sub: 'MAIL · 点击发送', tone: 'paper', icon: mailIco, href: `mailto:${profile.email}` },
  { key: 'gh', label: '这是我的Github', main: profile.githubName, sub: profile.github.replace('https://', ''), tone: 'red', icon: 'GH', href: profile.github, external: true },
]
export default function About() {
  useTitle('关于')
  return (
    <>
      {/* HI + INTRODUCTION */}
      <section className="wrap grid grid-cols-1 gap-12 pb-16 pt-10 md:grid-cols-[1.25fr_1fr] md:pt-16">
        <Reveal className="relative min-w-0">
          <div className="relative">
            <h1 className="text-4xl italic leading-tight md:text-6xl">
              Hi!我叫 <span className="text-5xl font-black md:text-7xl">{profile.nameCn}</span>
            </h1>
            <img src="/about/doodle.png" alt="" aria-hidden className="about-doodle absolute right-0 -top-8 hidden w-32 md:block lg:w-40" />
          </div>

          <div className="about-stack mt-12 md:mt-16">
            {contacts.map((c, i) => (
              <div key={c.key} className="about-row" style={{ ['--i' as string]: i }}>
                <span className="about-no" aria-hidden>0{i + 1}</span>
                <p className="about-label">{c.label}</p>
                <ContactChip c={c} />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <div
            className="h-3 bg-red"
            style={{ WebkitMask: 'radial-gradient(circle at 50% 0, transparent 5px, #000 5.5px) 0 0/14px 100% repeat-x', mask: 'radial-gradient(circle at 50% 0, transparent 5px, #000 5.5px) 0 0/14px 100% repeat-x' }}
            aria-hidden
          />
          <div className="ticket-wrap">
          <div className="ticket-paper">
            <p className="ticket-meta"><span>ADMIT ONE</span><span>NO. 2026</span></p>
            <h2 className="text-center">
              <img src="/about/introduction.png" alt="INTRODUCTION" className="mx-auto w-56 md:w-72" />
            </h2>
            <div className="mt-4 space-y-3 text-[13px] leading-relaxed">
              {intro.map((t) => (
                <p key={t}>{t}</p>
              ))}
              <p className="font-bold">
                对我而言，设计始于好奇，生于创造，
                <br />
                最终抵达真实的世界。
              </p>
            </div>
            <div className="ticket-stub">
              <img src="/about/tagline.png" alt="Technical Artist × UXUI" className="w-64 md:w-80" />
            </div>
          </div>
          </div>
          <div className="mt-8 flex items-end justify-center gap-3">
            <img src="/about/wechat-qr.png" alt="微信二维码：OXYGEN" loading="lazy" className="about-qr w-28 md:w-36" />
            <img src="/about/contact-me.png" alt="← 联系我" loading="lazy" className="mb-3 w-24 md:w-28" />
          </div>
        </Reveal>
      </section>

      {/* INTERNSHIP + SIDE PANEL */}
      <section className="wrap pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.9fr_1fr]">
          <Reveal className="min-w-0" >
            <div className="flex items-end" style={{ containerType: 'inline-size' }}>
              <div className="h-7 w-16 shrink-0 bg-red sm:w-52 md:h-10 md:w-72" aria-hidden />
              <p className="ml-3 min-w-0 whitespace-nowrap pb-1" style={{ fontSize: 'clamp(8px, 1.7cqw, 16px)' }}>Technical Art / AI Visuals / Visual Design / Interaction Experience</p>
            </div>
            <div className="relative bg-ink pb-8 text-paper">
              <h2 className="inline-block w-52 bg-paper py-3 pl-5 text-4xl font-black text-ink md:w-72 md:pl-8 md:text-5xl">实习经历</h2>
              <img src="/about/scribble.png" alt="" aria-hidden className="absolute right-6 top-3 w-28 md:right-10 md:top-4 md:w-36" />
              <div className="p-6 pt-8 md:p-10 md:pt-9">
              {jobs.map((j, i) => (
                <div key={j.company}>
                  {i > 0 && <div className="my-6 h-1.5 -rotate-[1deg] bg-red" aria-hidden />}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="text-base font-bold text-red md:text-lg">{j.company}</span>
                    <span className="rounded-full border-2 border-red px-4 py-0.5 text-base font-bold text-red">{j.role}</span>
                    <span className="text-base italic md:ml-auto">{j.when.replace(/ /g, ' ')}</span>
                  </div>
                  <ul className="mt-4 space-y-4 text-[15px] leading-7 text-paper/85 md:text-base md:leading-8">
                    {j.points.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0 lg:-mt-6">
            <p className="-skew-x-6 text-right font-display text-7xl italic leading-none text-ink md:text-8xl" style={{ textShadow: '4px 4px 0 #e0222d' }}>
              2026
            </p>
            <div className="mx-auto mt-16 w-60 rotate-[2deg] md:w-72">
              <PhotoSlot />
            </div>
            <div className="about-id mx-auto mt-5 w-60 md:w-72">
              <p className="about-id-date">{profile.schoolTerm.replace(' - ', ' — ')}</p>
              <div className="about-id-school">
                <b>{profile.schoolShort}</b>
                <span>{profile.major}</span>
                <small>GUANGXI NORMAL UNIVERSITY</small>
              </div>
              <p className="about-id-name">{profile.nameEn.toUpperCase()}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y-2 border-ink bg-red py-16 text-white md:py-24">
        <div className="wrap">
          <SectionHead en="Skills" title="技能" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {skills.map((s) => (
              <Reveal key={s.group}>
                <h3 className="mb-3 text-sm font-bold opacity-80">{s.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((i) => (
                    <li key={i} className="border-2 border-white px-3 py-1 text-sm transition-colors hover:bg-white hover:text-red">
                      {i}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <SectionHead en="Honors" title="竞赛荣誉" />
        <ul>
          {honors.map((h) => (
            <Reveal key={h.text} className="grid grid-cols-[5.5rem_1fr_auto] items-baseline gap-3 border-b border-ink/20 py-4">
              <span className="font-display text-sm text-red">{h.year}</span>
              <span className="font-medium">{h.text}</span>
              <span className="text-sm font-bold">{h.prize}</span>
            </Reveal>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/experience" className="btn">
            完整经历 →
          </Link>
          <Link to="/contact" className="btn btn-red">
            联系我
          </Link>
        </div>
      </section>
    </>
  )
}
