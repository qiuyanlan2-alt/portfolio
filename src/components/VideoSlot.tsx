import { useState } from 'react'
import type { MediaVideo } from '../data/types'

/**
 * Video slot. With `src` set it plays the real file; without it, it shows the
 * poster plus a clear "slot" state so the layout is final before the footage is.
 */
export default function VideoSlot({ video, className = '' }: { video: MediaVideo; className?: string }) {
  const [playing, setPlaying] = useState(false)
  const [hint, setHint] = useState(false)

  if (video.src && playing) {
    return (
      <video
        className={`h-full w-full bg-black object-contain ${className}`}
        src={video.src}
        poster={video.poster}
        controls
        autoPlay
        playsInline
        preload="metadata"
        aria-label={video.alt}
      />
    )
  }

  return (
    <div className={`relative h-full w-full overflow-hidden bg-black ${className}`}>
      <img src={video.poster} alt={video.alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
      <button
        type="button"
        data-cursor="PLAY"
        onClick={() => (video.src ? setPlaying(true) : setHint((v) => !v))}
        className="group absolute inset-0 flex items-center justify-center bg-black/25 transition-colors hover:bg-black/10"
        aria-label={video.src ? `播放：${video.alt}` : `视频待接入：${video.alt}`}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-black/30 backdrop-blur transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>
      {!video.src && (
        <span className="absolute left-3 top-3 bg-red px-2 py-1 font-display text-[10px] tracking-widest text-white">VIDEO SLOT</span>
      )}
      {hint && !video.src && (
        <div role="status" className="absolute inset-x-3 bottom-3 bg-paper p-3 text-xs leading-relaxed text-ink">
          视频素材尚未接入。把文件放进 <code>public/videos/</code>，并在 <code>src/data/projects.ts</code> 里填入该项目 video.src 即可。
        </div>
      )}
    </div>
  )
}
