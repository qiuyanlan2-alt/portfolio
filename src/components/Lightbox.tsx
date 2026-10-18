import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { MediaImage } from '../data/types'

interface Props {
  images: MediaImage[]
  index: number | null
  onChange: (i: number | null) => void
}

export default function Lightbox({ images, index, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const open = index !== null

  const step = useCallback(
    (d: number) => {
      if (index === null) return
      onChange((index + d + images.length) % images.length)
    },
    [index, images.length, onChange],
  )

  useEffect(() => {
    if (!open) return
    const prevFocus = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('keydown', key)
      document.body.style.overflow = overflow
      prevFocus?.focus?.()
    }
  }, [open, onChange, step])

  const img = index !== null ? images[index] : null

  return (
    <AnimatePresence>
      {img && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="图片预览"
          className="fixed inset-0 z-[90] flex flex-col bg-black/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onChange(null)}
        >
          <div className="flex items-center justify-between px-5 py-3 font-display text-xs tracking-widest text-white">
            <span>
              {String((index ?? 0) + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <button
              ref={closeRef}
              type="button"
              className="border border-white px-3 py-1 hover:bg-white hover:text-black"
              onClick={(e) => {
                e.stopPropagation()
                onChange(null)
              }}
            >
              CLOSE ✕
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto px-4 pb-6" onClick={(e) => e.stopPropagation()}>
            <motion.img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className="max-h-full max-w-full object-contain"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
            />
            {images.length > 1 && (
              <>
                <button type="button" aria-label="上一张" onClick={() => step(-1)} className="absolute left-2 top-1/2 h-11 w-11 -translate-y-1/2 border border-white bg-black/50 text-white hover:bg-red">
                  ←
                </button>
                <button type="button" aria-label="下一张" onClick={() => step(1)} className="absolute right-2 top-1/2 h-11 w-11 -translate-y-1/2 border border-white bg-black/50 text-white hover:bg-red">
                  →
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
