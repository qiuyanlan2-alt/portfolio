import { Reveal, SectionHead, useTitle } from '../components/ui'
import { jobs, sideProjects, type Job } from '../data/site'

function JobBlock({ j, dark }: { j: Job; dark?: boolean }) {
  return (
    <Reveal className={`grid grid-cols-1 gap-4 border-t-2 py-8 md:grid-cols-[13rem_1fr] md:gap-10 ${dark ? 'border-paper/30' : 'border-ink'}`}>
      <p className="font-display text-sm tracking-wide text-red">{j.when}</p>
      <div>
        <h3 className="flex flex-wrap items-center gap-3 text-2xl font-black">
          {j.company}
          <span className="rounded-full border-2 border-red px-3 py-0.5 text-sm font-bold text-red">{j.role}</span>
        </h3>
        <ul className="mt-4 space-y-3">
          {j.points.map((t) => (
            <li key={t} className="relative pl-5 text-sm leading-relaxed opacity-90 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:bg-red md:text-base">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

export default function Experience() {
  useTitle('经历')
  return (
    <>
      <section className="wrap pb-6 pt-12 md:pt-20">
        <Reveal>
          <p className="label">Technical Art / AI Visuals / Visual Design / Interaction Experience</p>
          <h1 className="mt-3 font-display text-6xl leading-none md:text-9xl">
            经历<span className="text-red">.</span>
          </h1>
          <p className="hand mt-2 text-right text-5xl font-black not-italic text-red md:text-8xl">2026</p>
        </Reveal>
      </section>

      <section className="bg-ink py-10 text-paper md:py-16">
        <div className="wrap">
          <SectionHead en="Internship" title="实习经历" no="01" />
          {jobs.map((j) => (
            <JobBlock key={j.company} j={j} dark />
          ))}
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <SectionHead en="Projects" title="项目经历" no="02" />
        {sideProjects.map((j) => (
          <JobBlock key={j.company} j={j} />
        ))}
      </section>
    </>
  )
}
