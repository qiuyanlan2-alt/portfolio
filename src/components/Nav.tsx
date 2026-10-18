import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { nav, profile } from '../data/site'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const [lastPath, setLastPath] = useState(pathname)
  // Close the mobile sheet whenever the route changes.
  if (lastPath !== pathname) {
    setLastPath(pathname)
    if (open) setOpen(false)
  }

  const link = ({ isActive }: { isActive: boolean }) =>
    `relative py-1 text-sm font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:bg-red after:transition-all after:duration-300 ${
      isActive ? 'text-red after:w-full' : 'text-ink after:w-0 hover:after:w-full'
    }`

  return (
    <header className="site-nav fixed inset-x-0 top-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur">
      <div className="wrap flex h-14 items-center justify-between">
        <Link to="/" className="font-display text-lg leading-none tracking-tight" aria-label="邱彦岚 首页">
          QYL<span className="text-red">.</span>
          <span className="ml-2 hidden text-[10px] tracking-[0.2em] text-mute sm:inline">{profile.years}</span>
        </Link>

        <nav aria-label="主导航" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} end={n.to === '/'} className={link}>
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-[2px] w-6 bg-ink transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-[2px] w-6 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-[2px] w-6 bg-ink transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[65] bg-red pt-20 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav aria-label="移动端导航" className="wrap">
              <ul>
                {nav.map((n, i) => (
                  <motion.li
                    key={n.to}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.15 + i * 0.05 } }}
                    className="border-b border-paper/40"
                  >
                    <NavLink to={n.to} end={n.to === '/'} className="flex items-baseline justify-between py-4 text-paper">
                      <span className="font-display text-4xl">{n.en}</span>
                      <span className="text-sm">{n.label}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
