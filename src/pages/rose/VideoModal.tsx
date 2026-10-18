import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/** Dialog that plays the final MP4. Click or Esc closes it. */
export default function VideoModal({
  open,
  src,
  poster,
  onClose,
  label = '玫瑰升级 MP4',
  aspect = 'aspect-[9/16]',
}: {
  open: boolean
  src: string
  poster: string
  onClose: () => void
  label?: string
  /** Tailwind aspect class; pass '' to size the dialog to the video itself. */
  aspect?: string
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const key = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('keydown', key)
      document.body.style.overflow = overflow
      prev?.focus?.()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#12081f]/92 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            className="absolute right-4 top-4 border border-white/70 px-3 py-1 font-display text-xs tracking-widest text-white hover:bg-white hover:text-black"
            onClick={onClose}
          >
            CLOSE ✕
          </button>
          <motion.div
            className={`relative max-h-[88vh] ${aspect} overflow-hidden rounded-[28px] border-2 border-white/30 bg-black shadow-[0_0_80px_rgba(244,167,189,.35)]`}
            initial={{ scale: 0.92, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <video src={src} poster={poster} controls autoPlay playsInline className={aspect ? 'h-full w-full object-contain' : 'max-h-[88vh] max-w-[92vw]'} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
