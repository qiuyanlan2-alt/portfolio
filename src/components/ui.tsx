import { useEffect, type ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · 邱彦岚` : '邱彦岚 · 技术美术 / 视觉设计'
  }, [title])
}

export function Reveal({
  children,
  delay = 0,
  y = 36,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function SectionHead({ no, en, title, className = '' }: { no?: string; en: string; title: string; className?: string }) {
  return (
    <Reveal className={`mb-10 flex items-end justify-between gap-6 border-b-2 border-current pb-4 ${className}`}>
      <div>
        <p className="label">{en}</p>
        <h2 className="mt-2 font-display text-4xl leading-none md:text-6xl">{title}</h2>
      </div>
      {no && <span className="font-display text-5xl leading-none text-red md:text-7xl">{no}</span>}
    </Reveal>
  )
}
