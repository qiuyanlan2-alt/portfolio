import { Link } from 'react-router-dom'
import { useTitle } from '../components/ui'

export default function NotFound() {
  useTitle('404')
  return (
    <section className="wrap flex min-h-[70vh] flex-col items-start justify-center py-16">
      <p className="label">Error / 找不到页面</p>
      <h1 className="outline-word mt-2 bg-red px-4 font-display text-[28vw] leading-[0.9] md:text-[18rem]">404</h1>
      <p className="hand mt-4 text-3xl text-red">This frame hasn’t been rendered yet.</p>
      <p className="mt-2 text-mute">你访问的地址不存在，或者作品已被移动。</p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className="btn btn-red">
          回到首页
        </Link>
        <Link to="/projects" className="btn">
          浏览作品
        </Link>
      </div>
    </section>
  )
}
