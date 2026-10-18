import { Link } from 'react-router-dom'
import Cover from '../components/Cover'
import TicketIntro from '../components/TicketIntro'
import PhotoSlot from '../components/PhotoSlot'
import { Reveal, useTitle } from '../components/ui'
import { intro, profile } from '../data/site'

export default function Home() {
  useTitle()

  return (
    <>
      {/* The home page is the flip calendar only: cover, introduction, practice. */}
      <Cover introduction={
        <section className="calendar-intro">
          <div className="calendar-page-meta"><span>01 / INTRODUCTION</span><span>QYL · 2025—2026</span></div>
          <div className="calendar-intro-grid">
            <div>
              <p className="label">Hi! / 很高兴认识你</p>
              <h2 className="calendar-name">我叫<br /><span className="hand text-red">{profile.nameCn}</span></h2>
              <p className="hand mt-6 text-2xl text-ink/80">Technical Artist × UXUI</p>
              <p className="calendar-note">保持好奇，跨越边界。<br />让想象成为真实的体验。</p>
            </div>
            <TicketIntro paragraphs={intro} />
          </div>
          <div className="calendar-page-footer"><span>VISUAL DESIGN / INTERACTION / TECHNICAL ART</span><span>始于好奇，生于创造</span></div>
        </section>
      } disciplines={
      <section className="hero-journal calendar-disciplines relative overflow-hidden">
        <div className="calendar-page-meta"><span>02 / CREATIVE PRACTICE</span><span>QYL · 2025—2026</span></div>
        <div className="wrap grid grid-cols-1 items-center gap-14 py-14 md:grid-cols-[1.5fr_1fr] md:py-24">
          <Reveal>
            <p className="hero-kicker">
              <i aria-hidden /> {profile.role}
            </p>
            <h2 className="hero-title">
              {['Technical Art', 'AI Visuals', 'Visual Design', 'Interaction Experience'].map((t, i, a) => (
                <span key={t} className="block">
                  {t}
                  {i < a.length - 1 && <em aria-hidden> /</em>}
                </span>
              ))}
            </h2>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link to="/projects" className="hero-cta" data-cursor="GO">
                <span>浏览作品集</span>
                <b aria-hidden>→</b>
              </Link>
              <Link to="/about" className="hero-link">
                关于我
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="justify-self-center md:justify-self-end">
            <div className="relative w-64 md:w-80">
              <PhotoSlot variant="journal" />
            </div>
          </Reveal>
        </div>
        <div className="calendar-page-footer"><span>END OF INTRODUCTION / 接下来，让作品说话</span><span>02 / 02</span></div>
      </section>
      } />
    </>
  )
}
