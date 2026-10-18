import { profile } from '../data/site'

/**
 * Introduction as an admission ticket: notched sides at the perforation,
 * dashed tear line, a stub with the tagline and a barcode.
 * The hard shadow uses drop-shadow so it follows the notches.
 */
export default function TicketIntro({ paragraphs }: { paragraphs: string[] }) {
  const cut = 'calc(100% - var(--stub))'
  const mask = [
    `radial-gradient(circle 15px at 0 ${cut}, #0000 97%, #000) left / 51% 100% no-repeat`,
    `radial-gradient(circle 15px at 100% ${cut}, #0000 97%, #000) right / 51% 100% no-repeat`,
  ].join(',')

  return (
    <div className="ticket-intro [--stub:6.75rem] md:[--stub:7.25rem]" style={{ filter: 'drop-shadow(8px 8px 0 #111)' }}>
      <article
        aria-label="个人介绍"
        className="grain relative overflow-hidden bg-red text-white"
        style={{ WebkitMask: mask, mask }}
      >
        {/* inner stitched border */}
        <span aria-hidden className="pointer-events-none absolute inset-2.5 border border-dashed border-white/35" />

        <div className="relative px-7 pb-7 pt-6 md:px-10 md:pt-8">
          <div className="flex items-center justify-between font-display text-[10px] uppercase tracking-[0.28em] text-white/75">
            <span>Admit one</span>
            <span>No. 2026</span>
          </div>
          <p className="hand mt-3 text-3xl md:text-4xl">Introduction</p>
          <div className="mt-4 space-y-3 text-sm leading-relaxed md:text-base">
            {paragraphs.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>

        {/* tear line */}
        <div aria-hidden className="relative mx-5 border-t-2 border-dashed border-white/80" />

        {/* stub */}
        <div className="relative flex items-center justify-between gap-5 px-7 md:px-10" style={{ height: 'var(--stub)' }}>
          <p className="max-w-[24rem] text-sm font-bold leading-snug md:text-base">{profile.tagline}</p>
          <div aria-hidden className="shrink-0 text-right">
            <div
              className="ml-auto h-10 w-24 md:h-12 md:w-32"
              style={{
                background:
                  'repeating-linear-gradient(90deg,#fff 0 2px,transparent 2px 4px,#fff 4px 5px,transparent 5px 8px,#fff 8px 11px,transparent 11px 13px,#fff 13px 14px,transparent 14px 18px)',
              }}
            />
            <p className="mt-1 font-display text-[9px] tracking-[0.3em] text-white/80">QYL-2004.11.20</p>
          </div>
        </div>
      </article>
    </div>
  )
}
