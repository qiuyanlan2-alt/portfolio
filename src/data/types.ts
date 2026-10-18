export type MediaImage = { type: 'image'; src: string; alt: string }
/** Video slot. Leave `src` empty to show the poster with a "video slot" badge. */
export type MediaVideo = { type: 'video'; src: string; poster: string; alt: string }
export type Media = MediaImage | MediaVideo

export type CategoryId = 'yy' | 'game' | 'uxui' | 'art'

export interface Category {
  id: CategoryId
  label: string
  en: string
}

export interface ProcessStep {
  title: string
  en: string
  body: string
}

export interface Project {
  slug: string
  no: string
  title: string
  en: string
  category: CategoryId
  year: string
  role: string
  tools: string[]
  summary: string
  accent: string // hex, used for hover wash + detail page highlight
  cover: MediaImage
  /** Optional video. Drop the file in public/videos and set `src`. */
  video?: MediaVideo
  process: ProcessStep[]
  /** Highlights shown as large numerals / facts. */
  facts: { k: string; v: string }[]
  /** Full-length sheets, stacked seamlessly in the "long view". */
  sheets: MediaImage[]
  /** Extra curated images shown in a grid (optional). */
  extras?: MediaImage[]
}
