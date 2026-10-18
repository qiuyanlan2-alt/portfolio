import { motion } from 'framer-motion'
import { fade, SubHead } from './shared'

const questions = [
  { n: '①', t: 'Persona', a: '设计给谁。' },
  { n: '②', t: '用户旅程图', a: '用户哪里痛。' },
  { n: '③', t: '文化触点 + IA', a: '如何解决，并形成系统。' },
]

const segments = [
  { n: '01', t: '普通游客', tag: '核心用户', traits: ['首次到访古镇', '游玩时间有限', '依赖手机获取信息', '希望高效体验当地特色文化'], needs: ['快速了解游览方式', '智能规划路线', '获取文化讲解', '查询公共服务设施'] },
  { n: '02', t: '老年游客', tag: '重点用户', traits: ['对传统文化兴趣浓厚', '数字设备操作能力较弱', '更偏好语音交流'], needs: ['大字体、简洁界面', 'AI 语音导览', '简单易操作的交互流程', '清晰的路线指引'] },
  { n: '03', t: '亲子家庭', tag: '重点用户', traits: ['更关注儿童安全', '希望兼顾学习与娱乐', '更愿意体验互动内容'], needs: ['AI 推荐亲子游览路线', '趣味文化互动', '母婴服务查询', '儿童友好景点推荐'] },
  { n: '04', t: '行动不便游客', tag: '', traits: ['对空间可达性要求较高', '更关注无障碍设施'], needs: ['无障碍路线规划', '服务设施定位', '路况提示', 'AI 语音导航'] },
]

const personas = [
  {
    n: '01', glyph: '陈', name: '陈晓雨', role: '年轻游客', color: '#f0a63e',
    bg: '25 岁，互联网行业从业者，第一次来到喜洲古镇旅游。', sc: '下午只有 3 小时，希望快速体验当地文化，不想花太多时间查攻略。', goal: '快速规划一条适合自己的游览路线，并深入了解白族甲马文化。',
    pain: ['网络攻略信息分散', '不知道哪些景点值得去', '景点介绍过于简单，文化理解门槛高'], resp: ['AI 个性化路线规划', 'AI 文化讲解', '景点智能推荐'],
  },
  {
    n: '02', glyph: '王', name: '王秀兰', role: '老年游客', color: '#9bb86a',
    bg: '65 岁，退休教师，喜欢传统文化，和家人一起出游。', sc: '希望慢节奏游览古镇，更深入了解当地文化。', goal: '轻松完成游览，并了解甲马文化背后的历史故事。',
    pain: ['手机操作复杂', '地图阅读困难', '文字内容较多'], resp: ['AI 语音助手', '一键语音导航', '大字体阅读模式', '简洁交互界面'],
  },
  {
    n: '03', glyph: '刘', name: '刘悦', role: '亲子游客', color: '#d9301f',
    bg: '32 岁，带 6 岁孩子来到喜洲，希望孩子在游玩过程中学习传统文化。', sc: '希望游玩路线安全、有趣，并兼顾休息与亲子互动。', goal: '让孩子在轻松互动中了解甲马文化。',
    pain: ['不知道哪些景点适合儿童', '母婴设施不易寻找', '文化展示缺乏互动'], resp: ['AI 亲子路线规划', '数字福印互动', '神祇故事互动讲解', '母婴设施导航'],
  },
]

const needs = [
  { t: '高效探索', en: 'Efficiency', q: '如何快速完成游览？', items: ['智能路线规划', '地图导航', '景点推荐', '公共服务查询'] },
  { t: '文化理解', en: 'Understanding', q: '如何真正理解甲马文化？', items: ['神祇故事', '非遗介绍', 'AI 文化讲解', '数字福印互动'] },
  { t: '个性化陪伴', en: 'Personalization', q: '如何获得适合自己的服务？', items: ['AI 智能规划', 'AI 文化问答', 'AI 语音助手', '动态路线调整'] },
]

function Dots({ items, tone }: { items: string[]; tone?: string }) {
  return (
    <ul className="space-y-1.5 text-[13px] leading-6">
      {items.map((x) => (
        <li key={x} className="flex gap-2"><i aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: tone ?? 'var(--xz-cinnabar)' }} />{x}</li>
      ))}
    </ul>
  )
}

