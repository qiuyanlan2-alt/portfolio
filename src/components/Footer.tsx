import { Link } from 'react-router-dom'
import { nav, profile } from '../data/site'

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl leading-none md:text-6xl">
            LET’S MAKE
            <br />
            <span className="text-red">SOMETHING.</span>
          </p>
          <a href={`mailto:${profile.email}`} className="mt-6 inline-block border-b-2 border-red pb-1 text-lg">
            {profile.email}
          </a>
        </div>
        <ul className="space-y-2 text-sm">
          {nav.map((n) => (
            <li key={n.to}>
              <Link to={n.to} className="transition-colors hover:text-red">
                {n.label} <span className="text-mute">/ {n.en}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-sm text-mute">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-red">
            GitHub · {profile.githubName}
          </a>
          <p className="mt-3">Tel · {profile.phone}</p>
          <p className="mt-3">WeChat · {profile.wechat}</p>
          <p className="mt-3">
            {profile.nameCn} · {profile.nameEn} · {profile.birthday}
          </p>
        </div>
      </div>
    </footer>
  )
}
