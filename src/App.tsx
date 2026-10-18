import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import KoraDetail from './pages/KoraDetail'

// Home is eager (first paint); the rest are split so the entry bundle stays small.
const About = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const RoseDetail = lazy(() => import('./pages/RoseDetail'))
const LiveUiDetail = lazy(() => import('./pages/LiveUiDetail'))
const LightDetail = lazy(() => import('./pages/LightDetail'))
const ArtDetail = lazy(() => import('./pages/ArtDetail'))
const BeautyDetail = lazy(() => import('./pages/BeautyDetail'))
const XizhouDetail = lazy(() => import('./pages/XizhouDetail'))

const Experience = lazy(() => import('./pages/Experience'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/kora-404" element={<KoraDetail />} />
          <Route path="projects/rose-upgrade" element={<RoseDetail />} />
          <Route path="projects/live-ui" element={<LiveUiDetail />} />
          <Route path="projects/light-within" element={<LightDetail />} />
          <Route path="projects/poems-of-the-sea" element={<ArtDetail />} />
          <Route path="projects/face-sculpting" element={<BeautyDetail />} />
          <Route path="projects/xizhou" element={<XizhouDetail />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />

          <Route path="experience" element={<Experience />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
