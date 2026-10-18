import { motion } from 'framer-motion'

export const fade = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }

export function SectionHead({ no, cn, en }: { no: string; cn: string; en: string }) {
  return (
    <motion.div {...fade}>
      <div className="flex items-end gap-5">
        <span className="xz-no text-5xl md:text-7xl">{no}</span>
        <div className="pb-1">
          <h2 className="xz-serif text-2xl font-black md:text-4xl">{cn}</h2>
          <p className="mt-1 text-sm opacity-70 md:text-lg">{en}</p>
        </div>
      </div>
      <div className="xz-rule mt-6" />
    </motion.div>
  )
}

/** Small sub-heading used inside a section: red index + serif title + optional gloss. */
export function SubHead({ k, cn, en }: { k: string; cn: string; en?: string }) {
  return (
    <motion.div {...fade} className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="xz-no text-lg">{k}</span>
      <h3 className="xz-serif text-xl font-black md:text-3xl">{cn}</h3>
      {en && <span className="font-display text-[11px] tracking-widest opacity-60">{en}</span>}
    </motion.div>
  )
}
