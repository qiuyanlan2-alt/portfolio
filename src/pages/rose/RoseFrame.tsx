/**
 * Rose-gold picture frame for the hero video: brushed slab with bevel, raised step,
 * soft inner lip and glass, plus the engraved plaque. Styles live in rose.css.
 */
export default function RoseFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rose-frame">
      <span aria-hidden className="rose-frame-glow" />
      <span aria-hidden className="rose-frame-slab" />
      <span aria-hidden className="rose-sheen" />
      <span aria-hidden className="rose-frame-step" />
      <span aria-hidden className="rose-frame-groove" />

      <div className="rose-frame-glass">{children}</div>

      <span aria-hidden className="rose-plaque">
        ROSE UPGRADE · MP4
      </span>
    </div>
  )
}
