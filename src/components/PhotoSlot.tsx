import { useState } from 'react'
import { profile } from '../data/site'

/**
 * Framed personal photo. Reads profile.photo (default /images/profile.jpg).
 * 4:3 crop that favours the face; until the file exists a placeholder shows.
 * Frame: red mat with grain, ink hairline, inner shade, hard shadow, taped corners.
 */
export default function PhotoSlot({ className = '', variant = 'mat' }: { className?: string; variant?: 'mat' | 'journal' }) {
  const [failed, setFailed] = useState(false)

  if (variant === 'journal') return <JournalPhoto className={className} failed={failed} onError={() => setFailed(true)} />


  return (
    <figure className={`relative ${className}`}>
      <div className="frame-grain relative overflow-hidden bg-red p-2.5 shadow-[9px_9px_0_#111] md:p-3.5">
        <div className="relative shadow-[0_0_0_2px_#111]">
          {failed ? (
            <div role="img" aria-label="个人照片占位" className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-1 bg-paper text-center">
              <span className="font-display text-xl tracking-widest text-red">YOUR PHOTO</span>
              <span className="px-3 text-[11px] leading-snug text-mute">
                放入 public{profile.photo}
                <br />
                即可替换
              </span>
            </div>
          ) : (
            <img
              src={profile.photo}
              alt="邱彦岚的个人照片"
              className="aspect-[4/3] w-full object-cover object-[50%_18%] contrast-[1.05] saturate-[1.08]"
              onError={() => setFailed(true)}
            />
          )}
          <span className="pointer-events-none absolute inset-0 shadow-[inset_0_0_22px_rgba(0,0,0,.2)]" aria-hidden />
        </div>
      </div>
      <Tape className="-left-4 -top-2 -rotate-[38deg] md:-left-7" />
      <Tape className="-right-4 -top-2 rotate-[38deg] md:-right-7" />
    </figure>
  )
}

/** Translucent washi tape: striped, torn ends, soft shadow; pinned over a frame corner. */
function Tape({ className = '' }: { className?: string }) {
  const torn =
    'polygon(0 0,3% 12%,0 25%,3% 38%,0 50%,3% 62%,0 75%,3% 88%,0 100%,100% 100%,97% 88%,100% 75%,97% 62%,100% 50%,97% 38%,100% 25%,97% 12%,100% 0)'
  return (
    <span aria-hidden className={`pointer-events-none absolute z-10 drop-shadow-[0_3px_2px_rgba(0,0,0,.35)] ${className}`}>
      <span
        className="block h-8 w-24 md:h-9 md:w-28"
        style={{
          clipPath: torn,
          background: 'repeating-linear-gradient(135deg, rgba(255,255,255,.34) 0 7px, rgba(255,255,255,.08) 7px 14px), rgba(224,34,45,.72)',
        }}
      />
    </span>
  )
}

/** Hero variant: white print with a hard black offset, one strip of tape, a red sticker dot and a spinning role badge. Same 4:3 size as the mat frame. */
function JournalPhoto({ className, failed, onError }: { className: string; failed: boolean; onError: () => void }) {
  return (
    <figure className={`journal-photo relative ${className}`}>
      <span aria-hidden className="journal-block" />
      <div className="journal-print">
        {failed ? (
          <div role="img" aria-label="个人照片占位" className="flex aspect-[4/3] w-full items-center justify-center bg-paper font-display text-xl tracking-widest text-red">
            YOUR PHOTO
          </div>
        ) : (
          <img src={profile.photo} alt="邱彦岚的个人照片" className="aspect-[4/3] w-full object-cover object-[50%_18%] contrast-[1.05] saturate-[1.08]" onError={onError} />
        )}
      </div>
      <span aria-hidden className="journal-tape" />
      <span aria-hidden className="journal-dot" />
      <svg aria-hidden viewBox="0 0 120 120" className="journal-badge">
        <defs>
          <path id="badge-ring" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#e0222d" />
        <text className="badge-text">
          <textPath href="#badge-ring" startOffset="0">TECHNICAL ARTIST ✦ UXUI ✦ 2027 ✦</textPath>
        </text>
        <path d="M60 44 l4.2 11.8 L76 60 l-11.8 4.2 L60 76 l-4.2-11.8 L44 60 l11.8-4.2Z" fill="#fff" />
      </svg>
    </figure>
  )
}