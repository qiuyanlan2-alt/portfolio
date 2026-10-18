/* Drifting rose petals (pure CSS, GPU-friendly). */
const petals = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37 + 8) % 100,
  size: 10 + ((i * 7) % 14),
  dur: 11 + ((i * 5) % 9),
  delay: -((i * 3.1) % 14),
  sway: 30 + ((i * 11) % 60),
  hue: i % 3,
}))

export default function Petals({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {petals.map((p, i) => (
        <span
          key={i}
          className={`rose-petal rose-petal-${p.hue}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.25,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            ['--sway' as string]: `${p.sway}px`,
          }}
        />
      ))}
    </div>
  )
}