export default function UXPeople() {
  return (
    <>
      <div>
        <SubHead k="A" cn="规划：三个问题" en="Plan" />
        <div className="grid gap-4 md:grid-cols-3">
          {questions.map((q, i) => (
            <motion.div key={q.t} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }} className="xz-card flex items-start gap-4 p-5">
              <span className="xz-no text-3xl">{q.n}</span>
              <div><p className="font-black">{q.t}</p><p className="xz-serif mt-1 text-lg font-black text-[var(--xz-cinnabar)]">{q.a}</p></div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SubHead k="B" cn="用户分类" en="User segments" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((s, i) => (
            <motion.article key={s.n} {...fade} transition={{ ...fade.transition, delay: i * 0.07 }} className="xz-card flex flex-col p-5">
              <div className="flex items-center justify-between"><span className="xz-no text-2xl">{s.n}</span>{s.tag && <span className="xz-chip xz-chip-live !px-2 !py-0 text-[11px]">{s.tag}</span>}</div>
              <h4 className="xz-serif mt-2 text-2xl font-black">{s.t}</h4>
              <p className="mt-4 font-display text-[10px] tracking-widest opacity-60">用户特点</p>
              <div className="mt-2"><Dots items={s.traits} tone="var(--xz-green)" /></div>
              <p className="mt-4 border-t border-dashed border-[var(--xz-ink)]/30 pt-3 font-display text-[10px] tracking-widest opacity-60">核心需求</p>
              <div className="mt-2"><Dots items={s.needs} /></div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SubHead k="C" cn="Persona" en="Who we design for" />
        <div className="grid gap-5 lg:grid-cols-3">
          {personas.map((p, i) => (
            <motion.article key={p.n} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }} className="xz-card flex flex-col overflow-hidden">
              <div className="flex items-center gap-4 border-b border-[var(--xz-line)] p-5" style={{ background: p.color + '33' }}>
                <span aria-hidden className="xz-serif grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-white/80 shadow-md text-3xl font-black text-[var(--xz-cream)]" style={{ background: p.color === '#f0a63e' ? '#c9801a' : p.color }}>{p.glyph}</span>
                <div><p className="font-display text-[10px] tracking-widest opacity-60">Persona {p.n}</p><h4 className="xz-serif text-2xl font-black">{p.name}</h4><p className="text-sm font-bold">{p.role}</p></div>
              </div>
              <dl className="flex flex-1 flex-col gap-4 px-5 pt-5 text-[13px] leading-6">
                {([['Background', p.bg], ['Scenario', p.sc], ['Goal', p.goal]] as const).map(([k, v]) => (
                  <div key={k}><dt className="font-display text-[10px] tracking-widest text-[var(--xz-cinnabar)]">{k}</dt><dd className="mt-0.5">{v}</dd></div>
                ))}
                <div><dt className="font-display text-[10px] tracking-widest text-[var(--xz-cinnabar)]">Pain Point</dt><dd className="mt-1.5"><Dots items={p.pain} tone="var(--xz-ink)" /></dd></div>
                <div className="-mx-5 mt-auto bg-[var(--xz-deep)] p-5 text-[var(--xz-cream)]"><dt className="font-display text-[10px] tracking-widest text-[var(--xz-orange)]">Design Response</dt><dd className="mt-1.5"><Dots items={p.resp} tone="var(--xz-orange)" /></dd></div>
              </dl>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SubHead k="D" cn="用户需求分析：三层" en="User needs" />
        <div className="grid gap-4 md:grid-cols-3">
          {needs.map((n, i) => (
            <motion.div key={n.en} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }} className="xz-need" style={{ ['--i' as string]: i }}>
              <p className="font-display text-[10px] tracking-widest opacity-60">{String(i + 1).padStart(2, '0')} · {n.en}</p>
              <h4 className="xz-serif mt-1 text-2xl font-black">{n.t}</h4>
              <p className="mt-2 text-sm font-bold text-[var(--xz-cinnabar)]">解决：{n.q}</p>
              <div className="mt-3"><Dots items={n.items} /></div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
